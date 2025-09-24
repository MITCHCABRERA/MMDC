import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, MoodEntry, JournalEntry, MoodType } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  moodEntries: MoodEntry[];
  journalEntries: JournalEntry[];
  currentMood: MoodType | null;
  isLoading: boolean;
  hasSeenConsent: boolean;
  searchQuery: string;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_MOOD_ENTRY'; payload: MoodEntry }
  | { type: 'ADD_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'UPDATE_JOURNAL_ENTRY'; payload: JournalEntry }
  | { type: 'DELETE_JOURNAL_ENTRY'; payload: string }
  | { type: 'SET_CURRENT_MOOD'; payload: MoodType }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONSENT_SEEN'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  moodEntries: [],
  journalEntries: [],
  currentMood: null,
  isLoading: false,
  hasSeenConsent: false,
  searchQuery: '',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'ADD_MOOD_ENTRY':
      return {
        ...state,
        moodEntries: [action.payload, ...state.moodEntries],
        currentMood: action.payload.mood,
      };
    case 'ADD_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: [action.payload, ...state.journalEntries],
      };
    case 'UPDATE_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: state.journalEntries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
        ),
      };
    case 'DELETE_JOURNAL_ENTRY':
      return {
        ...state,
        journalEntries: state.journalEntries.filter(entry => entry.id !== action.payload),
      };
    case 'SET_CURRENT_MOOD':
      return {
        ...state,
        currentMood: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_CONSENT_SEEN':
      return {
        ...state,
        hasSeenConsent: action.payload,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};