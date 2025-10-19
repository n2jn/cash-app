# @cash-app/ui

Cross-platform UI component library built on **Gluestack UI** with Atomic Design organization.

## Overview

This package provides reusable UI components that work on both React Native (mobile) and web platforms. Built on top of [Gluestack UI](https://gluestack.io/ui), it combines:
- 30+ pre-built accessible components from Gluestack
- Tailwind CSS styling with NativeWind
- Custom components organized by Atomic Design
- Consistent theming across platforms

## Foundation: Gluestack UI

We use Gluestack UI as our component foundation because it provides:
- ✅ Cross-platform components (React Native + Web)
- ✅ Built-in accessibility (WCAG compliant)
- ✅ Tailwind CSS with NativeWind for styling
- ✅ Comprehensive component library
- ✅ Customizable theming system

## Structure

```
packages/ui/
├── config/              # Gluestack & Tailwind configuration
│   ├── gluestack-ui.config.ts
│   └── tailwind.config.js
├── atoms/               # Basic building blocks (re-export or extend Gluestack)
├── molecules/           # Combinations of atoms
├── organisms/           # Complex components
├── templates/           # Page layouts
├── provider/            # GluestackUIProvider wrapper
└── theme/               # Brand customization
```

## Usage

### Using Gluestack Components Directly

```typescript
import { Button, ButtonText, Input, InputField, Box } from '@cash-app/ui'

function MyComponent() {
  return (
    <Box className="p-4">
      <Input>
        <InputField placeholder="Email" />
      </Input>
      <Button className="mt-4">
        <ButtonText>Submit</ButtonText>
      </Button>
    </Box>
  )
}
```

### Custom Components

```typescript
import { FormField, Card } from '@cash-app/ui'

function LoginForm() {
  return (
    <Card>
      <FormField label="Email" placeholder="Enter email" />
      <FormField label="Password" type="password" />
    </Card>
  )
}
```

## Theming

Customize Gluestack's theme in `config/gluestack-ui.config.ts`:

```typescript
import { config as defaultConfig } from '@gluestack-ui/config'

export const config = {
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      primary: '#007AFF',      // Your brand color
      secondary: '#5856D6',
    },
  },
}
```

## Storybook

View and test components:
- Web: `npm run storybook:web` → http://localhost:6006
- React Native: `npm run storybook:native`

## Available Gluestack Components

**Forms:** Button, Input, Textarea, Checkbox, Radio, Switch, Select, Slider

**Layout:** Box, HStack, VStack, Center, Divider

**Feedback:** Alert, Toast, Spinner, Progress, Modal

**Data Display:** Avatar, Badge, Text, Heading

**Overlay:** Popover, Tooltip, Menu, Actionsheet

[Full component list](https://gluestack.io/ui/docs/components/all-components)

## Adding New Components

### 1. Check if Gluestack Provides It
Always check [Gluestack's components](https://gluestack.io/ui/docs/components/all-components) first.

### 2. Decision Tree
- **Gluestack has it?** → Re-export it
- **Need customization?** → Extend Gluestack component
- **Gluestack doesn't have it?** → Build custom using Gluestack primitives

### 3. Implementation

**Re-export Gluestack component:**
```typescript
// atoms/Button/index.ts
export { Button, ButtonText, ButtonIcon } from '@gluestack-ui/themed'
```

**Extend Gluestack component:**
```typescript
// molecules/Card/Card.tsx
import { Box } from '@gluestack-ui/themed'

export const Card = ({ children, variant = 'elevated', ...props }) => (
  <Box
    className={`
      p-4 rounded-lg
      ${variant === 'elevated' ? 'bg-white shadow-md' : 'bg-white border border-gray-200'}
    `}
    {...props}
  >
    {children}
  </Box>
)
```

### 4. Create Storybook Story
Document all variants and usage examples.

## Atomic Design Pattern

### Atoms (Level 1)
Basic components - **mostly re-exported from Gluestack**:
- Button, Input, Text, Heading, Icon, Image, Box, HStack, VStack, Avatar, Badge

### Molecules (Level 2)
Simple combinations:
- FormField (FormControl + Input + FormControlError)
- Card (extends Box)
- ListItem (HStack + Avatar + Text + Icon)

### Organisms (Level 3)
Complex components:
- Form, Header, SearchBar
- May use Gluestack's Modal, Alert, Actionsheet

### Templates (Level 4)
Page layouts:
- ScreenLayout, TwoColumnLayout, ModalLayout

## Platform Compatibility

All components work on:
- ✅ iOS (React Native)
- ✅ Android (React Native)
- ✅ Web (Next.js with React Native Web)

Gluestack handles platform differences automatically!

## Guidelines

1. **Gluestack First**: Check if Gluestack provides the component before building custom
2. **Tailwind Styling**: Use Tailwind classes via className prop
3. **Component Composition**: Follow Gluestack's pattern (e.g., Button + ButtonText)
4. **Accessibility**: Gluestack components have built-in accessibility
5. **Typed**: Strong TypeScript interfaces for all props
6. **Tested**: Each component has Storybook stories
7. **Documented**: Props documented with JSDoc comments
