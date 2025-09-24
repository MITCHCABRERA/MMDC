import React, { useState } from 'react';
import { Zap, TrendingUp, Calendar } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { MoodType, MoodEntry } from '../../types';
import { getMoodRecommendations } from '../../utils/moodUtils';
import MoodSelector from './MoodSelector';
import MoodChart from './MoodChart';

const MoodCheckin: React.FC = () => {
  const { state, dispatch } = useApp();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [notes, setNotes] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleMoodSubmit = () => {
    if (!selectedMood || !state.user) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      userId: state.user.id,
      mood: selectedMood,
      timestamp: new Date(),
      notes: notes.trim() || undefined,
    };

    dispatch({ type: 'ADD_MOOD_ENTRY', payload: newEntry });
    setShowRecommendations(true);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setNotes('');
    setShowRecommendations(false);
  };

  const recommendations = selectedMood ? getMoodRecommendations(selectedMood) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Zap className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Daily Mood Check-in</h2>
        </div>
        <p className="text-primary-100">
          How are you feeling today? Your mood matters and we're here to support you.
        </p>
      </div>

      {!showRecommendations ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Current Mood</h3>
          
          <MoodSelector
            selectedMood={selectedMood}
            onMoodSelect={setSelectedMood}
            className="mb-6"
          />

          {selectedMood && (
            <div className="space-y-4 animate-slide-up">
              <div>
                <label htmlFor="mood-notes\" className="block text-sm font-medium text-gray-700 mb-2">
                  What's on your mind? (Optional)
                </label>
                <textarea
                  id="mood-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share what's making you feel this way..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                />
              </div>
              
              <button
                onClick={handleMoodSubmit}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                Submit Mood Check-in
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
            <div className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200"
            >
              Check in again
            </button>
          </div>
        </div>
      )}

      {/* Mood History */}
      {state.moodEntries.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Mood Trends</h3>
            </div>
            <MoodChart entries={state.moodEntries.slice(0, 7)} />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Check-ins</h3>
            </div>
            <div className="space-y-3">
              {state.moodEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{entry.mood}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </p>
                      {entry.notes && (
                        <p className="text-xs text-gray-600 truncate max-w-xs">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodCheckin;