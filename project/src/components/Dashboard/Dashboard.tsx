import React from 'react';
import { Heart, TrendingUp, Calendar, MessageCircle, FileText, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { moodEmojis, moodLabels } from '../../utils/moodUtils';

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSectionChange }) => {
  const { state } = useApp();

  const recentMood = state.moodEntries[0];
  const moodStreak = state.moodEntries.length;
  const journalCount = state.journalEntries.length;

  const quickActions = [
    {
      id: 'mood-checkin',
      title: 'Mood Check-in',
      description: 'How are you feeling today?',
      icon: Zap,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      id: 'journal',
      title: 'Write in Journal',
      description: 'Capture your thoughts',
      icon: FileText,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      id: 'wellness',
      title: 'Wellness Videos',
      description: 'Guided relaxation',
      icon: Heart,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      id: 'chat',
      title: 'AI Support',
      description: 'Get instant help',
      icon: MessageCircle,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {state.user?.name?.split(' ')[0]}!</h1>
            <p className="text-primary-100">How can we support your wellness today?</p>
          </div>
        </div>
      </div>

      {/* Current Mood & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Mood</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          {recentMood ? (
            <div className="text-center">
              <div className="text-4xl mb-2">{moodEmojis[recentMood.mood]}</div>
              <p className="text-gray-700 font-medium">{moodLabels[recentMood.mood]}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(recentMood.timestamp).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-3">No mood recorded yet</p>
              <button
                onClick={() => onSectionChange('mood-checkin')}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Check in now →
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Check-in Streak</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{moodStreak}</div>
            <p className="text-gray-700">Days tracked</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Journal Entries</h3>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{journalCount}</div>
            <p className="text-gray-700">Total entries</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onSectionChange(action.id)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {(state.moodEntries.length > 0 || state.journalEntries.length > 0) && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {state.moodEntries.slice(0, 3).map((entry) => (
                <div key={entry.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{moodEmojis[entry.mood]}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Mood check-in: {moodLabels[entry.mood]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {state.journalEntries.slice(0, 2).map((entry) => (
                <div key={entry.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Journal entry: {entry.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Wellness Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Daily Wellness Tip</h3>
        <p className="text-gray-700">
          Take 5 minutes today to practice deep breathing. Inhale for 4 counts, hold for 4, exhale for 6. 
          This simple technique can help reduce stress and improve focus throughout your day.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;