# React Native Storybook

Storybook for viewing and testing `@cash-app/ui` components on mobile devices.

## Usage

```bash
npm run storybook:native
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code for physical device

## Adding Stories

Stories are shared with web Storybook, located in `packages/ui`:

```
packages/ui/atoms/Button/
├── Button.tsx
├── Button.stories.tsx  ← Same story file
└── index.ts
```

## Configuration

- `storybook/index.ts` - Storybook configuration for React Native
- Story format is the same as web Storybook

## Testing Platform-Specific Components

For components with `.web.tsx` and `.native.tsx` variants:

- Web Storybook automatically loads `.web.tsx` version
- React Native Storybook automatically loads `.native.tsx` version
