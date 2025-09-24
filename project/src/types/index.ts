export interface User {
  id: string;
  email: string;
  name: string;
  studentId?: string;
  profilePicture?: string;
  hasConsented: boolean;
  lastMoodCheckIn?: Date;
  joinedAt: Date;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  timestamp: Date;
  notes?: string;
}

export type MoodType = 'very-happy' | 'happy' | 'neutral' | 'sad' | 'very-sad' | 'angry' | 'anxious' | 'excited';

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: MoodType;
  isEncrypted: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface WellnessVideo {
  id: string;
  title: string;
  description: string;
  category: 'breathing' | 'meditation' | 'stretching' | 'mindfulness';
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface MentalHealthAssessment {
  id: string;
  userId: string;
  score: number;
  responses: AssessmentResponse[];
  recommendations: string[];
  completedAt: Date;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  response: string;
  timestamp: Date;
  mood?: MoodType;
}

export interface Consultation {
  id: string;
  userId: string;
  therapistId: string;
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  meetingLink?: string;
}