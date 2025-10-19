# Storybook Configuration for Cash App Monorepo

This document explains the Storybook setup for the Cash App monorepo, including both web and React Native instances.

## Overview

The monorepo contains two Storybook instances that share the same story files from `packages/ui`:

- **Web Storybook** (`apps/storybook/`) - For viewing components in a browser
- **React Native Storybook** (`apps/storybook-rn/`) - For viewing components on iOS/Android

Both instances automatically load stories from `packages/ui/**/*.stories.tsx`.

## Quick Start

### Running Web Storybook

From project root:

```bash
npm run storybook:web
```

Opens at `http://localhost:6006`

### Running React Native Storybook

From project root:

```bash
npm run storybook:native
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code for physical device

## Configuration Details

### Web Storybook (`apps/storybook/`)

#### File Structure

```
apps/storybook/
├── .storybook/
│   ├── main.ts         # Main configuration
│   └── preview.ts      # Global decorators/parameters
├── package.json
└── README.md
```

#### Key Configuration (`main.ts`)

```typescript
const config: StorybookConfig = {
  // Story paths - loads from packages/ui
  stories: [
    '../../packages/ui/**/*.stories.@(js|jsx|ts|tsx)',
    '../../packages/ui/**/*.mdx',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-react-native-web',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  // Webpack configuration for monorepo package resolution
  webpackFinal: async (config) => {
    // Alias @cash-app/ui to packages/ui
    config.resolve.alias['@cash-app/ui'] =
      path.resolve(__dirname, '../../packages/ui')

    // Add packages directory to module resolution
    config.resolve.modules = [
      path.resolve(__dirname, '../../packages'),
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ]

    // Ensure babel-loader processes packages/ui
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [path.resolve(__dirname, '../../packages/ui')],
      use: ['babel-loader'],
    })

    return config
  },
}
```

#### How It Works

1. **Story Discovery**: Storybook scans `packages/ui/**/*.stories.tsx` for story files
2. **Module Resolution**: Webpack resolves `@cash-app/ui` imports to `packages/ui`
3. **Transpilation**: Babel transpiles TypeScript/JSX from `packages/ui`
4. **Hot Reload**: Changes to stories or components trigger hot reload

### React Native Storybook (`apps/storybook-rn/`)

#### File Structure

```
apps/storybook-rn/
├── .ondevice/
│   ├── main.js         # Story discovery config
│   ├── preview.js      # Global decorators/parameters
│   └── storybook.tsx   # Storybook UI setup
├── App.tsx             # Entry point
├── index.js            # Storybook initialization
├── metro.config.js     # Metro bundler config
├── storybook.requires.js  # Story loader (auto-generated)
├── package.json
└── README.md
```

#### Key Configuration

**Metro Config (`metro.config.js`)**

```javascript
const config = getDefaultConfig(projectRoot)

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot]

// Add monorepo node_modules to resolution
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// Resolve @cash-app/ui to packages/ui
config.resolver.extraNodeModules = {
  '@cash-app/ui': path.resolve(workspaceRoot, 'packages/ui'),
}
```

**Story Loader (`storybook.requires.js`)**

```javascript
const getStoriesFromPackagesUI = () => {
  return [
    require('../../packages/ui/atoms/Button/Button.stories.tsx'),
    require('../../packages/ui/atoms/Input/Input.stories.tsx'),
    require('../../packages/ui/molecules/Card/Card.stories.tsx'),
    require('../../packages/ui/molecules/FormField/FormField.stories.tsx'),
  ]
}

configure(getStoriesFromPackagesUI(), module, false)
```

#### How It Works

1. **Metro Bundler**: Watches entire monorepo workspace
2. **Module Resolution**: Metro resolves `@cash-app/ui` to `packages/ui`
3. **Story Loading**: `storybook.requires.js` explicitly imports all story files
4. **Hot Reload**: Metro triggers hot reload on changes

#### Adding New Stories

When new story files are added to `packages/ui`, manually update `storybook.requires.js`:

```javascript
const getStoriesFromPackagesUI = () => {
  return [
    require('../../packages/ui/atoms/Button/Button.stories.tsx'),
    require('../../packages/ui/atoms/Input/Input.stories.tsx'),
    require('../../packages/ui/molecules/Card/Card.stories.tsx'),
    require('../../packages/ui/molecules/FormField/FormField.stories.tsx'),
    // Add new story files here
    require('../../packages/ui/atoms/NewComponent/NewComponent.stories.tsx'),
  ]
}
```

## Available Stories

Currently, 51 stories are available across both Storybook instances:

### Atoms (28 stories)

- **Button** (14 stories)
  - Primary, Secondary, Outline, Link
  - Small, Medium, Large
  - Loading, Disabled
  - Positive, Negative
  - Full Width, Login Button, Outline Secondary

- **Input** (14 stories)
  - Default, Placeholder, With Value
  - Password, Email, Number
  - Error State, Success State
  - Disabled, Read Only
  - With Icon, Search Input, Multiline, Required

### Molecules (23 stories)

- **FormField** (12 stories)
  - Default, With Error, Required
  - Success State, Disabled
  - Email Field, Password Field
  - With Helper Text, Long Label
  - Multiline, Optional, Character Count

- **Card** (11 stories)
  - Default, Elevated, Outlined
  - With Header, With Footer
  - With Image, Interactive
  - Loading State, Error State
  - Success State, Custom Padding

## Story File Format

Stories are written using Storybook's Component Story Format (CSF):

```typescript
// Example: Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonText } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Primary Button</ButtonText>
    </Button>
  ),
  args: {
    action: 'primary',
    variant: 'solid',
    size: 'md',
  },
}
```

This format works for both web and React Native Storybook.

## Troubleshooting

### Web Storybook

**Issue**: Stories not appearing

- Check that `packages/ui/**/*.stories.tsx` files exist
- Verify webpack alias in `.storybook/main.ts`
- Check browser console for import errors
- Run `npm install` to ensure dependencies are installed

**Issue**: Module resolution errors

- Verify `webpackFinal` configuration in `main.ts`
- Check that `babel-loader` is configured for `packages/ui`
- Ensure `@cash-app/ui` alias points to correct path

### React Native Storybook

**Issue**: Stories not appearing

- Check that `storybook.requires.js` imports all story files
- Verify Metro config watches monorepo workspace
- Run `npm install` to ensure dependencies are installed

**Issue**: Metro bundler errors

- Check `metro.config.js` configuration
- Verify `watchFolders` includes workspace root
- Ensure `extraNodeModules` resolves `@cash-app/ui`

**Issue**: "Cannot find module" errors

- Update `storybook.requires.js` with correct paths
- Verify story file paths are relative to `apps/storybook-rn`
- Check that Metro can resolve TypeScript files (`.tsx`)

## Dependencies

### Web Storybook

```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@babel/preset-react": "^7.23.0",
    "@babel/preset-typescript": "^7.23.0",
    "@storybook/addon-essentials": "^7.0.0",
    "@storybook/addon-interactions": "^7.0.0",
    "@storybook/addon-links": "^7.0.0",
    "@storybook/addon-react-native-web": "^0.0.20",
    "@storybook/blocks": "^7.0.0",
    "@storybook/react": "^7.0.0",
    "@storybook/react-webpack5": "^7.0.0",
    "babel-loader": "^9.1.0",
    "react-native-web": "^0.19.0",
    "storybook": "^7.0.0",
    "typescript": "^5.0.0"
  }
}
```

### React Native Storybook

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.6",
    "@storybook/react-native": "^6.5.0",
    "@storybook/addon-ondevice-actions": "^6.5.0",
    "@storybook/addon-ondevice-controls": "^6.5.0",
    "@storybook/addon-ondevice-backgrounds": "^6.5.0"
  }
}
```

## Benefits of This Setup

1. **Shared Stories**: Write once, view on both web and mobile
2. **Monorepo Integration**: Stories automatically load from `packages/ui`
3. **Hot Reload**: Changes trigger instant updates
4. **Component Testing**: Test UI components in isolation
5. **Documentation**: Auto-generated docs from TypeScript types
6. **Cross-Platform**: Verify components work on web and React Native

## Next Steps

1. **Run Web Storybook**: `npm run storybook:web`
2. **Run React Native Storybook**: `npm run storybook:native`
3. **Create New Stories**: Add `*.stories.tsx` files to `packages/ui`
4. **Update Documentation**: Add MDX files for component guidelines
5. **Add Visual Testing**: Integrate Chromatic or similar for visual regression testing
