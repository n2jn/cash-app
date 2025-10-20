# FEATURE-005: Enable React Native New Architecture for iOS

**Type:** Technical Infrastructure
**Platform:** Mobile (iOS primary, Android secondary)
**Status:** Todo
**Priority:** High (Blocks iOS Development)
**Created:** 2025-10-20
**Assignee:** expo-expert

## Description

Enable React Native's new architecture (Fabric renderer + TurboModules) in the Expo mobile app to resolve native module registration errors and improve overall application performance. The current app is running on the legacy architecture which is causing runtime errors on iOS, specifically the `RCTDeviceEventEmitter` module registration error.

### Background

The user is experiencing this error when running the iOS app:
```
Invariant Violation: Failed to call into JavaScript module method RCTDeviceEventEmitter.emit().
Module has not been registered as callable. Bridgeless Mode: false.
```

This indicates the app is running in legacy bridge mode and encountering module registration issues. The new architecture provides:
- **Fabric**: New rendering system for better performance and native integration
- **TurboModules**: New native module system with synchronous access
- **Bridgeless Mode**: Direct JSI-based communication without the legacy bridge
- **Better Type Safety**: TypeScript-friendly native module interfaces

### Current State
- App running on legacy React Native architecture (Bridgeless Mode: false)
- RCTDeviceEventEmitter errors blocking iOS development
- Potential performance limitations due to bridge overhead

### Expected Outcome
- New architecture enabled for both iOS and Android
- iOS app builds and runs without module registration errors
- All existing features work correctly (authentication, navigation, UI)
- Performance improvements from native JSI integration
- Foundation for future native module integration

## Acceptance Criteria

- [ ] New architecture enabled in Expo app configuration (app.json)
- [ ] iOS app builds successfully with new architecture
- [ ] iOS app runs without RCTDeviceEventEmitter errors
- [ ] Android configuration updated for new architecture compatibility
- [ ] All dependencies verified as compatible with new architecture
- [ ] Pod install completes successfully on iOS
- [ ] Authentication flow works correctly on iOS
- [ ] Navigation (expo-router) works correctly on iOS
- [ ] UI components render correctly on iOS
- [ ] AsyncStorage persistence works correctly
- [ ] No console errors or warnings related to new architecture
- [ ] App performance baseline documented (before/after comparison)
- [ ] README documentation updated with new architecture notes

## Tasks

### Phase 1: Configuration and Setup
- [ ] Install expo-build-properties plugin (`npx expo install expo-build-properties`)
- [ ] Configure app.json with new architecture settings:
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
- [ ] Review package.json dependencies for new architecture compatibility
- [ ] Check Expo SDK version compatibility (SDK 50+ recommended)

### Phase 2: Dependency Verification
- [ ] Verify @react-native-async-storage/async-storage compatibility
- [ ] Verify expo-router compatibility with new architecture
- [ ] Verify @gluestack-ui/themed compatibility
- [ ] Verify react-native-reanimated compatibility (if used)
- [ ] Check for any custom native modules and verify compatibility
- [ ] Update any incompatible dependencies to supported versions

### Phase 3: iOS Build and Testing
- [ ] Clean iOS build artifacts (`cd apps/mobile/ios && rm -rf Pods Podfile.lock`)
- [ ] Run pod install with new architecture (`cd apps/mobile/ios && pod install`)
- [ ] Rebuild iOS app (`npx expo run:ios`)
- [ ] Verify app launches without crashes
- [ ] Check for RCTDeviceEventEmitter errors (should be resolved)
- [ ] Verify Bridgeless Mode is enabled in logs

### Phase 4: Feature Testing on iOS
- [ ] Test authentication flow (login, logout, session persistence)
- [ ] Test navigation between screens
- [ ] Test all UI components render correctly
- [ ] Test AsyncStorage read/write operations
- [ ] Test keyboard behavior and form inputs
- [ ] Test any native features (if applicable)
- [ ] Monitor console for new architecture-related warnings

### Phase 5: Android Configuration
- [ ] Verify Android new architecture configuration
- [ ] Test Android build (`npx expo run:android`)
- [ ] Verify Android app works correctly
- [ ] Check for any Android-specific new architecture issues

### Phase 6: Performance and Documentation
- [ ] Document app startup time (before/after)
- [ ] Document any performance improvements observed
- [ ] Document any breaking changes encountered
- [ ] Update apps/mobile/README.md with new architecture section
- [ ] Add troubleshooting guide for common new architecture issues
- [ ] Document Bridgeless Mode verification steps

## Technical Notes

### Expo SDK Compatibility
- New architecture requires **Expo SDK 50+**
- Check current SDK version in package.json
- May need to upgrade Expo SDK if on older version

### Known Compatibility Considerations
- **AsyncStorage**: Ensure using latest version (@react-native-async-storage/async-storage@^1.21.0+)
- **Expo Router**: Compatible with SDK 50+ new architecture
- **Gluestack UI**: Verify compatibility (check docs or GitHub issues)
- **Reanimated**: May need worklet configuration updates

### Common Migration Issues
1. **Module Registration**: Some legacy native modules may not work
2. **AsyncStorage**: Older versions may have issues
3. **Third-party Libraries**: Check each dependency's new architecture support
4. **Custom Native Code**: Any custom native modules need migration

### Verification Steps
Check Bridgeless Mode is enabled:
```javascript
// Add to App.tsx temporarily
console.log('Bridgeless Mode:', global.RN$Bridgeless === true);
```

Expected output: `Bridgeless Mode: true`

### Rollback Plan
If issues arise:
1. Remove expo-build-properties plugin from app.json
2. Clean iOS build: `cd apps/mobile/ios && rm -rf Pods Podfile.lock`
3. Reinstall pods: `pod install`
4. Rebuild app

### Performance Expectations
- Faster app startup (10-20% improvement typical)
- Reduced bridge overhead for native module calls
- Smoother animations and transitions
- Better memory management

### Resources
- [Expo New Architecture Guide](https://docs.expo.dev/guides/new-architecture/)
- [React Native New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)
- [Migration Guide](https://github.com/reactwg/react-native-new-architecture/discussions)

## Related Tickets

- Related to: FEATURE-003 (Mobile App Integration - may need updates if issues found)
- Blocks: Future native module integration work
- May Impact: Any tickets involving native functionality

## Success Metrics

- iOS app builds and runs without errors
- RCTDeviceEventEmitter error eliminated
- Bridgeless Mode: true in logs
- All existing features functional
- No regression in app stability
- Measurable performance improvements

## Notes

- This is a foundational upgrade that enables future native features
- Should be tested thoroughly before merging to main branch
- Consider testing on both physical devices and simulators
- May require updates to CI/CD pipelines if configured
