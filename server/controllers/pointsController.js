import Activity from "../models/Activity.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { 
  deductPointsWithTransaction, 
  addPointsWithTransaction,
  getDownloadCost,
  getUnlockCost,
  needsUnlock,
  TEMPLATE_TIERS 
} from "../utils/pointsManager.js";

const POINT_VALUES = {
  SIGNUP: 25,
  PROFILE_COMPLETE: 50,
  RESUME_CREATED: 25,
  RESUME_DOWNLOADED: 0,
  SOCIAL_FOLLOW: 10,
  REFERRAL: 200,
  DAILY_LOGIN: 10,
  LEVEL_UP: 100,
};

export const getUserPoints = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "points level badges stats socialMediaFollows referralCode" // Changed from socialShares
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const levels = {
      'Bronze': 100,
      'Silver': 300,
      'Gold': 600,
      'Platinum': 1000,
      'Diamond': Infinity,
    };

    const nextLevelPoints = levels[user.level];
    const progress =
      nextLevelPoints === Infinity
        ? 100
        : ((user.points / nextLevelPoints) * 100); // Fixed calculation

    return res.status(200).json({
      points: user.points,
      level: user.level,
      badges: user.badges,
      stats: user.stats,
      socialMediaFollows: user.socialMediaFollows, // Changed from socialShares
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

    if (activityType === 'RESUME_DOWNLOADED') {
      user.stats.resumesDownloaded += 1;
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
    
    // Fetch all users sorted by points
    const leaderboard = await User.find({})
      .select('name email points level badges')
      .sort({ points: -1, createdAt: 1 }) // Sort by points descending, then by creation date for ties
      .limit(parseInt(limit))
      .lean();
    
    // Add rank and mask email - handle ties properly
    let currentRank = 1;
    let previousPoints = null;
    const rankedLeaderboard = leaderboard.map((user, index) => {
      // If points are different from previous user, update rank
      if (previousPoints !== null && user.points < previousPoints) {
        currentRank = index + 1;
      }
      previousPoints = user.points;
      
      return {
        ...user,
        rank: currentRank,
        email: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
      };
    });
    
    // Get current user's rank - fetch user first
    let currentUserRank = null;
    if (req.userId) {
      const currentUser = await User.findById(req.userId).select('points');
      if (currentUser) {
        // Count users with more points
        currentUserRank = await User.countDocuments({
          points: { $gt: currentUser.points }
        }) + 1;
      }
    }
    
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
    
    // Link users - use validateBeforeSave: false to avoid validation issues
    newUser.referredBy = referrer._id;
    await newUser.save({ validateBeforeSave: false });
    
    referrer.referrals.push(newUser._id);
    await referrer.save({ validateBeforeSave: false });
    
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

/* // Helper: Get activity description
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
} */

  // Helper function for activity descriptions
function getActivityDescription(activityType, metadata) {
  const descriptions = {
    SIGNUP: "Welcome bonus for signing up",
    PROFILE_COMPLETE: "Bonus for completing your profile",
    RESUME_CREATED: metadata.isFirst 
      ? "First resume created bonus" 
      : "Created a new resume",
    SOCIAL_FOLLOW: `Followed us on ${metadata.platform}`,
    REFERRAL: `Referred ${metadata.referredUserName || "a friend"}`,
    DAILY_LOGIN: "Daily login bonus",
    LEVEL_UP: `Leveled up to ${metadata.newLevel}`,
    SPEND_CV_DOWNLOAD: `Downloaded CV using ${metadata.templateType} template`,
    SPEND_TEMPLATE_UNLOCK: `Unlocked ${metadata.templateType} template`,
    SPEND_AI_SUGGESTION: "Used AI suggestion feature",
  };
  
  return descriptions[activityType] || "Point transaction";
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
  
  // Badge: First Download
  if (user.stats.resumesDownloaded >= 1 && !existingBadgeNames.includes('First Download')) {
    const badge = { name: 'First Download', icon: '⬇️', earnedAt: new Date() };
    user.badges.push(badge);
    newBadges.push(badge);
  }
  
  // Badge: Download Expert (5 downloads)
  if (user.stats.resumesDownloaded >= 5 && !existingBadgeNames.includes('Download Expert')) {
    const badge = { name: 'Download Expert', icon: '📥', earnedAt: new Date() };
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

// NEW: Deduct points endpoint
export const deductPoints = async (req, res) => {
  try {
    const { activityType, amount, metadata = {} } = req.body;
    const userId = req.userId;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check balance
    if (!user.hasEnoughPoints(amount)) {
      return res.status(400).json({ 
        message: `Insufficient points. You have ${user.points} but need ${amount}.`,
        currentBalance: user.points,
        required: amount,
        shortfall: amount - user.points,
      });
    }

    // Deduct points with transaction
    const description = getActivityDescription(activityType, metadata);
    const result = await deductPointsWithTransaction(
      userId,
      amount,
      activityType,
      description,
      metadata
    );

    let newBadges = [];

    // Create Activity record for resume downloads to show in activity history
    if (activityType === "SPEND_CV_DOWNLOAD") {
      // Update download stats BEFORE checking for badges
      user.stats.resumesDownloaded += 1;
      await user.save();
      
      await Activity.create({
        user: userId,
        type: 'RESUME_DOWNLOADED',
        points: -amount, // Negative to show deduction
        description: description,
        metadata: metadata
      });
      
      // Check and award download-related badges (now stats are updated)
      newBadges = await checkAndAwardBadges(user);
      
      // Create activity records for new badges
      for (const badge of newBadges) {
        await Activity.create({
          user: userId,
          type: 'BADGE_EARNED',
          points: 0,
          description: `Earned badge: ${badge.name}`,
          metadata: { badgeName: badge.name }
        });
      }
    }

    return res.status(200).json({
      message: "Points deducted successfully",
      data: {
        amountDeducted: amount,
        previousBalance: result.balanceBefore,
        currentBalance: result.currentBalance,
        transaction: result.transaction,
        newBadges: newBadges, // Include any badges earned
      },
    });

  } catch (error) {
    console.error("Deduct points error:", error);
    return res.status(500).json({ 
      message: error.message || "Failed to deduct points" 
    });
  }
};


// NEW: Check if user can afford an action
export const checkBalance = async (req, res) => {
  try {
    const { amount, actionType } = req.query;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const canAfford = user.hasEnoughPoints(Number(amount));
    
    return res.status(200).json({
      canAfford,
      currentBalance: user.points,
      required: Number(amount),
      shortfall: canAfford ? 0 : Number(amount) - user.points,
    });

  } catch (error) {
    console.error("Check balance error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// NEW: Get download cost for template
export const getTemplateDownloadCost = async (req, res) => {
  try {
    const { templateType } = req.params;
    const userId = req.userId;

    const cost = getDownloadCost(templateType);
    const unlockCost = getUnlockCost(templateType);
    const requiresUnlock = needsUnlock(templateType);
    
    const user = await User.findById(userId);
    const isUnlocked = requiresUnlock ? user.hasTemplateUnlocked(templateType) : true;
    
    return res.status(200).json({
      templateType,
      tier: TEMPLATE_TIERS[templateType]?.tier || "FREE",
      downloadCost: cost,
      unlockCost,
      requiresUnlock,
      isUnlocked,
      totalCost: isUnlocked ? cost : cost + unlockCost,
    });

  } catch (error) {
    console.error("Get template cost error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// NEW: Unlock template with points
export const unlockTemplate = async (req, res) => {
  try {
    const { templateId } = req.body;
    const userId = req.userId;
    
    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Validate template exists
    const tierInfo = TEMPLATE_TIERS[templateId];
    if (!tierInfo) {
      return res.status(404).json({ message: "Template not found" });
    }
    
    // Check if it's a free template
    if (!needsUnlock(templateId)) {
      return res.status(400).json({ message: "This template is already free" });
    }
    
    // Check if already unlocked
    if (user.hasTemplateUnlocked(templateId)) {
      return res.status(400).json({ message: "Template already unlocked" });
    }
    
    const unlockCost = getUnlockCost(templateId);
    
    // Check balance
    if (!user.hasEnoughPoints(unlockCost)) {
      return res.status(402).json({
        message: `Insufficient points. You need ${unlockCost} points to unlock this template.`,
        error: "INSUFFICIENT_POINTS",
        required: unlockCost,
        current: user.points,
        shortfall: unlockCost - user.points,
      });
    }
    
    // Deduct points and create transaction
    const transactionResult = await deductPointsWithTransaction(
      userId,
      unlockCost,
      "SPEND_TEMPLATE_UNLOCK",
      `Unlocked ${templateId} template`,
      {
        templateId,
        templateTier: tierInfo.tier,
      }
    );
    
    // Unlock template for user
    await user.unlockTemplate(templateId, unlockCost);
    
    // Create activity record
    await Activity.create({
      user: userId,
      type: 'RESUME_DOWNLOADED', // Using existing type for activity feed
      points: -unlockCost,
      description: `Unlocked ${templateId} template`,
      metadata: { templateId, action: 'unlock' }
    });
    
    return res.status(200).json({
      message: `${templateId} template unlocked successfully!`,
      data: {
        templateId,
        cost: unlockCost,
        remainingBalance: transactionResult.currentBalance,
        transaction: transactionResult.transaction,
      },
    });
    
  } catch (error) {
    console.error("Unlock template error:", error);
    return res.status(500).json({ 
      message: error.message || "Failed to unlock template" 
    });
  }
};

