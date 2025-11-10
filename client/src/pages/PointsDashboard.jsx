import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPoints,
  recordSocialFollow,
  generateReferralCode,
} from "../redux/features/pointsSlice";
import {
  Trophy,
  TrendingUp,
  Award,
  Share2,
  Gift,
  Star,
  Crown,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

export default function PointsDashboard() {
  const dispatch = useDispatch();
  const {
    points,
    level,
    badges,
    stats,
    socialMediaFollows,
    referralCode,
    progress,
    loading,
  } = useSelector((state) => state.points);

  const [followLoading, setFollowLoading] = useState({});
  const [clickedLinks, setClickedLinks] = useState({});
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    dispatch(fetchUserPoints());
  }, [dispatch]);

  // Countdown effect
  useEffect(() => {
    const intervals = {};

    Object.keys(countdowns).forEach((platform) => {
      if (countdowns[platform] > 0) {
        intervals[platform] = setInterval(() => {
          setCountdowns((prev) => {
            const newCount = prev[platform] - 1;
            if (newCount <= 0) {
              clearInterval(intervals[platform]);
              return { ...prev, [platform]: 0 };
            }
            return { ...prev, [platform]: newCount };
          });
        }, 1000);
      }
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [countdowns]);

  // Level configuration
  const levelConfig = {
    Bronze: { color: "from-orange-700 to-orange-500", icon: Trophy, next: 100 },
    Silver: { color: "from-gray-400 to-gray-200", icon: Award, next: 300 },
    Gold: { color: "from-yellow-500 to-yellow-300", icon: Star, next: 600 },
    Platinum: { color: "from-cyan-500 to-blue-400", icon: Crown, next: 1000 },
    Diamond: {
      color: "from-purple-600 to-pink-400",
      icon: Sparkles,
      next: Infinity,
    },
  };

  const currentLevelInfo = levelConfig[level] || levelConfig.Bronze;
  const LevelIcon = currentLevelInfo.icon;

  // Social media platforms
  const socialPlatforms = [
    /* { id: 'twitter', name: 'Twitter', icon: '𝕏', url: 'https://twitter.com/yourhandle', color: 'bg-black' }, */
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "in",
      url: "https://www.linkedin.com/company/job-labs-sri-lanka/",
      color: "bg-blue-600",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "f",
      url: "https://www.facebook.com/share/17LDn2cdnr/?mibextid=wwXIfr",
      color: "bg-blue-700",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "📷",
      url: "https://www.instagram.com/job.labs?igsh=bDM5N2ZsYmZ5eGJx",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "▶",
      url: "https://www.youtube.com/channel/UCIeo4mgjR8gOGxnrmAmpRhw/featured",
      color: "bg-red-600",
    },
  ];

  const handleSocialFollow = async (platform) => {
    // Check if user has clicked the link and waited
    if (!clickedLinks[platform]) {
      toast.warning(
        `Please click the ${platform} link above first to follow us!`
      );
      return;
    }

    if (countdowns[platform] && countdowns[platform] > 0) {
      toast.info(
        `Please wait ${countdowns[platform]} seconds after following...`
      );
      return;
    }

    setFollowLoading({ ...followLoading, [platform]: true });
    try {
      await dispatch(recordSocialFollow({ platform })).unwrap();
      toast.success(
        `Thank you for following us on ${platform}! +10 points earned! 🎉`
      );
    } catch (error) {
      toast.error(error || "Failed to record follow");
    } finally {
      setFollowLoading({ ...followLoading, [platform]: false });
    }
  };

  const handleSocialLinkClick = (platformId, platformName) => {
    // Mark that user clicked the link
    setClickedLinks((prev) => ({ ...prev, [platformId]: true }));

    // Start countdown (15 seconds to give time for user to follow)
    setCountdowns((prev) => ({ ...prev, [platformId]: 15 }));

    toast.info(
      `Please follow us on ${platformName} and return to claim your points!`,
      {
        autoClose: 5000,
      }
    );
  };

  const handleGenerateReferral = async () => {
    try {
      await dispatch(generateReferralCode()).unwrap();
      toast.success("Referral code generated!");
    } catch (error) {
      toast.error("Failed to generate referral code");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 flex items-center gap-2 sm:gap-3">
        <Trophy className="text-yellow-500" size={28} />
        <span className="sm:inline">Points Dashboard</span>
      </h1>

      {/* Points & Level Card */}
      <div
        className={`bg-linear-to-r ${currentLevelInfo.color} rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 text-white mb-4 sm:mb-6 lg:mb-8`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div className="w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Progress</h2>
            <div className="flex items-center gap-2 sm:gap-3">
              <LevelIcon size={24} className="sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">{points} Points</span>
            </div>
            <p className="text-base sm:text-lg mt-2 opacity-90">Level: {level}</p>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto">
            {level !== "Diamond" && (
              <>
                <p className="text-xs sm:text-sm opacity-80">Next Level</p>
                <p className="text-2xl sm:text-3xl font-bold">{currentLevelInfo.next}</p>
              </>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {level !== "Diamond" && (
          <div className="w-full bg-white/30 rounded-full h-3 sm:h-4 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500 flex items-center justify-end pr-1 sm:pr-2"
              style={{ width: `${progress}%` }}
            >
              <span className="text-[10px] sm:text-xs font-bold">{Math.round(progress)}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Badges Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Award className="text-purple-500" size={24} />
            Badges ({badges.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
            {badges.length > 0 ? (
              badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-linear-to-br from-purple-50 to-blue-50 rounded-lg p-3 sm:p-4 text-center border-2 border-purple-200"
                >
                  <div className="text-3xl sm:text-4xl mb-2">{badge.icon}</div>
                  <p className="font-semibold text-xs sm:text-sm">{badge.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-2 text-gray-500 text-center py-6 sm:py-8 text-sm">
                No badges yet. Keep earning points to unlock badges!
              </p>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <TrendingUp className="text-green-500" size={24} />
            Your Stats
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded">
              <span className="font-medium text-sm sm:text-base">Resumes Created</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-600">
                {stats.resumesCreated || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded">
              <span className="font-medium text-sm sm:text-base">Resumes Downloaded</span>
              <span className="text-xl sm:text-2xl font-bold text-green-600">
                {stats.resumesDownloaded || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded">
              <span className="font-medium text-sm sm:text-base">Profile Status</span>
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                  stats.profileCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {stats.profileCompleted ? "Complete" : "Incomplete"}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded">
              <span className="font-medium text-sm sm:text-base">Login Streak</span>
              <span className="text-xl sm:text-2xl font-bold text-orange-600">
                {stats.dailyLoginStreak || 0} days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Follow Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-4 sm:mt-6 lg:mt-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
          <Share2 className="text-blue-500" size={24} />
          <span className="text-base sm:text-xl lg:text-2xl">Follow Us & Earn Points</span>
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-2">
          Follow us on social media to earn 10 points per platform!
        </p>
        <p className="text-xs sm:text-sm text-orange-600 font-semibold mb-4 sm:mb-6">
          📌 Click the social media button → Follow our account → Wait 15
          seconds → Claim your points!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {socialPlatforms.map((platform) => {
            const isFollowed = socialMediaFollows?.[platform.id];
            const isLoading = followLoading[platform.id];

            return (
              <div key={platform.id} className="text-center">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    handleSocialLinkClick(platform.id, platform.name)
                  }
                  className={`${platform.color} text-white rounded-lg p-3 sm:p-4 block mb-2 hover:opacity-90 transition-opacity`}
                >
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{platform.icon}</div>
                  <p className="text-xs sm:text-sm font-semibold">{platform.name}</p>
                </a>
                <button
                  onClick={() => handleSocialFollow(platform.id)}
                  disabled={
                    isFollowed || isLoading || countdowns[platform.id] > 0
                  }
                  className={`w-full py-1.5 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm font-semibold transition-colors ${
                    isFollowed
                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                      : countdowns[platform.id] > 0
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isLoading
                    ? "Processing..."
                    : isFollowed
                    ? "Followed ✓"
                    : countdowns[platform.id] > 0
                    ? `Wait ${countdowns[platform.id]}s`
                    : clickedLinks[platform.id]
                    ? "Claim +10pt"
                    : "Follow First"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-4 sm:p-6 mt-4 sm:mt-6 lg:mt-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
          <Gift className="text-green-500" size={24} />
          Referral Program
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
          Invite friends and earn{" "}
          <span className="font-bold text-green-600">200 points</span> for each
          successful referral!
        </p>

        {referralCode ? (
          <div className="bg-white rounded-lg p-3 sm:p-4 border-2 border-green-200">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Your Referral Code:</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 px-3 sm:px-4 py-2 bg-gray-50 border rounded font-mono text-base sm:text-lg font-bold"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(referralCode);
                  toast.success("Referral code copied!");
                }}
                className="px-4 sm:px-6 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                Copy
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Share this code with friends. They enter it during signup, and you
              both benefit!
            </p>
          </div>
        ) : (
          <button
            onClick={handleGenerateReferral}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Generate Referral Code
          </button>
        )}
      </div>

      {/* Point Earning Guide */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-4 sm:mt-6 lg:mt-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">How to Earn Points</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
            <p className="font-bold text-blue-700 mb-1 sm:mb-2 text-sm sm:text-base">+25 Points</p>
            <p className="text-xs sm:text-sm text-gray-700">Create an account</p>
          </div>
          <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
            <p className="font-bold text-green-700 mb-1 sm:mb-2 text-sm sm:text-base">+50 Points</p>
            <p className="text-xs sm:text-sm text-gray-700">Complete your profile</p>
          </div>
          <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
            <p className="font-bold text-purple-700 mb-1 sm:mb-2 text-sm sm:text-base">+25 Points</p>
            <p className="text-xs sm:text-sm text-gray-700">Create first resume</p>
          </div>

          <div className="p-3 sm:p-4 bg-pink-50 rounded-lg">
            <p className="font-bold text-pink-700 mb-1 sm:mb-2 text-sm sm:text-base">+10 Points</p>
            <p className="text-xs sm:text-sm text-gray-700">Follow on social media</p>
          </div>
          <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg">
            <p className="font-bold text-yellow-700 mb-1 sm:mb-2 text-sm sm:text-base">+200 Points</p>
            <p className="text-xs sm:text-sm text-gray-700">Refer a friend</p>
          </div>
        </div>
      </div>
    </div>
  );
}
