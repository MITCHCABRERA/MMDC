import React from 'react';
import { MoodEntry } from '../../types';
import { moodEmojis, moodColors } from '../../utils/moodUtils';

interface MoodChartProps {
  entries: MoodEntry[];
}

const MoodChart: React.FC<MoodChartProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No mood data available yet</p>
      </div>
    );
  }

  const maxHeight = 100;
  const moodLevels: Record<string, number> = {
    'very-happy': 5,
    'happy': 4,
    'excited': 4,
    'neutral': 3,
    'anxious': 2,
    'sad': 2,
    'angry': 1,
    'very-sad': 1,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-32 space-x-2">
        {entries.reverse().map((entry, index) => {
          const height = (moodLevels[entry.mood] / 5) * maxHeight;
          return (
            <div key={entry.id} className="flex flex-col items-center space-y-2 flex-1">
              <div
                className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 min-h-[20px]"
                style={{
                  height: `${height}%`,
                  backgroundColor: moodColors[entry.mood],
                }}
              />
              <div className="text-lg">{moodEmojis[entry.mood]}</div>
              <div className="text-xs text-gray-500">
                {new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodChart;