import React, { useState } from 'react';
import { Play, Clock, Star, BookOpen } from 'lucide-react';
import { WellnessVideo } from '../../types';

const WellnessVideos: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<WellnessVideo | null>(null);

  // Mock data - in production, this would come from an API
  const videos: WellnessVideo[] = [
    {
      id: '1',
      title: '5-Minute Morning Breathing Exercise',
      description: 'Start your day with this calming breathing routine to center yourself.',
      category: 'breathing',
      duration: 300,
      thumbnailUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Mindful Body Scan Meditation',
      description: 'A guided meditation to help you connect with your body and release tension.',
      category: 'meditation',
      duration: 900,
      thumbnailUrl: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/15q-N-_kkrU',
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: 'Gentle Neck and Shoulder Stretches',
      description: 'Perfect for students who spend long hours studying. Relieve tension and improve posture.',
      category: 'stretching',
      duration: 480,
      thumbnailUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/akgQbxhrhOc',
      difficulty: 'beginner'
    },
    {
      id: '4',
      title: 'Stress Relief Breathing Technique',
      description: '4-7-8 breathing method to quickly reduce anxiety and stress levels.',
      category: 'breathing',
      duration: 420,
      thumbnailUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/YRPh_GaiL8s',
      difficulty: 'beginner'
    },
    {
      id: '5',
      title: 'Walking Meditation for Students',
      description: 'Learn how to practice mindfulness while walking between classes.',
      category: 'mindfulness',
      duration: 600,
      thumbnailUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/Cce5KUSnCu0',
      difficulty: 'beginner'
    },
    {
      id: '6',
      title: 'Full Body Relaxation Stretch',
      description: 'Complete stretching routine to unwind after a long day of studies.',
      category: 'stretching',
      duration: 1200,
      thumbnailUrl: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
      videoUrl: 'https://www.youtube.com/embed/g_tea8ZNk5A',
      difficulty: 'intermediate'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Videos', icon: BookOpen },
    { id: 'breathing', label: 'Breathing', icon: BookOpen },
    { id: 'meditation', label: 'Meditation', icon: BookOpen },
    { id: 'stretching', label: 'Stretching', icon: BookOpen },
    { id: 'mindfulness', label: 'Mindfulness', icon: BookOpen },
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedVideo) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedVideo(null)}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            ← Back to Videos
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="aspect-video">
            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
                <p className="text-gray-600">{selectedVideo.description}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedVideo.difficulty)}`}>
                  {selectedVideo.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(selectedVideo.duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Wellness Videos</h2>
        </div>
        <p className="text-green-100">
          Guided tutorials for breathing, meditation, stretching, and mindfulness practices
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative aspect-video bg-gray-200">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary-600 ml-1" />
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                {formatDuration(video.duration)}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {video.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                  {video.difficulty}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {video.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                  {video.category}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(video.duration)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600">
            Try selecting a different category to see more wellness content.
          </p>
        </div>
      )}
    </div>
  );
};

export default WellnessVideos;