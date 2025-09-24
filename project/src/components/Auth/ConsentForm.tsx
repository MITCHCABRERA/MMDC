import React, { useState } from 'react';
import { Shield, Check, AlertTriangle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

const ConsentForm: React.FC = () => {
  const { dispatch } = useApp();
  const [agreements, setAgreements] = useState({
    dataCollection: false,
    dataUse: false,
    mentalHealthSupport: false,
    emergencyContact: false,
    ageConfirmation: false,
  });

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = () => {
    const allAgreed = Object.values(agreements).every(Boolean);
    if (allAgreed) {
      dispatch({ type: 'SET_CONSENT_SEEN', payload: true });
    }
  };

  const allAgreed = Object.values(agreements).every(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            MMCD MindCare Consent Form
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please review and agree to the following terms before using our mental health support platform
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Data Collection */}
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Collection & Privacy</h3>
              <p className="text-gray-700 text-sm mb-3">
                We collect and securely store your mood check-ins, journal entries, and usage data to provide 
                personalized mental health support. All journal entries can be encrypted for additional privacy. 
                Your data is protected according to Philippine Data Privacy Act standards.
              </p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreements.dataCollection}
                  onChange={() => handleAgreementChange('dataCollection')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">I consent to the collection and secure storage of my data</span>
              </label>
            </div>

            {/* Data Use */}
            <div className="border-l-4 border-secondary-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How We Use Your Information</h3>
              <p className="text-gray-700 text-sm mb-3">
                Your information is used to provide personalized recommendations, track your wellness progress, 
                and improve our services. We may share anonymized, aggregated data for research purposes to 
                improve mental health support for students.
              </p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreements.dataUse}
                  onChange={() => handleAgreementChange('dataUse')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">I agree to the described use of my information</span>
              </label>
            </div>

            {/* Mental Health Support */}
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mental Health Support Disclaimer</h3>
              <p className="text-gray-700 text-sm mb-3">
                MMCD MindCare provides supportive tools and resources but is not a substitute for professional 
                medical or psychiatric care. In case of mental health emergencies, please contact emergency 
                services or seek immediate professional help.
              </p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreements.mentalHealthSupport}
                  onChange={() => handleAgreementChange('mentalHealthSupport')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">I understand this is not a replacement for professional mental health care</span>
              </label>
            </div>

            {/* Emergency Contact */}
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Situations</h3>
              <p className="text-gray-700 text-sm mb-3">
                If you express thoughts of self-harm or suicide, we may need to contact emergency services 
                or designated contacts for your safety. Your wellbeing is our top priority.
              </p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreements.emergencyContact}
                  onChange={() => handleAgreementChange('emergencyContact')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">I understand emergency protocols for safety situations</span>
              </label>
            </div>

            {/* Age Confirmation */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Age Confirmation</h3>
              <p className="text-gray-700 text-sm mb-3">
                By using this service, you confirm that you are at least 18 years old or have parental/guardian 
                consent to use mental health support services.
              </p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreements.ageConfirmation}
                  onChange={() => handleAgreementChange('ageConfirmation')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">I confirm I meet the age requirements</span>
              </label>
            </div>
          </div>

          {/* Crisis Resources */}
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-red-800">Crisis Resources</h4>
                <p className="text-sm text-red-700 mt-1">
                  If you're in immediate danger or having thoughts of self-harm:
                </p>
                <ul className="text-sm text-red-700 mt-2 space-y-1">
                  <li>• Call 911 for immediate emergency assistance</li>
                  <li>• National Crisis Hotline: 988</li>
                  <li>• MMDC Counseling Services: [Contact Info]</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              disabled={!allAgreed}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                allAgreed
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check className="w-5 h-5" />
              <span>I Agree and Want to Continue</span>
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By clicking "I Agree", you consent to the terms outlined above and can begin using MMCD MindCare services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentForm;