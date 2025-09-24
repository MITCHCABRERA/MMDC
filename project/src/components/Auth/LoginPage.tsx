import React from 'react';
import { Heart, Shield, Users, Star } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { User } from '../../types';

const LoginPage: React.FC = () => {
  const { dispatch } = useApp();

  const handleGoogleLogin = () => {
    // In a real implementation, this would integrate with Google OAuth
    // For demonstration purposes, we'll create a mock user
    const mockUser: User = {
      id: 'user-123',
      email: 'john.doe@mmdc.edu.ph',
      name: 'John Doe',
      studentId: 'MMDC-2024-001',
      hasConsented: false,
      joinedAt: new Date(),
    };

    dispatch({ type: 'SET_USER', payload: mockUser });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="min-h-screen flex">
        {/* Left Side - Hero Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                MMCD MindCare
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your comprehensive mental health support platform
              </p>
            </div>

            {/* Login Button */}
            <div className="space-y-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 rounded-xl py-4 px-6 text-gray-700 font-medium hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  G
                </div>
                <span>Continue with MMDC Gmail</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Restricted to @mmdc.edu.ph email addresses
                </p>
              </div>
            </div>

            {/* Features Preview */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                What's inside:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">😊</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Mood Tracking</p>
                </div>
                <div className="text-center p-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">📝</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Private Journal</p>
                </div>
                <div className="text-center p-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">🧘</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Wellness Videos</p>
                </div>
                <div className="text-center p-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">🤖</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">AI Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 to-secondary-500 items-center justify-center p-8">
          <div className="max-w-md text-white space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Supporting MMDC Students Every Step of the Way
              </h2>
              <p className="text-primary-100 text-lg">
                Designed specifically for the unique challenges faced by medical and healthcare students.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Privacy First</h3>
                  <p className="text-primary-100 text-sm">
                    Your data is encrypted and secure. Journal entries are private and protected.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Professional Support</h3>
                  <p className="text-primary-100 text-sm">
                    Access to licensed counselors and mental health professionals when needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Evidence-Based</h3>
                  <p className="text-primary-100 text-sm">
                    Tools and techniques backed by mental health research and best practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white border-opacity-20">
              <p className="text-primary-100 text-sm">
                "Taking care of your mental health is just as important as your physical health. 
                We're here to support you through your academic journey."
              </p>
              <p className="text-white font-medium mt-2">
                — MMDC Student Wellness Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;