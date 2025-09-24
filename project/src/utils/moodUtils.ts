import { MoodType } from '../types';

export const moodEmojis: Record<MoodType, string> = {
  'very-happy': '😊',
  'happy': '🙂',
  'neutral': '😐',
  'sad': '😢',
  'very-sad': '😭',
  'angry': '😡',
  'anxious': '😰',
  'excited': '🤩',
};

export const moodColors: Record<MoodType, string> = {
  'very-happy': '#22c55e',
  'happy': '#84cc16',
  'neutral': '#6b7280',
  'sad': '#3b82f6',
  'very-sad': '#1d4ed8',
  'angry': '#ef4444',
  'anxious': '#f59e0b',
  'excited': '#8b5cf6',
};

export const moodLabels: Record<MoodType, string> = {
  'very-happy': 'Very Happy',
  'happy': 'Happy',
  'neutral': 'Neutral',
  'sad': 'Sad',
  'very-sad': 'Very Sad',
  'angry': 'Angry',
  'anxious': 'Anxious',
  'excited': 'Excited',
};

export const getMoodRecommendations = (mood: MoodType): string[] => {
  const recommendations: Record<MoodType, string[]> = {
    'very-happy': [
      'Consider journaling about what made you feel great today',
      'Share your positive energy with the wellness community',
      'Try maintaining this mood with light meditation',
    ],
    'happy': [
      'Continue with breathing exercises to maintain balance',
      'Journal about your positive experiences',
      'Explore uplifting wellness content',
    ],
    'neutral': [
      'Try some light stretching or breathing exercises',
      'Consider journaling to explore your feelings',
      'Listen to calming music or nature sounds',
    ],
    'sad': [
      'Practice gentle breathing exercises',
      'Consider writing in your journal',
      'Try light and sound therapy for comfort',
      'Reach out to our AI assistant for support',
    ],
    'very-sad': [
      'Engage with our supportive AI chatbot',
      'Consider booking a consultation with a counselor',
      'Try guided meditation for emotional healing',
      'Write freely in your private journal',
    ],
    'angry': [
      'Try deep breathing exercises to calm down',
      'Consider physical wellness activities like stretching',
      'Write about your feelings in your journal',
      'Use our light therapy for relaxation',
    ],
    'anxious': [
      'Practice calming breathing techniques',
      'Try our guided meditation videos',
      'Use light and sound therapy for relaxation',
      'Consider chatting with our AI assistant',
    ],
    'excited': [
      'Channel your energy into journaling',
      'Try active wellness exercises',
      'Share your excitement through creative expression',
    ],
  };

  return recommendations[mood] || [];
};