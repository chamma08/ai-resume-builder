import { Link } from 'react-router-dom';
import { Trophy, Star, Gift, CheckCircle, Info } from 'lucide-react';

export default function PointsExplainerCard({ userPoints, onShowTutorial }) {
  const progressToNextLevel = userPoints >= 100 ? 100 : (userPoints / 100) * 100;

  return (
    <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200 shadow-lg mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-900">Your Points Balance</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-blue-600">
              {userPoints || 0}
            </p>
            <span className="text-gray-600 font-medium">points</span>
          </div>
        </div>
        <button
          onClick={onShowTutorial}
          className="p-2 hover:bg-white/80 rounded-lg transition-colors group"
          title="Show tutorial again"
        >
          <Info className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Progress to next milestone */}
      {userPoints < 100 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress to Silver Level</span>
            <span className="text-sm font-semibold text-blue-600">{userPoints}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressToNextLevel}%` }}
            />
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Earn Points */}
        <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-800 text-sm">Earn Points</h4>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-700">
            <li className="flex items-start gap-1.5">
              <span className="text-green-600 shrink-0">✓</span>
              <span>Complete profile: <strong className="text-green-600">+50</strong></span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-green-600 shrink-0">✓</span>
              <span>Create resume: <strong className="text-green-600">+25</strong></span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-green-600 shrink-0">✓</span>
              <span>Follow socials: <strong className="text-green-600">+10 each</strong></span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-green-600 shrink-0">✓</span>
              <span>Refer friend: <strong className="text-green-600">+200</strong></span>
            </li>
          </ul>
        </div>

        {/* Spend Points */}
        <div className="bg-white/80 backdrop-blur rounded-xl p-4 border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-gray-800 text-sm">Spend Points</h4>
          </div>
          <ul className="space-y-1.5 text-xs text-gray-700">
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 shrink-0">→</span>
              <span>Download: <strong className="text-red-600">-50</strong></span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 shrink-0">→</span>
              <span>Premium unlock: <strong className="text-red-600">-100</strong></span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-600 shrink-0">→</span>
              <span>Elite unlock: <strong className="text-red-600">-200</strong></span>
            </li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 rounded-xl p-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="font-semibold mb-1 text-sm">💡 Pro Tip</p>
            <p className="text-sm opacity-90">
              {userPoints < 50 
                ? "Complete your profile to earn 50 bonus points instantly!"
                : userPoints < 100
                ? "Create a resume to earn 25 more points!"
                : "You have enough points to download 2 resumes! 🎉"
              }
            </p>
          </div>
          <Link
            to="/app/points"
            className="shrink-0 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Achievement hint */}
      {userPoints >= 25 && userPoints < 100 && (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-600 bg-white/60 rounded-lg p-3">
          <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
          <span>
            You're on your way! Keep earning to unlock more features.
          </span>
        </div>
      )}
    </div>
  );
}
