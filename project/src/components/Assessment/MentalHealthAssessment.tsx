import React, { useState } from 'react';
import { BarChart3, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { MentalHealthAssessment, AssessmentResponse } from '../../types';

const MentalHealthAssessmentComponent: React.FC = () => {
  const { state, dispatch } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<MentalHealthAssessment | null>(null);

  const questions = [
    {
      id: 'q1',
      question: 'Over the past two weeks, how often have you felt down, depressed, or hopeless?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'q2',
      question: 'How often have you had little interest or pleasure in doing things?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'q3',
      question: 'How often have you felt nervous, anxious, or on edge?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
      ]
    },
    {
      id: 'q4',
      question: 'How well have you been able to manage stress in your daily life?',
      options: [
        { value: 0, label: 'Very well' },
        { value: 1, label: 'Fairly well' },
        { value: 2, label: 'Not very well' },
        { value: 3, label: 'Not well at all' }
      ]
    },
    {
      id: 'q5',
      question: 'How satisfied are you with your current sleep quality?',
      options: [
        { value: 0, label: 'Very satisfied' },
        { value: 1, label: 'Somewhat satisfied' },
        { value: 2, label: 'Not very satisfied' },
        { value: 3, label: 'Not satisfied at all' }
      ]
    }
  ];

  const handleAnswer = (answer: number) => {
    const newResponse: AssessmentResponse = {
      questionId: questions[currentQuestion].id,
      answer: answer
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const totalScore = updatedResponses.reduce((sum, response) => sum + (response.answer as number), 0);
      const maxScore = questions.length * 3;
      const percentage = (totalScore / maxScore) * 100;

      const recommendations = getRecommendations(percentage);

      const assessment: MentalHealthAssessment = {
        id: Date.now().toString(),
        userId: state.user?.id || '',
        score: percentage,
        responses: updatedResponses,
        recommendations,
        completedAt: new Date()
      };

      setResults(assessment);
      setIsComplete(true);
    }
  };

  const getRecommendations = (score: number): string[] => {
    if (score <= 25) {
      return [
        'Great! You seem to be managing well mentally.',
        'Continue with regular wellness practices like our guided videos.',
        'Consider daily mood check-ins to maintain awareness.',
        'Keep up your current self-care routine.'
      ];
    } else if (score <= 50) {
      return [
        'You may be experiencing some mild stress or mood changes.',
        'Try our sound therapy sessions for relaxation.',
        'Regular journaling can help process your thoughts.',
        'Consider our breathing exercises for stress management.',
        'Maintain good sleep hygiene and regular exercise.'
      ];
    } else if (score <= 75) {
      return [
        'You may be experiencing moderate stress or mood difficulties.',
        'We recommend trying our AI chatbot for additional support.',
        'Daily wellness activities like meditation could be beneficial.',
        'Consider scheduling a consultation with our counselors.',
        'Focus on stress-reduction techniques and self-care.'
      ];
    } else {
      return [
        'You may be experiencing significant stress or mood challenges.',
        'We strongly recommend booking a consultation with a licensed counselor.',
        'Try our AI support chatbot for immediate assistance.',
        'Use our crisis resources if you need immediate help.',
        'Consider reaching out to trusted friends, family, or professionals.'
      ];
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 25) return 'text-green-600';
    if (score <= 50) return 'text-yellow-600';
    if (score <= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score <= 25) return <CheckCircle className="w-8 h-8 text-green-600" />;
    if (score <= 50) return <AlertCircle className="w-8 h-8 text-yellow-600" />;
    return <AlertCircle className="w-8 h-8 text-red-600" />;
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setIsComplete(false);
    setResults(null);
  };

  if (isComplete && results) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Assessment Results</h2>
          </div>
          <p className="text-blue-100">Your mental health check-in is complete</p>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              {getScoreIcon(results.score)}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Wellness Score</h3>
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(results.score)}`}>
              {Math.round(results.score)}/100
            </div>
            <p className="text-gray-600">
              {results.score <= 25 && 'Excellent mental wellness'}
              {results.score > 25 && results.score <= 50 && 'Good mental wellness with room for improvement'}
              {results.score > 50 && results.score <= 75 && 'Moderate stress levels - consider additional support'}
              {results.score > 75 && 'High stress levels - we recommend professional support'}
            </p>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h4>
            <div className="space-y-3">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={resetAssessment}
              className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Take Assessment Again
            </button>
            {results.score > 50 && (
              <button
                onClick={() => {/* Navigate to consultation booking */}}
                className="flex-1 bg-secondary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-secondary-700 transition-colors duration-200"
              >
                Book Consultation
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <BarChart3 className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Mental Health Assessment</h2>
        </div>
        <p className="text-blue-100">
          A brief check-in to understand your current mental wellness and provide personalized recommendations
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {questions[currentQuestion].question}
        </h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Important Notice</p>
            <p>
              This assessment is for informational purposes only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. If you're experiencing a mental health crisis, please contact emergency services 
              or a mental health professional immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthAssessmentComponent;