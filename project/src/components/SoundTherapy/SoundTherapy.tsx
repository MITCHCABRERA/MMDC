import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Headphones, RotateCcw } from 'lucide-react';

interface SoundTrack {
  id: string;
  name: string;
  category: string;
  description: string;
  color: string;
  icon: string;
  audioUrl: string;
}

const SoundTherapy: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<SoundTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const soundTracks: SoundTrack[] = [
    {
      id: '1',
      name: 'Ocean Waves',
      category: 'Nature',
      description: 'Gentle ocean waves for deep relaxation',
      color: 'bg-blue-500',
      icon: '🌊',
      audioUrl: 'https://www.soundjay.com/misc/sounds/ocean-wave-1.wav' // Placeholder URL
    },
    {
      id: '2',
      name: 'Forest Rain',
      category: 'Nature',
      description: 'Peaceful rainfall in a lush forest',
      color: 'bg-green-500',
      icon: '🌧️',
      audioUrl: 'https://www.soundjay.com/misc/sounds/rain-1.wav' // Placeholder URL
    },
    {
      id: '3',
      name: 'White Noise',
      category: 'Focus',
      description: 'Pure white noise for concentration',
      color: 'bg-gray-500',
      icon: '⚪',
      audioUrl: 'https://www.soundjay.com/misc/sounds/white-noise-1.wav' // Placeholder URL
    },
    {
      id: '4',
      name: 'Tibetan Bowls',
      category: 'Meditation',
      description: 'Healing vibrations from Tibetan singing bowls',
      color: 'bg-purple-500',
      icon: '🔔',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-1.wav' // Placeholder URL
    },
    {
      id: '5',
      name: 'Crackling Fire',
      category: 'Comfort',
      description: 'Warm and cozy fireplace sounds',
      color: 'bg-orange-500',
      icon: '🔥',
      audioUrl: 'https://www.soundjay.com/misc/sounds/fire-1.wav' // Placeholder URL
    },
    {
      id: '6',
      name: 'Birds Chirping',
      category: 'Nature',
      description: 'Morning birds in a peaceful garden',
      color: 'bg-yellow-500',
      icon: '🐦',
      audioUrl: 'https://www.soundjay.com/misc/sounds/birds-1.wav' // Placeholder URL
    },
    {
      id: '7',
      name: 'Deep Binaural',
      category: 'Focus',
      description: 'Binaural beats for deep concentration',
      color: 'bg-indigo-500',
      icon: '🧠',
      audioUrl: 'https://www.soundjay.com/misc/sounds/binaural-1.wav' // Placeholder URL
    },
    {
      id: '8',
      name: 'Night Crickets',
      category: 'Sleep',
      description: 'Gentle cricket sounds for better sleep',
      color: 'bg-slate-500',
      icon: '🦗',
      audioUrl: 'https://www.soundjay.com/misc/sounds/crickets-1.wav' // Placeholder URL
    }
  ];

  const categories = ['All', 'Nature', 'Focus', 'Meditation', 'Comfort', 'Sleep'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTracks = selectedCategory === 'All' 
    ? soundTracks 
    : soundTracks.filter(track => track.category === selectedCategory);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentTrack]);

  const playTrack = (track: SoundTrack) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Headphones className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Light & Sound Therapy</h2>
        </div>
        <p className="text-purple-100">
          Immerse yourself in calming soundscapes designed to reduce stress and enhance focus
        </p>
      </div>

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Current Track Player */}
      {currentTrack && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 ${currentTrack.color} rounded-xl flex items-center justify-center text-2xl`}>
              {currentTrack.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{currentTrack.name}</h3>
              <p className="text-gray-600 text-sm">{currentTrack.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors duration-200"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="text-gray-600 hover:text-gray-800">
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sound Tracks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
              currentTrack?.id === track.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => playTrack(track)}
          >
            <div className={`w-16 h-16 ${track.color} rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto`}>
              {track.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{track.name}</h3>
            <p className="text-gray-600 text-sm text-center mb-3">{track.description}</p>
            <div className="flex items-center justify-center">
              <span className="text-xs font-medium text-primary-600 uppercase tracking-wide bg-primary-100 px-2 py-1 rounded-full">
                {track.category}
              </span>
            </div>
            {currentTrack?.id === track.id && (
              <div className="mt-4 flex items-center justify-center">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-8 bg-primary-500 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Usage Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Sound Therapy Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-2">🎧 For Best Results:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Use headphones for immersive experience</li>
              <li>• Find a comfortable, quiet space</li>
              <li>• Start with 10-15 minute sessions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">🌟 Recommended Uses:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Study sessions (White Noise, Binaural)</li>
              <li>• Stress relief (Ocean, Forest Rain)</li>
              <li>• Sleep preparation (Crickets, Fire)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundTherapy;