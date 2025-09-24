import React from 'react';
import { Calendar, Tag, Lock, Trash2, Edit3 } from 'lucide-react';
import { JournalEntry } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { moodEmojis } from '../../utils/moodUtils';
import { Encrypt } from '../../utils/storage';

interface JournalListProps {
  entries: JournalEntry[];
  onEditEntry: (entryId: string) => void;
  searchQuery: string;
}

const JournalList: React.FC<JournalListProps> = ({ entries, onEditEntry, searchQuery }) => {
  const { dispatch } = useApp();

  const handleDelete = (entryId: string) => {
    if (confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
      dispatch({ type: 'DELETE_JOURNAL_ENTRY', payload: entryId });
    }
  };

  const getPreview = async (entry: JournalEntry): Promise<string> => {
    try {
      let content = entry.content;
      if (entry.isEncrypted) {
        content = await Encrypt.decrypt(content);
      }
      return content.length > 150 ? content.substring(0, 150) + '...' : content;
    } catch {
      return entry.content.length > 150 ? entry.content.substring(0, 150) + '...' : entry.content;
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">
          {searchQuery ? `No entries found for "${searchQuery}"` : 'No journal entries yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {entries.map((entry) => (
        <div key={entry.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {highlightText(entry.title, searchQuery)}
                </h3>
                {entry.isEncrypted && (
                  <Lock className="w-4 h-4 text-gray-400" title="Encrypted entry" />
                )}
                {entry.mood && (
                  <span className="text-lg\" title={`Mood: ${entry.mood}`}>
                    {moodEmojis[entry.mood]}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                </div>
                {entry.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>{entry.tags.length} tags</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEditEntry(entry.id)}
                className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
                title="Edit entry"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="p-2 text-gray-400 hover:text-error-600 transition-colors duration-200"
                title="Delete entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {entry.isEncrypted ? (
                <em className="text-gray-500">Encrypted content - click to edit and view</em>
              ) : (
                highlightText(
                  entry.content.length > 150 
                    ? entry.content.substring(0, 150) + '...' 
                    : entry.content,
                  searchQuery
                )
              )}
            </p>
          </div>

          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {entry.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
              {entry.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{entry.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Created: {new Date(entry.createdAt).toLocaleString()}
            </span>
            {entry.updatedAt > entry.createdAt && (
              <span>
                Updated: {new Date(entry.updatedAt).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JournalList;