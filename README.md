# Nexus Social Network

A premium mobile social network built with React Native, Expo, and Firebase. Connect, create content, and monetize with our innovative coin system.

## Features

### Social Features
- 📝 **Create Posts** - Text, images, videos, and long-form articles
- 🔄 **Feed** - "For You" algorithm and "Following" tab with infinite scroll
- ❤️ **Engagement** - Like, comment, repost, and share
- 🎬 **Video Hub** - Reels-style video feed
- 📰 **Articles** - Long-form content platform
- 🔍 **Explore** - Trending hashtags, posts, and users
- 💬 **Comments** - Threaded replies and discussions
- 🔗 **Social Graph** - Follow/unfollow, see followers/following
- 👤 **Profiles** - User profiles with bio, avatar, and stats
- ⭐ **Advanced** - Bookmarks, muting, blocking, reporting, drafts

### Monetization
- 💰 **Nexus Coins** - Send coins to creators with beautiful animations
- 💳 **Stripe Integration** - Buy coin packs
- 👑 **Creator Monetization** - Subscriptions, tipping, ad-revenue sharing
- 📊 **Analytics** - Track earnings and engagement

## Tech Stack

- **Frontend**: React Native, Expo
- **Backend**: Firebase (Auth, Firestore, Storage, Messaging)
- **State Management**: Zustand
- **Navigation**: React Navigation
- **UI**: Expo Linear Gradient, Reanimated, Gesture Handler
- **Payments**: Stripe
- **Language**: TypeScript

## Project Structure

```
src/
├── components/      # Reusable UI components
├── screens/         # Screen components
│   ├── auth/       # Authentication screens
│   ├── home/       # Main feed screens
│   ├── create/     # Post creation
│   ├── profile/    # User profile & settings
│   └── monetization/ # Coin & payment screens
├── navigation/      # Navigation setup
├── services/        # Firebase & API services
├── store/          # Zustand state management
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript types
├── constants/      # App constants
└── config/         # Configuration files
```

## Getting Started

### Prerequisites
- Node.js >= 16
- Expo CLI
- Firebase project

### Installation

```bash
# Clone repository
git clone https://github.com/Godwinog/nexus_social.git
cd nexus_social

# Install dependencies
npm install

# Configure Firebase
# Update src/config/firebase.ts with your Firebase config

# Start Expo
npm start

# Run on iOS/Android
npm run ios
npm run android
```

## Environment Variables

Create a `.env` file in the root directory:

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## Features in Progress
- Real-time notifications
- Advanced content recommendations
- Creator analytics dashboard
- Subscription management
- Admin panel

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

MIT License - see LICENSE file for details

## Support

For support, email support@nexus.social or visit nexus.social

---

**Made with ❤️ by the Nexus Team**
