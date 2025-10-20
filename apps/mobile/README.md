# Cash App Mobile

Expo-based React Native mobile application for Cash App.

## Features

- Cross-platform (iOS & Android)
- Expo Router for file-based navigation
- Authentication with login screen
- Shared UI components from `@cash-app/ui`
- Shared business logic from `@cash-app/app`

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- Expo CLI (installed automatically)
- iOS Simulator (macOS only) or Android Emulator

### Installation

From the workspace root:

```bash
npm install
```

### Running the App

```bash
# Start development server
npm run dev:mobile

# Start on iOS simulator
cd apps/mobile && npm run ios

# Start on Android emulator
cd apps/mobile && npm run android

# Start on web (for quick testing)
cd apps/mobile && npm run web
```

## Project Structure

```
apps/mobile/
├── app/                    # Expo Router navigation
│   ├── _layout.tsx        # Root layout with providers
│   ├── index.tsx          # Entry point (auth routing)
│   ├── login.tsx          # Login screen route
│   └── (tabs)/            # Tab navigation
│       ├── _layout.tsx    # Tabs layout
│       └── index.tsx      # Home screen
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## Navigation

This app uses **Expo Router** for file-based navigation:

- `/` - Entry point, redirects based on auth state
- `/login` - Login screen (public)
- `/(tabs)` - Authenticated tab navigation
  - `/(tabs)/index` - Home screen

### Navigation Flow

1. App starts at `/` (index.tsx)
2. Index route checks auth state using `useAuth()`
3. If authenticated: redirects to `/(tabs)`
4. If not authenticated: redirects to `/login`
5. After successful login: navigates to `/(tabs)` using `router.replace()`

## Provider Configuration

The app wraps all routes with required providers in `app/_layout.tsx`:

```tsx
<UIProvider>          {/* Gluestack UI theme */}
  <AppProvider>       {/* Auth context + other app state */}
    <Stack />         {/* Expo Router navigation */}
  </AppProvider>
</UIProvider>
```

### UIProvider

Provides Gluestack UI theme and styling system from `@cash-app/ui`.

### AppProvider

Provides authentication context and other shared app state from `@cash-app/app`.

## Authentication

### Login Screen

Located at `/login`, the login screen:
- Uses `LoginScreen` component from `@cash-app/app`
- Handles keyboard behavior with `KeyboardAvoidingView`
- Respects safe areas with `SafeAreaView`
- Dismisses keyboard on tap outside
- Navigates to home on successful login

### Mock Credentials

For testing (configured in `@cash-app/app`):
- Email: Any valid email format
- Password: `password123`

### State Persistence

Auth state persists across app restarts using AsyncStorage:
- Token stored on successful login
- Token restored on app launch
- Token cleared on logout

## Mobile Optimizations

### Keyboard Handling

```tsx
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  style={{ flex: 1 }}
>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {/* Content */}
  </TouchableWithoutFeedback>
</KeyboardAvoidingView>
```

### Safe Areas

```tsx
<SafeAreaView style={{ flex: 1 }}>
  {/* Content respects iOS notch and home indicator */}
</SafeAreaView>
```

### Status Bar

Configured in `app/_layout.tsx`:
```tsx
<StatusBar style="dark" />
```

### Android Keyboard Mode

Set in `app.json`:
```json
"android": {
  "softwareKeyboardLayoutMode": "pan"
}
```

## Deep Linking

The app supports deep linking with the `cashapp://` scheme.

**Examples:**
- `cashapp://login` - Opens login screen
- `cashapp://` - Opens app home

**Configuration** in `app.json`:
```json
{
  "scheme": "cashapp",
  "plugins": [
    ["expo-router", { "origin": "cashapp://" }]
  ]
}
```

## Dependencies

### Workspace Packages

- `@cash-app/app` - Shared business logic and features
- `@cash-app/ui` - Shared UI components

### Key Dependencies

- `expo` (~50.0.0) - Expo SDK
- `expo-router` (~3.4.0) - File-based navigation
- `react-native` (0.73.6) - React Native core
- `@react-native-async-storage/async-storage` - Local storage
- `react-native-safe-area-context` - Safe area handling
- `@gluestack-ui/themed` - UI component library

## Development

### TypeScript

The app uses strict TypeScript configuration:
```bash
# Check types
npm run lint
```

### Testing

To test the app:
1. Start the development server: `npm run dev:mobile`
2. Open iOS simulator: Press `i`
3. Open Android emulator: Press `a`
4. Test login flow with mock credentials
5. Test navigation between screens
6. Test logout functionality

## Building for Production

```bash
# Build for iOS
cd apps/mobile && eas build --platform ios

# Build for Android
cd apps/mobile && eas build --platform android
```

Note: Requires Expo Application Services (EAS) setup.

## React Native New Architecture

This app is running on **React Native's new architecture** which provides improved performance and developer experience.

### What's Enabled

The new architecture includes:

- **Fabric Renderer**: New rendering system for better performance and smoother UI
- **TurboModules**: Synchronous native module access with type safety
- **Bridgeless Mode**: Direct JSI-based JavaScript-to-native communication
- **Better Type Safety**: Improved TypeScript support for native modules

### Configuration

New architecture is enabled via `expo-build-properties` plugin in `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "newArchEnabled": true
          },
          "android": {
            "newArchEnabled": true
          }
        }
      ]
    ]
  }
}
```

### Verification

To verify the new architecture is enabled, check the logs when the app starts:

```
=== React Native New Architecture Status ===
Bridgeless Mode: true
TurboModules Enabled: true
Fabric Enabled: true
```

You can also programmatically check:

```typescript
console.log('Bridgeless Mode:', global.RN$Bridgeless === true)
console.log('TurboModules:', global.__turboModuleProxy != null)
console.log('Fabric:', global.nativeFabricUIManager != null)
```

### Performance Benefits

- **Faster Startup**: 10-20% improvement in app launch time
- **Smoother Animations**: Reduced bridge overhead for better frame rates
- **Better Memory Management**: More efficient native module communication
- **Improved Interop**: Seamless JavaScript-to-native calls

### Compatibility

All dependencies in this project are compatible with the new architecture:

| Package | Version | New Arch Support |
|---------|---------|------------------|
| expo | ~50.0.0 | Yes |
| react-native | 0.73.6 | Yes |
| expo-router | ~3.4.0 | Yes |
| @react-native-async-storage/async-storage | 1.23.1 | Yes |
| @gluestack-ui/themed | ^1.1.73 | Yes |
| react-native-safe-area-context | 4.8.2 | Yes |
| react-native-screens | ~3.29.0 | Yes |

### Rebuilding After Changes

If you modify `app.json` or add new native dependencies:

```bash
cd apps/mobile

# Clean build artifacts
rm -rf node_modules ios/Pods ios/Podfile.lock

# Reinstall dependencies
npm install

# Regenerate iOS project with new architecture
npx expo prebuild --platform ios --clean

# For Android
npx expo prebuild --platform android --clean
```

### Rollback (If Needed)

If you need to disable the new architecture:

1. Remove or set `newArchEnabled: false` in `app.json`:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": { "newArchEnabled": false },
          "android": { "newArchEnabled": false }
        }
      ]
    ]
  }
}
```

2. Clean and rebuild:
```bash
cd apps/mobile
rm -rf node_modules ios android
npm install
npx expo prebuild --clean
```

### Known Issues

#### RCTDeviceEventEmitter Error (RESOLVED)

The original error:
```
Invariant Violation: Failed to call into JavaScript module method RCTDeviceEventEmitter.emit().
Module has not been registered as callable. Bridgeless Mode: false.
```

**This error is now resolved** by enabling the new architecture. Bridgeless Mode eliminates the legacy bridge that caused module registration issues.

#### Debugging in New Architecture

- Use Flipper for debugging (built-in support for new architecture)
- Chrome DevTools may have limited functionality
- React DevTools work normally

### Resources

- [Expo New Architecture Guide](https://docs.expo.dev/guides/new-architecture/)
- [React Native New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
- [Migration Guide](https://github.com/reactwg/react-native-new-architecture/discussions)

## Troubleshooting

### Metro bundler won't start

```bash
# Clear cache
cd apps/mobile
rm -rf node_modules .expo
npm install
npm start -- --clear
```

### iOS simulator issues

```bash
# Reset simulator
xcrun simctl erase all
```

### Android emulator issues

```bash
# Clear build cache
cd apps/mobile/android
./gradlew clean
```

### New Architecture Not Enabled

If logs show `Bridgeless Mode: false`:

1. Verify `app.json` has `expo-build-properties` plugin with `newArchEnabled: true`
2. Check `ios/Podfile.properties.json` contains `"newArchEnabled": "true"`
3. Clean and rebuild:
```bash
cd apps/mobile
rm -rf node_modules ios
npm install
npx expo prebuild --platform ios --clean
```

## Related Documentation

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Gluestack UI Documentation](https://ui.gluestack.io/)
- [Project Handoff Guide](/Users/n2jn/Documents/projects/cash-app/packages/app/HANDOFF.md)
