# MMCD MindCare - Mental Health Support Platform

A comprehensive mental health support platform designed specifically for MMDC students, featuring AI chatbot support, mood tracking, digital journaling, wellness resources, and more.

## Features

- 🧠 **AI Mental Health Support** - 24/7 compassionate AI assistant
- 📊 **Mood Tracking** - Daily check-ins with personalized recommendations
- 📝 **Digital Journal** - Private, encrypted journaling with mood tagging
- 🧘 **Wellness Videos** - Guided meditation, breathing exercises, and stretching
- 🎵 **Sound Therapy** - Calming soundscapes for relaxation and focus
- 📋 **Mental Health Assessment** - Regular wellness check-ins with recommendations
- 🔒 **Privacy First** - Encrypted data storage and secure authentication

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mmcd-mindcare.git
cd mmcd-mindcare
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Create a new repository** on GitHub
2. **Push your code** to the repository
3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "GitHub Actions"
4. **Push to main branch** - the site will automatically deploy

Your site will be available at: `https://yourusername.github.io/repository-name`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Chat/           # AI chat functionality
│   ├── Dashboard/      # Main dashboard
│   ├── Journal/        # Digital journaling
│   ├── Layout/         # Layout components
│   ├── MoodCheckin/    # Mood tracking
│   ├── SoundTherapy/   # Audio therapy
│   └── Wellness/       # Wellness videos
├── contexts/           # React contexts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # CSS styles
```

## Features Overview

### 🔐 Authentication
- Secure login system
- Privacy consent management
- User profile management

### 📊 Dashboard
- Personalized wellness overview
- Quick access to all features
- Recent activity tracking
- Daily wellness tips

### 😊 Mood Tracking
- Daily mood check-ins
- Visual mood trends
- Personalized recommendations
- Mood history analysis

### 📝 Digital Journal
- Private, secure journaling
- Optional encryption
- Mood tagging
- Search and filtering
- Tag organization

### 🤖 AI Support
- 24/7 mental health assistant
- Crisis detection and resources
- Personalized coping strategies
- Academic stress support

### 🧘 Wellness Resources
- Guided meditation videos
- Breathing exercises
- Stretching routines
- Mindfulness practices

### 🎵 Sound Therapy
- Nature sounds
- White noise
- Binaural beats
- Focus enhancement

### 📋 Health Assessment
- Regular wellness check-ins
- Personalized recommendations
- Progress tracking
- Professional referrals when needed

## Privacy & Security

- All journal entries can be encrypted
- Secure data storage
- Privacy-first design
- GDPR compliant
- Crisis intervention protocols

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help or have questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

## Acknowledgments

- Built with ❤️ for MMDC students
- Designed with mental health best practices
- Inspired by evidence-based wellness approaches

---

**Important**: This application provides supportive tools and resources but is not a substitute for professional medical or psychiatric care. In case of mental health emergencies, please contact emergency services or seek immediate professional help.