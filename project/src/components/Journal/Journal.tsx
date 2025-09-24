import React, { useState } from 'react';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import JournalEditor from './JournalEditor';
import JournalList from './JournalList';

const Journal: React.FC = () => {
  const { state } = useApp();
  const [showEditor, setShowEditor] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMood, setFilterMood] = useState<string>('all');

  const handleNewEntry = () => {
    setSelectedEntry(null);
    setShowEditor(true);
  };

  const handleEditEntry = (entryId: string) => {
    setSelectedEntry(entryId);
    setShowEditor(true);
  };

  const filteredEntries = state.journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMood = filterMood === 'all' || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  if (showEditor) {
    return (
      <JournalEditor
        entryId={selectedEntry}
        onClose={() => setShowEditor(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Digital Journal</h2>
            </div>
            <p className="text-secondary-100">
              Your private, secure space for thoughts and reflections
            </p>
          </div>
          <button
            onClick={handleNewEntry}
            className="bg-white text-secondary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search your entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Moods</option>
              <option value="very-happy">Very Happy</option>
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
              <option value="very-sad">Very Sad</option>
              <option value="angry">Angry</option>
              <option value="anxious">Anxious</option>
              <option value="excited">Excited</option>
            </select>
          </div>
        </div>
      </div>

      {/* Journal Entries */}
      <JournalList
        entries={filteredEntries}
        onEditEntry={handleEditEntry}
        searchQuery={searchQuery}
      />

      {/* Empty State */}
      {state.journalEntries.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Journaling Journey</h3>
          <p className="text-gray-600 mb-6">
            Capture your thoughts, feelings, and experiences in your private digital journal.
          </p>
          <button
            onClick={handleNewEntry}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write Your First Entry</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Journal;