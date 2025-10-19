# Storybook Testing Guide

Quick guide to test both Storybook instances and verify that all 51 stories from `packages/ui` are visible and working.

## Prerequisites

Ensure all dependencies are installed:

```bash
npm install
```

## Testing Web Storybook

### 1. Start Web Storybook

From project root:

```bash
npm run storybook:web
```

This will:
- Start the Storybook dev server
- Open at `http://localhost:6006`
- Watch for changes and hot reload

### 2. Verify Stories Are Visible

In your browser, you should see the following story hierarchy in the sidebar:

```
Atoms
├── Button (14 stories)
│   ├── Primary
│   ├── Secondary
│   ├── Outline
│   ├── Link
│   ├── Small
│   ├── Medium
│   ├── Large
│   ├── Loading
│   ├── Disabled
│   ├── Positive
│   ├── Negative
│   ├── Full Width
│   ├── Login Button
│   └── Outline Secondary
│
└── Input (14 stories)
    ├── Default
    ├── Placeholder
    ├── With Value
    ├── Password
    ├── Email
    ├── Number
    ├── Error State
    ├── Success State
    ├── Disabled
    ├── Read Only
    ├── With Icon
    ├── Search Input
    ├── Multiline
    └── Required

Molecules
├── Card (11 stories)
│   ├── Default
│   ├── Elevated
│   ├── Outlined
│   ├── With Header
│   ├── With Footer
│   ├── With Image
│   ├── Interactive
│   ├── Loading State
│   ├── Error State
│   ├── Success State
│   └── Custom Padding
│
└── FormField (12 stories)
    ├── Default
    ├── With Error
    ├── Required
    ├── Success State
    ├── Disabled
    ├── Email Field
    ├── Password Field
    ├── With Helper Text
    ├── Long Label
    ├── Multiline
    ├── Optional
    └── Character Count
```

**Total: 51 stories**

### 3. Test Story Interactions

For each story:

1. Click on the story in the sidebar
2. Verify the component renders without errors
3. Check the "Controls" tab to adjust props
4. Check the "Actions" tab for event logs (if applicable)
5. Check the "Docs" tab for auto-generated documentation

### 4. Test Hot Reload

1. Open a story file (e.g., `packages/ui/atoms/Button/Button.stories.tsx`)
2. Make a small change (e.g., change button text)
3. Save the file
4. Verify the change appears in the browser without a full refresh

### 5. Expected Behavior

- All 51 stories should be visible
- No console errors
- Components render correctly
- Controls work (change props and see updates)
- Hot reload works

## Testing React Native Storybook

### 1. Start React Native Storybook

From project root:

```bash
npm run storybook:native
```

This will:
- Start the Expo dev server
- Display QR code and options

### 2. Choose Your Platform

Press one of the following:

- **iOS**: Press `i` (requires Xcode and iOS Simulator)
- **Android**: Press `a` (requires Android Studio and emulator)
- **Physical Device**: Scan the QR code with Expo Go app

### 3. Verify Stories Are Visible

Once the app opens, you should see the Storybook UI with:

1. **Sidebar/Navigation**: Shows all available stories
2. **Component Preview**: Displays the selected story
3. **Controls Panel**: Allows changing props (may need to open via button)

The same 51 stories should be visible:

- **Atoms/Button** (14 stories)
- **Atoms/Input** (14 stories)
- **Molecules/Card** (11 stories)
- **Molecules/FormField** (12 stories)

### 4. Test Story Interactions

For each story:

1. Navigate to the story
2. Verify the component renders without errors
3. Open the controls panel (if available)
4. Test interactions (tap buttons, type in inputs, etc.)
5. Verify events are logged (if actions addon is working)

### 5. Test Hot Reload

1. With the app running, open a story file
2. Make a small change
3. Save the file
4. Verify the change appears in the app (may need to shake device/simulator for dev menu and reload)

### 6. Expected Behavior

- All 51 stories should be visible
- No Metro bundler errors
- Components render correctly on the device/simulator
- Touch interactions work
- Hot reload works (Metro should reload automatically)

## Troubleshooting

### Web Storybook Issues

#### No stories appear

**Solution**:
1. Check that story files exist in `packages/ui/**/*.stories.tsx`
2. Check browser console for errors
3. Verify webpack configuration in `apps/storybook/.storybook/main.ts`
4. Run `npm install` to ensure dependencies are installed

#### Module resolution errors

**Solution**:
1. Check the webpack alias configuration in `main.ts`
2. Verify `@cash-app/ui` is aliased to `../../packages/ui`
3. Check that `babel-loader` is configured for `packages/ui`

#### Components don't render

**Solution**:
1. Check browser console for import errors
2. Verify component exports in `packages/ui/index.ts`
3. Check that Gluestack UI is installed: `npm list @gluestack-ui/themed`

### React Native Storybook Issues

#### Metro bundler errors

**Solution**:
1. Check `metro.config.js` configuration
2. Verify `watchFolders` includes workspace root
3. Clear Metro cache: `npx expo start --clear`
4. Run `npm install` to ensure dependencies are installed

#### Stories not appearing

**Solution**:
1. Check `storybook.requires.js` imports all story files
2. Verify paths are correct (relative to `apps/storybook-rn`)
3. Add missing story imports manually

Example:
```javascript
const getStoriesFromPackagesUI = () => {
  return [
    require('../../packages/ui/atoms/Button/Button.stories.tsx'),
    require('../../packages/ui/atoms/Input/Input.stories.tsx'),
    require('../../packages/ui/molecules/Card/Card.stories.tsx'),
    require('../../packages/ui/molecules/FormField/FormField.stories.tsx'),
  ]
}
```

#### Components don't render on device

**Solution**:
1. Check that Expo can resolve `@gluestack-ui/themed`
2. Verify `metro.config.js` extraNodeModules configuration
3. Check for TypeScript errors in component files
4. Restart Metro bundler with cache clear: `npx expo start --clear`

#### Can't connect to dev server

**Solution**:
1. Ensure device/simulator and computer are on same network
2. Check firewall settings
3. Try running on simulator instead: Press `i` for iOS or `a` for Android
4. Restart the Expo dev server

## Verification Checklist

Use this checklist to verify both Storybook instances are working correctly:

### Web Storybook

- [ ] Storybook starts without errors
- [ ] Opens at `http://localhost:6006`
- [ ] All 51 stories are visible in sidebar
- [ ] Atoms/Button (14 stories) all render
- [ ] Atoms/Input (14 stories) all render
- [ ] Molecules/Card (11 stories) all render
- [ ] Molecules/FormField (12 stories) all render
- [ ] Controls addon works (can change props)
- [ ] Actions addon works (events are logged)
- [ ] Docs addon works (auto-generated docs visible)
- [ ] Hot reload works (changes appear without refresh)
- [ ] No console errors

### React Native Storybook

- [ ] Expo starts without errors
- [ ] App opens on device/simulator
- [ ] All 51 stories are visible in navigation
- [ ] Atoms/Button (14 stories) all render
- [ ] Atoms/Input (14 stories) all render
- [ ] Molecules/Card (11 stories) all render
- [ ] Molecules/FormField (12 stories) all render
- [ ] Touch interactions work
- [ ] Components look correct on device
- [ ] Hot reload works (Metro reloads on changes)
- [ ] No Metro bundler errors

## Performance Testing

### Web Storybook

Expected performance:

- **Initial Load**: < 5 seconds
- **Story Navigation**: < 500ms
- **Hot Reload**: < 2 seconds
- **Build Time**: < 30 seconds

### React Native Storybook

Expected performance:

- **Initial Build**: < 60 seconds (first time)
- **Subsequent Builds**: < 10 seconds
- **Hot Reload**: < 3 seconds
- **Story Navigation**: < 1 second

## Next Steps

Once both Storybook instances are verified:

1. **Add More Stories**: Create stories for new components in `packages/ui`
2. **Update Documentation**: Add MDX files for component guidelines
3. **Visual Testing**: Consider integrating Chromatic for visual regression testing
4. **Accessibility Testing**: Use Storybook's a11y addon to test accessibility
5. **Share with Team**: Share Storybook URLs with designers and stakeholders

## Running in CI/CD

### Building Static Storybook (Web)

For deployment or sharing:

```bash
npm run build-storybook:web
```

This creates a static build in `apps/storybook/storybook-static/` that can be deployed to any static hosting service.

### Automated Testing

Consider adding:

- **Visual Regression Tests**: Using Chromatic or Percy
- **Accessibility Tests**: Using @storybook/addon-a11y
- **Interaction Tests**: Using @storybook/testing-library

## Support

If you encounter issues:

1. Check `STORYBOOK_SETUP.md` for detailed configuration
2. Review the troubleshooting section above
3. Check Storybook logs for error messages
4. Verify all dependencies are installed
5. Clear caches and restart dev servers
