import React from 'react';
import { 
  Home, 
  Heart, 
  BookOpen, 
  FileText, 
  Headphones, 
  MessageCircle, 
  Calendar, 
  BarChart3,
  Settings,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'mood-checkin', label: 'Mood Check-in', icon: Zap },
  { id: 'journal', label: 'Digital Journal', icon: FileText },
  { id: 'wellness', label: 'Wellness Videos', icon: BookOpen },
  { id: 'therapy', label: 'Sound Therapy', icon: Headphones },
  { id: 'assessment', label: 'Health Assessment', icon: BarChart3 },
  { id: 'chat', label: 'AI Support', icon: MessageCircle },
  { id: 'consultation', label: 'Consultation', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-16">
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;