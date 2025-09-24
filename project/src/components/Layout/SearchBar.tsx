import React, { useState, useRef, useEffect } from 'react';
import { Search, BookOpen, Headphones, MessageCircle, Calendar, FileText, Zap } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const SearchBar: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ title: string; icon: React.ReactNode; path: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const allFeatures = [
    { title: 'Mood Check-in', icon: <Zap className="w-4 h-4" />, path: '/mood-checkin' },
    { title: 'Journal', icon: <FileText className="w-4 h-4" />, path: '/journal' },
    { title: 'Wellness Videos', icon: <BookOpen className="w-4 h-4" />, path: '/wellness' },
    { title: 'Sound Therapy', icon: <Headphones className="w-4 h-4" />, path: '/therapy' },
    { title: 'AI Chat', icon: <MessageCircle className="w-4 h-4" />, path: '/chat' },
    { title: 'Consultation', icon: <Calendar className="w-4 h-4" />, path: '/consultation' },
  ];

  useEffect(() => {
    if (state.searchQuery) {
      const filtered = allFeatures.filter(feature =>
        feature.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [state.searchQuery]);

  const handleSearch = (value: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: value });
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsExpanded(false), 200);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search features, tools, or get help..."
          value={state.searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
        />
      </div>

      {/* Search Suggestions */}
      {isExpanded && (state.searchQuery || suggestions.length > 0) && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                  // In a real app, navigate to suggestion.path
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
              >
                <div className="text-gray-400">
                  {suggestion.icon}
                </div>
                <span className="text-gray-900">{suggestion.title}</span>
              </button>
            ))
          ) : state.searchQuery ? (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No features found for "{state.searchQuery}"
            </div>
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">
              Try searching for "mood", "journal", "wellness", or "chat"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;