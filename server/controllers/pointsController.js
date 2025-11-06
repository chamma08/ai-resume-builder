import Activity from "../models/Activity.js";
import User from "../models/User.js";

const POINT_VALUES = {
  SIGNUP: 50,
  PROFILE_COMPLETE: 100,
  RESUME_CREATED: 50,
  RESUME_DOWNLOADED: 20,
  SOCIAL_FOLLOW: 1,
  REFERRAL: 200,
  DAILY_LOGIN: 10,
  LEVEL_UP: 100,
};

export const getUserPoints = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "points level badges stats socialShares referralCode"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const levels = {
      'Bronze': 100,
      'Silver': 500,
      'Gold': 1500,
      'Platinum': 3000,
      'Diamond': Infinity,
    };

    const nextLevelPoints = levels[user.level];
    const progress =
      nextLevelPoints === Infinity
        ? 100
        : ((user.points % nextLevelPoints) / nextLevelPoints) * 100;

    return res.status(200).json({
      points: user.points,
      level: user.level,
      badges: user.badges,
      stats: user.stats,
      socialShares: user.socialShares,
      referralCode: user.referralCode,
      progressToNextLevel: progress,
    });
  } catch (error) {
    console.error("Get user points error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const awardPoints = async (req, res) => {
  try {
    const { activityType, metadata = {} } = req.body;
    const userId = req.userId;

    if (!POINT_VALUES[activityType]) {
      return res.status(400).json({ message: "Invalid activity type" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (activityType === "PROFILE_COMPLETE" && user.stats.profileCompleted) {
      return res.status(400).json({ message: "Profile already completed" });
    }

    if (
      activityType === "RESUME_CREATED" &&
      metadata.isFirst &&
      user.stats.firstResumeBonus
    ) {
      return res
        .status(400)
        .json({ message: "First resume bonus already claimed" });
    }

    const points = POINT_VALUES[activityType];
    const result = await user.addPoints(points, activityType);

    const activity = await Activity.create({
      user: userId,
      type: activityType,
      points,
      description: getActivityDescription(activityType, metadata),
      metadata
    });

    if (activityType === 'PROFILE_COMPLETE') {
      user.stats.profileCompleted = true;
      await user.save();
    }
    
    if (activityType === 'RESUME_CREATED') {
      user.stats.resumesCreated += 1;
      if (metadata.isFirst) user.stats.firstResumeBonus = true;
      await user.save();
    }

    const newBadges = await checkAndAwardBadges(user);

    res.json({
      success: true,
      data: {
        pointsAwarded: points,
        totalPoints: result.totalPoints,
        leveledUp: result.leveledUp,
        newLevel: result.newLevel,
        activity,
        newBadges
      }
    });

  } catch (error) {
    console.error("Award points error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getActivityHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const userId = req.userId;
    
    const activities = await Activity.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    const count = await Activity.countDocuments({ user: userId });
    
    res.json({
      success: true,
      data: {
        activities,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count
      }
    });
  } catch (error) {
    console.error('Get activity history error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { limit = 50, period = 'all' } = req.query;
    
    const leaderboard = await User.find({})
      .select('name email points level badges')
      .sort({ points: -1 })
      .limit(parseInt(limit))
      .lean();
    
    // Add rank and mask email
    const rankedLeaderboard = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1,
      email: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    }));
    
    // Get current user's rank
    const currentUserRank = await User.countDocuments({
      points: { $gt: req.user?.points || 0 }
    }) + 1;
    
    res.json({
      success: true,
      data: {
        leaderboard: rankedLeaderboard,
        userRank: currentUserRank,
        totalUsers: await User.countDocuments()
      }
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Record social media follow
export const recordSocialFollow = async (req, res) => {
  try {
    const { platform } = req.body;
    const userId = req.userId;
    
    const validPlatforms = ['twitter', 'linkedin', 'facebook', 'instagram', 'youtube'];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({ message: 'Invalid platform' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if already followed
    if (user.socialMediaFollows[platform]) {
      return res.status(400).json({ 
        message: 'You have already claimed points for following this platform',
        alreadyFollowed: true
      });
    }
    
    // Award points (1 point per platform)
    const points = POINT_VALUES.SOCIAL_FOLLOW;
    const result = await user.addPoints(points, 'SOCIAL_FOLLOW');
    
    // Mark platform as followed
    user.socialMediaFollows[platform] = true;
    await user.save();
    
    // Create activity record
    const activity = await Activity.create({
      user: userId,
      type: 'SOCIAL_FOLLOW',
      points,
      description: `Followed on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      metadata: { platform }
    });
    
    res.json({
      success: true,
      data: {
        pointsAwarded: points,
        totalPoints: result.totalPoints,
        platform,
        activity
      }
    });
  } catch (error) {
    console.error('Record social follow error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Generate referral code
export const generateReferralCode = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.referralCode) {
      return res.json({
        success: true,
        data: { referralCode: user.referralCode }
      });
    }
    
    const referralCode = user.generateReferralCode();
    await user.save();
    
    res.json({
      success: true,
      data: { referralCode }
    });
  } catch (error) {
    console.error('Generate referral code error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Apply referral code (called during signup)
export const applyReferralCode = async (userId, referralCode) => {
  try {
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return { success: false, message: 'Invalid referral code' };
    }
    
    const newUser = await User.findById(userId);
    if (!newUser) {
      return { success: false, message: 'User not found' };
    }
    
    // Link users
    newUser.referredBy = referrer._id;
    await newUser.save();
    
    referrer.referrals.push(newUser._id);
    await referrer.save();
    
    // Award points to referrer
    const points = POINT_VALUES.REFERRAL;
    await referrer.addPoints(points, 'REFERRAL');
    
    // Create activity
    await Activity.create({
      user: referrer._id,
      type: 'REFERRAL',
      points,
      description: `Referred ${newUser.name}`,
      metadata: { referredUserId: newUser._id }
    });
    
    return { success: true, referrer: referrer.name };
  } catch (error) {
    console.error('Apply referral code error:', error);
    return { success: false, message: error.message };
  }
};

// Helper: Get activity description
function getActivityDescription(activityType, metadata = {}) {
  const descriptions = {
    SIGNUP: 'Welcome! Account created',
    PROFILE_COMPLETE: 'Profile completed',
    RESUME_CREATED: 'Resume created',
    RESUME_DOWNLOADED: 'Resume downloaded',
    SOCIAL_FOLLOW: `Followed on ${metadata.platform ? metadata.platform.charAt(0).toUpperCase() + metadata.platform.slice(1) : 'social media'}`,
    REFERRAL: `Referred ${metadata.userName || 'a friend'}`,
    DAILY_LOGIN: 'Daily login bonus',
    LEVEL_UP: `Leveled up to ${metadata.newLevel}`
  };
  return descriptions[activityType] || 'Activity completed';
}

// Helper: Check and award badges
async function checkAndAwardBadges(user) {
  const newBadges = [];
  const existingBadgeNames = user.badges.map(b => b.name);
  
  // Badge: First Resume
  if (user.stats.resumesCreated >= 1 && !existingBadgeNames.includes('First Resume')) {
    const badge = { name: 'First Resume', icon: '📄', earnedAt: new Date() };
    user.badges.push(badge);
    newBadges.push(badge);
  }
  
  // Badge: Resume Master (10 resumes)
  if (user.stats.resumesCreated >= 10 && !existingBadgeNames.includes('Resume Master')) {
    const badge = { name: 'Resume Master', icon: '🎓', earnedAt: new Date() };
    user.badges.push(badge);
    newBadges.push(badge);
  }
  
  // Badge: Social Connector (followed all 5 platforms)
  const followedPlatforms = Object.values(user.socialMediaFollows).filter(Boolean).length;
  if (followedPlatforms >= 5 && !existingBadgeNames.includes('Social Connector')) {
    const badge = { name: 'Social Connector', icon: '🌐', earnedAt: new Date() };
    user.badges.push(badge);
    newBadges.push(badge);
  }
  
  // Badge: Influencer (3+ referrals)
  if (user.referrals.length >= 3 && !existingBadgeNames.includes('Influencer')) {
    const badge = { name: 'Influencer', icon: '🌟', earnedAt: new Date() };
    user.badges.push(badge);
    newBadges.push(badge);
  }
  
  if (newBadges.length > 0) {
    await user.save();
  }
  
  return newBadges;
}