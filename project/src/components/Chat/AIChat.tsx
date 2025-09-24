import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot, User, Lightbulb } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { ChatMessage } from '../../types';

const AIChat: React.FC = () => {
  const { state } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        userId: state.user?.id || '',
        message: '',
        response: `Hello ${state.user?.name?.split(' ')[0] || 'there'}! I'm your AI mental health support assistant. I'm here to listen, provide coping strategies, and help you navigate your wellness journey. How are you feeling today?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [state.user, messages.length]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Mood-related responses
    if (message.includes('sad') || message.includes('depressed') || message.includes('down')) {
      return "I hear that you're feeling sad, and I want you to know that your feelings are valid. It's okay to have difficult days. Here are some things that might help:\n\n• Try some gentle breathing exercises\n• Consider writing in your journal about what you're experiencing\n• Listen to calming music or nature sounds\n• Remember that this feeling is temporary\n\nWould you like me to guide you through a breathing exercise, or would you prefer to talk about what's making you feel this way?";
    }
    
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried') || message.includes('stress')) {
      return "Anxiety can feel overwhelming, but there are effective ways to manage it. Let's work through this together:\n\n• Try the 4-7-8 breathing technique: Inhale for 4, hold for 7, exhale for 8\n• Ground yourself using the 5-4-3-2-1 technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n• Consider our guided meditation videos\n• Remember: anxiety is temporary and manageable\n\nWhat specific situation is causing you anxiety? Sometimes talking through it can help.";
    }
    
    if (message.includes('angry') || message.includes('frustrated') || message.includes('mad')) {
      return "Anger is a natural emotion, and it's important to acknowledge it. Here are some healthy ways to process these feelings:\n\n• Take slow, deep breaths to calm your nervous system\n• Try physical movement like stretching or walking\n• Write about your feelings in your journal\n• Use our sound therapy for relaxation\n\nWhat's triggering these feelings? Sometimes understanding the root cause can help us address it more effectively.";
    }
    
    if (message.includes('happy') || message.includes('good') || message.includes('great') || message.includes('excited')) {
      return "That's wonderful to hear! I'm so glad you're feeling positive today. It's important to acknowledge and celebrate these good moments:\n\n• Consider journaling about what's making you feel good\n• Share your positive energy with others\n• Use this energy for self-care activities\n• Remember this feeling for challenging days\n\nWhat's contributing to your positive mood today?";
    }
    
    // Study/academic stress
    if (message.includes('study') || message.includes('exam') || message.includes('school') || message.includes('academic')) {
      return "Academic stress is very common among students, especially in demanding programs like yours. Here are some strategies that can help:\n\n• Break large tasks into smaller, manageable chunks\n• Use the Pomodoro Technique: 25 minutes focused study, 5-minute break\n• Practice mindfulness during study breaks\n• Maintain a regular sleep schedule\n• Don't forget to take care of your basic needs\n\nRemember, your worth isn't determined by your grades. What specific academic challenge are you facing?";
    }
    
    // Sleep issues
    if (message.includes('sleep') || message.includes('tired') || message.includes('insomnia')) {
      return "Sleep is crucial for mental health and academic performance. Here are some tips for better sleep:\n\n• Establish a consistent bedtime routine\n• Avoid screens 1 hour before bed\n• Try our guided sleep meditations\n• Keep your room cool and dark\n• Avoid caffeine late in the day\n• Practice relaxation techniques before bed\n\nHow long have you been experiencing sleep difficulties? Are there specific thoughts keeping you awake?";
    }
    
    // Crisis or self-harm indicators
    if (message.includes('hurt myself') || message.includes('suicide') || message.includes('end it all') || message.includes('don\'t want to live')) {
      return "I'm very concerned about what you've shared, and I want you to know that you're not alone. Your life has value, and there are people who want to help.\n\n🚨 IMMEDIATE RESOURCES:\n• National Crisis Hotline: 988\n• Emergency Services: 911\n• MMDC Counseling Services: [Contact Info]\n\nPlease reach out to one of these resources right away. You deserve support and care. Is there someone you trust who you can contact right now?";
    }
    
    // General support
    if (message.includes('help') || message.includes('support')) {
      return "I'm here to support you in whatever way I can. Here are some ways I can help:\n\n• Listen to your concerns without judgment\n• Provide coping strategies for stress and difficult emotions\n• Guide you through relaxation techniques\n• Help you explore your feelings\n• Connect you with additional resources\n\nWhat kind of support would be most helpful for you right now?";
    }
    
    // Default response
    return "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling or what's on your mind? Sometimes talking through our thoughts and feelings can help us process them better.\n\nIf you're looking for specific support, I can help with:\n• Stress management techniques\n• Coping strategies for difficult emotions\n• Relaxation and mindfulness exercises\n• Academic stress support\n\nWhat would be most helpful for you today?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !state.user) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: state.user.id,
      message: inputMessage,
      response: '',
      timestamp: new Date(),
      mood: state.currentMood || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: state.user?.id || '',
        message: '',
        response: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    "I'm feeling stressed about my studies",
    "I'm having trouble sleeping",
    "I feel anxious about upcoming exams",
    "I'm feeling overwhelmed",
    "I need help managing my emotions",
    "I'm having a good day today"
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <MessageCircle className="w-6 h-6" />
          <h2 className="text-2xl font-bold">AI Mental Health Support</h2>
        </div>
        <p className="text-purple-100">
          Your compassionate AI assistant is here to listen and provide support 24/7
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-96">
          {messages.map((message) => (
            <div key={message.id}>
              {message.message && (
                <div className="flex justify-end mb-4">
                  <div className="max-w-xs lg:max-w-md bg-primary-600 text-white rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-medium">You</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                </div>
              )}
              
              {message.response && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md bg-gray-100 text-gray-900 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600">AI Assistant</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.response}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md bg-gray-100 text-gray-900 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-medium text-purple-600">AI Assistant</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Quick responses:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickResponses.slice(0, 3).map((response, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(response)}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              rows={2}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This AI assistant provides supportive guidance but is not a replacement for professional mental health care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;