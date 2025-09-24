import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import LoginPage from './components/Auth/LoginPage';
import ConsentForm from './components/Auth/ConsentForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import MoodCheckin from './components/MoodCheckin/MoodCheckin';
import Journal from './components/Journal/Journal';
import WellnessVideos from './components/Wellness/WellnessVideos';
import SoundTherapy from './components/SoundTherapy/SoundTherapy';
import MentalHealthAssessment from './components/Assessment/MentalHealthAssessment';
import AIChat from './components/Chat/AIChat';

const AppContent: React.FC = () => {
  const { state } = useApp();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Show login page if not authenticated
  if (!state.isAuthenticated) {
    return <LoginPage />;
  }

  // Show consent form if user hasn't seen it yet
  if (!state.hasSeenConsent) {
    return <ConsentForm />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setActiveSection} />;
      case 'mood-checkin':
        return <MoodCheckin />;
      case 'journal':
        return <Journal />;
      case 'wellness':
        return <WellnessVideos />;
      case 'therapy':
        return <SoundTherapy />;
      case 'assessment':
        return <MentalHealthAssessment />;
      case 'chat':
        return <AIChat />;
      case 'consultation':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Virtual Consultation</h2>
            <p className="text-gray-600 mb-6">
              Book private sessions with licensed mental health professionals.
            </p>
            <p className="text-sm text-gray-500">
              This feature will be available soon. In the meantime, please use our AI chat for immediate support.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600 mb-6">
              Manage your account preferences and privacy settings.
            </p>
            <p className="text-sm text-gray-500">
              Settings panel coming soon.
            </p>
          </div>
        );
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;