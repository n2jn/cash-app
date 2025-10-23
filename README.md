# Cash App Monorepo

A modern, cross-platform monorepo containing mobile (Expo), web (Next.js), and UI component library applications. Built with the latest React and React Native technologies.

## Overview

This monorepo uses **npm workspaces** to manage multiple applications and shared packages efficiently. It supports iOS, Android, and web platforms from a single, shared codebase.

## Project Structure

```
cash-app-monorepo/
├── apps/
│   ├── mobile/          # Expo mobile app (iOS/Android)
│   │   ├── app/         # Expo Router file-based routing
│   │   ├── ios/         # iOS native code
│   │   ├── android/     # Android native code
│   │   ├── assets/      # Mobile assets
│   │   ├── app.json     # Expo configuration
│   │   └── babel.config.js
│   ├── next/            # Next.js web application
│   │   ├── app/         # Next.js App Router
│   │   ├── middleware.ts
│   │   └── next.config.js
│   └── storybook/       # Storybook for UI development
├── packages/
│   ├── app/             # Shared cross-platform app logic
│   │   ├── features/    # Feature modules
│   │   ├── provider/    # App-level providers
│   │   ├── hooks/       # Shared hooks
│   │   └── utils/       # Utilities
│   └── ui/              # Cross-platform UI components (Gluestack)
│       ├── atoms/       # Basic components
│       ├── molecules/   # Composite components
│       ├── provider/    # UI providers
│       └── config/      # UI configuration
├── scripts/
│   └── clean.sh         # Comprehensive cleanup script
├── tickets/             # Feature tickets and documentation
├── .claude/
│   └── commands/        # Custom AI agent commands
├── .env.dev             # Development environment
├── .env.prod            # Production environment
├── .env.test            # Test environment
└── package.json         # Root workspace configuration
```

## Technology Stack

### Mobile App (Expo)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Expo SDK** | ~54.0.8 | Mobile framework |
| **React Native** | 0.81.4 | Cross-platform mobile UI |
| **React** | 19.1.1 | UI library |
| **Expo Router** | ~6.0.6 | File-based routing |
| **React Native Reanimated** | ~4.1.1 | Animations |
| **React Native Gesture Handler** | ~2.28.0 | Touch handling |
| **React Native Screens** | ~4.16.0 | Native navigation |
| **React Native SVG** | 15.14.0 | SVG support |
| **React Native Worklets** | 0.6.1 | JavaScript worklets |
| **Gluestack UI** | ^1.1.73 | Component library |
| **NativeWind** | ^4.2.1 | Tailwind for React Native |

**Platform Support:**
- **iOS**: 15.1+ (Hermes enabled, New Architecture disabled)
- **Android**: SDK 21+ (Android 5.0+)
- **Web**: Modern browsers via React Native Web

### Web App (Next.js)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15+ | React framework |
| **React** | 19.1.1 | UI library |
| **TypeScript** | ^5.0.0 | Type safety |

### Shared Packages

- **@cash-app/app**: Shared cross-platform application logic
- **@cash-app/ui**: Reusable UI components (Gluestack-based)

### Development Tools

- **TypeScript**: Type-safe development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Storybook**: UI component development
- **npm workspaces**: Monorepo management

## Prerequisites

Before getting started, ensure you have the following installed:

### Required

- **Node.js**: 20.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: 10.0.0 or higher (comes with Node.js)
- **Git**: For version control

### For Mobile Development

- **macOS** (for iOS development)
  - **Xcode**: 15.0 or higher ([Mac App Store](https://apps.apple.com/app/xcode/id497799835))
  - **Ruby**: 3.3.6 (for CocoaPods)
  - **CocoaPods**: 1.15.2 or higher (`gem install cocoapods`)

- **Android Studio** (for Android development)
  - Android SDK 34+
  - Android Build Tools
  - Android Emulator (optional)

### Verify Installation

```bash
node --version   # Should be 20.0.0+
npm --version    # Should be 10.0.0+
ruby --version   # Should be 3.3.6+ (for iOS)
pod --version    # Should be 1.15.2+ (for iOS)
```

## Getting Started

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd cash-app-monorepo
```

2. **Install dependencies**

```bash
npm install
```

This will install dependencies for all workspaces (mobile, next, storybook, packages).

3. **Set up iOS (macOS only)**

```bash
cd apps/mobile
npx pod-install
```

## Development

### Mobile App (Expo)

```bash
# Start Expo development server
npm run dev:mobile

# Run on iOS simulator (macOS only)
cd apps/mobile && npm run ios

# Run on Android emulator
cd apps/mobile && npm run android

# Run on web browser
cd apps/mobile && npm run web
```

**Expo Router Navigation:**
- The mobile app uses file-based routing via Expo Router
- Routes are defined in `apps/mobile/app/` directory
- Learn more: [Expo Router Docs](https://docs.expo.dev/router/introduction/)

### Web App (Next.js)

```bash
# Start Next.js development server
npm run dev:next

# Build for production
npm run build:next

# Start production server
cd apps/next && npm start
```

### Storybook (UI Components)

```bash
# Start Storybook development server
npm run storybook

# Build Storybook
npm run build-storybook
```

## Available Scripts

### Development

```bash
npm run dev:mobile      # Start Expo mobile app (iOS/Android)
npm run dev:next        # Start Next.js web app
npm run storybook       # Start Storybook UI development
```

### Building

```bash
npm run build:mobile    # Export Expo app
npm run build:next      # Build Next.js for production
npm run build-storybook # Build Storybook static site
```

### Code Quality

```bash
npm run lint            # Run ESLint on all workspaces
npm run format          # Format code with Prettier
```

### Cleaning

The project includes comprehensive cleaning scripts for managing cache and build artifacts:

```bash
# Clean specific workspaces
npm run clean           # Clean root only (node_modules, package-lock.json)
npm run clean:mobile    # Clean mobile app (full clean + pod install)
npm run clean:next      # Clean Next.js app

# Mobile-specific cleaning
npm run clean:mobile:quick  # Clean mobile without pod install
npm run clean:mobile:ios    # Clean iOS only (Pods, derived data)

# Full cleanup
npm run clean:all       # Clean everything (all workspaces + dependencies)
npm run clean:deps      # Clean dependencies only (all node_modules)
```

**When to use cleaning scripts:**
- **After dependency updates**: `npm run clean:all` then `npm install`
- **Build issues**: `npm run clean:mobile` or `npm run clean:next`
- **iOS pod issues**: `npm run clean:mobile:ios`
- **Quick mobile reset**: `npm run clean:mobile:quick`

## Monorepo Management

### Workspace Structure

This project uses **npm workspaces** to manage packages:

- **apps/mobile**: `@cash-app/mobile`
- **apps/next**: `@cash-app/next`
- **apps/storybook**: `@cash-app/storybook`
- **packages/app**: `@cash-app/app`
- **packages/ui**: `@cash-app/ui`

### Adding Dependencies

```bash
# Add to specific workspace
npm install <package> --workspace=apps/mobile
npm install <package> --workspace=apps/next
npm install <package> --workspace=packages/ui

# Add to root (shared dev dependencies)
npm install <package> -D -w .

# Add to multiple workspaces
npm install <package> --workspace=apps/mobile --workspace=apps/next
```

### Using Shared Packages

```typescript
// In apps/mobile or apps/next
import { Button, Input } from '@cash-app/ui'
import { useAuth } from '@cash-app/app'
```

Shared packages use `"*"` version in workspace dependencies for automatic linking.

## Environment Variables

Environment variables are managed in root directory files:

- `.env.dev` - Development environment
- `.env.prod` - Production environment
- `.env.test` - Test environment

### Variable Prefixes

- **NEXT_PUBLIC_*** - Next.js client-side variables
- **NEXT_*** - Next.js server-side variables
- **MOBILE_*** - Mobile app variables
- **EXPO_PUBLIC_*** - Expo public variables

## Upgrade History

### Recent Major Upgrades (2025)

**Successfully upgraded to latest stable versions:**

- ✅ React Native: `0.73.6` → `0.81.4`
- ✅ Expo SDK: `50` → `54.0.8`
- ✅ React: `18.2.0` → `19.1.1`
- ✅ Expo Router: `3.x` → `6.0.6`
- ✅ React Native Reanimated: `3.x` → `4.1.1`
- ✅ All ecosystem packages aligned and compatible

**Key Improvements:**
- Fixed worklets dependency conflicts
- Aligned all package versions across workspaces
- Enabled Hermes for better performance
- Stable configuration (New Architecture disabled)

## Troubleshooting

### Common Issues

#### 1. Metro Bundler Cache Issues

```bash
npm run dev:mobile -- --clear
# or
npm run clean:mobile:quick
```

#### 2. iOS Build Failures

```bash
# Clean iOS build artifacts
npm run clean:mobile:ios

# Reinstall pods
cd apps/mobile/ios && pod install --repo-update
```

#### 3. Android Build Issues

```bash
# Clean Android build
cd apps/mobile/android
./gradlew clean

# Or use full mobile clean
npm run clean:mobile
```

#### 4. Dependency Conflicts

```bash
# Clean all dependencies and reinstall
npm run clean:all
npm install
```

#### 5. "Cannot find module" Errors

```bash
# Clean root and reinstall
npm run clean
npm install

# For persistent issues
npm run clean:deps
npm install
```

#### 6. Expo Router Navigation Not Working

- Ensure `expo-router` is in dependencies
- Clear Metro cache: `npm run dev:mobile -- --clear`
- Check that routes are in `apps/mobile/app/` directory

#### 7. Gluestack UI Styling Issues

- Verify `@gluestack-ui/themed` and `@gluestack-style/react` are installed
- Check that `GluestackUIProvider` wraps your app
- Clear cache and restart bundler

### Getting Help

- **Expo Documentation**: https://docs.expo.dev
- **Next.js Documentation**: https://nextjs.org/docs
- **React Native Documentation**: https://reactnative.dev
- **Gluestack UI**: https://gluestack.io/ui/docs

## Architecture

### Cross-Platform Strategy

This monorepo uses **React Native Web** to share code between mobile and web:

1. **UI Components** (`packages/ui/`): Built with Gluestack UI, work on all platforms
2. **App Logic** (`packages/app/`): Shared business logic, hooks, and providers
3. **Platform Apps**: Consume shared packages with platform-specific configurations

### Feature-Based Structure

Code is organized by **feature**, not by type:

```
packages/app/features/
├── auth/
│   ├── screens/
│   ├── components/
│   ├── hooks/
│   └── providers/
└── profile/
    ├── screens/
    └── components/
```

This makes features self-contained and easier to maintain.

## Contributing

1. Create a feature branch from `master`
2. Make your changes following the architecture guidelines
3. Run linting and formatting:
   ```bash
   npm run lint
   npm run format
   ```
4. Test on all platforms (iOS, Android, Web)
5. Commit your changes with clear commit messages
6. Create a pull request

### Code Standards

- **TypeScript**: Use strict types, avoid `any`
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Use absolute imports with workspace aliases
- **Testing**: Write tests for shared logic

## License

[Add your license here]

---

**Version**: 1.0.0
**Last Updated**: 2025-10-20
**Node Version**: 20.0.0+
**Expo SDK**: 54.0.8
**React Native**: 0.81.4
