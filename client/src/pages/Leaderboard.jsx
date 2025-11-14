import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../redux/features/pointsSlice';
import { TrendingUp, Trophy, Medal, Award, Crown } from '../utils/icons';

export default function Leaderboard() {
  const dispatch = useDispatch();
  const { leaderboard, userRank, loading } = useSelector((state) => state.points);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchLeaderboard({ limit: 10, period: 'all' }));
  }, [dispatch]);

  // Debug logging
  useEffect(() => {
    console.log('Leaderboard Data:', leaderboard);
    console.log('User Rank:', userRank);
    console.log('Current User:', user);
  }, [leaderboard, userRank, user]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Medal className="text-orange-600" size={24} />;
      default:
        return <Award className="text-blue-500" size={20} />;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getLevelColor = (level) => {
    const colors = {
      Bronze: 'text-orange-600',
      Silver: 'text-gray-500',
      Gold: 'text-yellow-500',
      Platinum: 'text-cyan-500',
      Diamond: 'text-purple-600'
    };
    return colors[level] || 'text-gray-500';
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
        <TrendingUp className="text-red-900" size={32} />
        <span className="sm:inline">Global Leaderboard</span>
      </h1>

      {/* User's Current Rank */}
        <div className="bg-white border-2 border-blue-200 rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center justify-between">
            <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-gray-800">Your Current Rank</h2>
          <p className="text-2xl sm:text-3xl font-bold text-red-800">#{userRank || '-'}</p>
            </div>
            <Trophy size={48} className="text-red-900 opacity-30 sm:w-16 sm:h-16" />
          </div>
        </div>

        {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center order-2 sm:order-1">
            <div className="bg-linear-to-r from-gray-300 to-gray-500 rounded-full p-1 mb-2 sm:mb-3">
              <div className="bg-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <Medal className="text-gray-400" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 w-full text-center">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">#2</p>
              <p className="font-bold text-base sm:text-lg mb-1 truncate">@{leaderboard[1]?.username || leaderboard[1]?.name}</p>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{leaderboard[1]?.email}</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{leaderboard[1]?.points} pts</p>
              <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getLevelColor(leaderboard[1]?.level)}`}>
                {leaderboard[1]?.level}
              </span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center order-1 sm:order-2">
            <div className="bg-linear-to-r from-yellow-400 to-yellow-600 rounded-full p-1 mb-2 sm:mb-3">
              <div className="bg-white rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <Crown className="text-yellow-500" size={40} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 w-full text-center border-2 sm:border-4 border-yellow-400">
              <p className="text-xs sm:text-sm text-yellow-600 font-bold mb-1">🏆 CHAMPION</p>
              <p className="font-bold text-lg sm:text-xl mb-1 truncate">@{leaderboard[0]?.username || leaderboard[0]?.name}</p>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{leaderboard[0]?.email}</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{leaderboard[0]?.points} pts</p>
              <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getLevelColor(leaderboard[0]?.level)}`}>
                {leaderboard[0]?.level}
              </span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center order-3">
            <div className="bg-linear-to-r from-orange-400 to-orange-600 rounded-full p-1 mb-2 sm:mb-3">
              <div className="bg-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <Medal className="text-orange-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 w-full text-center">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">#3</p>
              <p className="font-bold text-base sm:text-lg mb-1 truncate">@{leaderboard[2]?.username || leaderboard[2]?.name}</p>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{leaderboard[2]?.email}</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{leaderboard[2]?.points} pts</p>
              <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getLevelColor(leaderboard[2]?.level)}`}>
                {leaderboard[2]?.level}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-700">Rank</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-700">User</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-700">Level</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-gray-700">Badges</th>
                <th className="px-3 lg:px-6 py-3 lg:py-4 text-right text-xs lg:text-sm font-semibold text-gray-700">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaderboard.map((entry, index) => {
                const isCurrentUser = entry._id === user?._id;
                return (
                  <tr 
                    key={entry._id} 
                    className={`${isCurrentUser ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    <td className="px-3 lg:px-6 py-3 lg:py-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <span className={`font-bold ${entry.rank <= 3 ? 'text-base lg:text-lg' : 'text-sm lg:text-base'}`}>
                          #{entry.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 text-sm lg:text-base">
                          @{entry.username || entry.name}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">You</span>
                          )}
                        </span>
                        <span className="text-xs lg:text-sm text-gray-500 truncate max-w-[200px]">{entry.email}</span>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4">
                      <span className={`inline-block px-2 lg:px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(entry.level)}`}>
                        {entry.level}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4">
                      <div className="flex gap-1">
                        {entry.badges?.slice(0, 3).map((badge, i) => (
                          <span key={i} className="text-base lg:text-lg" title={badge.name}>
                            {badge.icon}
                          </span>
                        ))}
                        {entry.badges?.length > 3 && (
                          <span className="text-xs text-gray-500">+{entry.badges.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 text-right">
                      <span className="text-base lg:text-lg font-bold text-blue-600">
                        {entry.points.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {leaderboard.map((entry, index) => {
            const isCurrentUser = entry._id === user?._id;
            return (
              <div 
                key={entry._id} 
                className={`p-4 ${isCurrentUser ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getRankIcon(entry.rank)}
                      <span className={`font-bold ${entry.rank <= 3 ? 'text-lg' : 'text-base'}`}>
                        #{entry.rank}
                      </span>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    {entry.points.toLocaleString()} pts
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="font-medium text-gray-900 text-base">
                    @{entry.username || entry.name}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">You</span>
                    )}
                  </span>
                  <p className="text-sm text-gray-500 truncate">{entry.email}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(entry.level)}`}>
                    {entry.level}
                  </span>
                  
                  <div className="flex gap-1">
                    {entry.badges?.slice(0, 3).map((badge, i) => (
                      <span key={i} className="text-lg" title={badge.name}>
                        {badge.icon}
                      </span>
                    ))}
                    {entry.badges?.length > 3 && (
                      <span className="text-xs text-gray-500">+{entry.badges.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {leaderboard.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Trophy size={48} className="mx-auto mb-4 opacity-30" />
            <p>No entries yet. Be the first on the leaderboard!</p>
          </div>
        )}
      </div>
    </div>
  );
}