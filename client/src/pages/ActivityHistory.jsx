import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivityHistory } from '../redux/features/pointsSlice';
import { Activity, Calendar, TrendingUp, Filter } from 'lucide-react';

export default function ActivityHistory() {
  const dispatch = useDispatch();
  const { activities, loading } = useSelector((state) => state.points);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchActivityHistory({ page, limit: 20 }));
  }, [dispatch, page]);

  const getActivityIcon = (type) => {
    const icons = {
      SIGNUP: '👋',
      PROFILE_COMPLETE: '✅',
      RESUME_CREATED: '📄',
      RESUME_DOWNLOADED: '⬇️',
      SOCIAL_FOLLOW: '👍',
      REFERRAL: '🎁',
      DAILY_LOGIN: '🗓️',
      LEVEL_UP: '⬆️',
      BADGE_EARNED: '🏆'
    };
    return icons[type] || '✨';
  };

  const getActivityColor = (type) => {
    const colors = {
      SIGNUP: 'bg-blue-100 text-blue-700',
      PROFILE_COMPLETE: 'bg-green-100 text-green-700',
      RESUME_CREATED: 'bg-purple-100 text-purple-700',
      RESUME_DOWNLOADED: 'bg-orange-100 text-orange-700',
      SOCIAL_FOLLOW: 'bg-pink-100 text-pink-700',
      REFERRAL: 'bg-yellow-100 text-yellow-700',
      DAILY_LOGIN: 'bg-cyan-100 text-cyan-700',
      LEVEL_UP: 'bg-indigo-100 text-indigo-700',
      BADGE_EARNED: 'bg-red-100 text-red-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <Activity className="text-purple-500" size={40} />
        Activity History
      </h1>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={20} className="text-gray-600" />
          <span className="font-semibold">Filter Activities</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {['SIGNUP', 'PROFILE_COMPLETE', 'RESUME_CREATED', 'RESUME_DOWNLOADED', 'SOCIAL_FOLLOW', 'REFERRAL', 'LEVEL_UP'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filter === type 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getActivityIcon(type)} {type.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div 
              key={activity._id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{activity.description}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(activity.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        {activity.metadata.platform && (
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2">
                            Platform: {activity.metadata.platform}
                          </span>
                        )}
                        {activity.metadata.resumeId && (
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded">
                            Resume ID: {activity.metadata.resumeId}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                    <TrendingUp size={18} className="text-green-600" />
                    <span className="text-lg font-bold text-green-700">
                      +{activity.points}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Activity size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">
              {filter === 'all' 
                ? 'No activities yet. Start earning points!' 
                : `No ${filter.replace(/_/g, ' ').toLowerCase()} activities found.`}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredActivities.length > 0 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded font-semibold">
            Page {page}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={filteredActivities.length < 20}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}