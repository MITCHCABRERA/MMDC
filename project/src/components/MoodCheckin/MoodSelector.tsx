import React from 'react';
import { MoodType } from '../../types';
import { moodEmojis, moodLabels, moodColors } from '../../utils/moodUtils';

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onMoodSelect: (mood: MoodType) => void;
  className?: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect, className = '' }) => {
  const moods: MoodType[] = ['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'angry', 'anxious', 'excited'];

  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onMoodSelect(mood)}
          className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
            selectedMood === mood
              ? 'border-primary-500 bg-primary-50 shadow-lg'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          style={{
            borderColor: selectedMood === mood ? moodColors[mood] : undefined,
            backgroundColor: selectedMood === mood ? `${moodColors[mood]}10` : undefined,
          }}
        >
          <div className="text-3xl mb-2">{moodEmojis[mood]}</div>
          <div className="text-sm font-medium text-gray-700">{moodLabels[mood]}</div>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;