import React, { useState, useEffect } from 'react';
import { Save, X, Lock, Tag } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { JournalEntry, MoodType } from '../../types';
import { Encrypt } from '../../utils/storage';
import MoodSelector from '../MoodCheckin/MoodSelector';

interface JournalEditorProps {
  entryId: string | null;
  onClose: () => void;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ entryId, onClose }) => {
  const { state, dispatch } = useApp();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<MoodType | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const existingEntry = entryId ? state.journalEntries.find(e => e.id === entryId) : null;

  useEffect(() => {
    if (existingEntry) {
      setTitle(existingEntry.title);
      setContent(existingEntry.content);
      setMood(existingEntry.mood || null);
      setTags(existingEntry.tags);
      setIsEncrypted(existingEntry.isEncrypted);
    }
  }, [existingEntry]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !state.user) return;

    setIsSaving(true);

    try {
      const finalContent = isEncrypted ? await Encrypt.encrypt(content) : content;

      const entry: JournalEntry = {
        id: entryId || Date.now().toString(),
        userId: state.user.id,
        title: title.trim(),
        content: finalContent,
        mood: mood || undefined,
        isEncrypted,
        createdAt: existingEntry?.createdAt || new Date(),
        updatedAt: new Date(),
        tags,
      };

      if (entryId) {
        dispatch({ type: 'UPDATE_JOURNAL_ENTRY', payload: entry });
      } else {
        dispatch({ type: 'ADD_JOURNAL_ENTRY', payload: entry });
      }

      onClose();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {entryId ? 'Edit Entry' : 'New Journal Entry'}
          </h2>
          <p className="text-gray-600">Express your thoughts and feelings freely</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your entry a meaningful title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Thoughts
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write about your day, feelings, experiences, or anything on your mind..."
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="encrypt"
                  type="checkbox"
                  checked={isEncrypted}
                  onChange={(e) => setIsEncrypted(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="encrypt" className="flex items-center space-x-2 text-sm text-gray-700">
                  <Lock className="w-4 h-4" />
                  <span>Encrypt this entry for extra privacy</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mood Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling?</h3>
            <MoodSelector
              selectedMood={mood}
              onMoodSelect={setMood}
              className="grid-cols-2"
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                />
                <button
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm"
                >
                  Add
                </button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1.5 text-primary-600 hover:text-primary-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || isSaving}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : entryId ? 'Update Entry' : 'Save Entry'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalEditor;