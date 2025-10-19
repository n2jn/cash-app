# @cash-app/ui

Cross-platform UI component library following Atomic Design principles.

## Structure

```
packages/ui/
├── atoms/              # Basic building blocks
│   ├── Button/
│   ├── Text/
│   ├── Input/
│   └── Icon/
├── molecules/          # Simple combinations
│   ├── FormField/
│   ├── Card/
│   └── ListItem/
├── organisms/          # Complex components
│   ├── Form/
│   ├── Header/
│   └── NavigationBar/
├── templates/          # Page layouts
│   └── ScreenLayout/
├── utils/              # Helpers
│   ├── theme.ts
│   └── styles.ts
└── index.ts            # Barrel exports
```

## Atomic Design Pattern

### Atoms
Basic, indivisible UI components:
- Button
- Text
- Input
- Icon
- Image
- Spacer

### Molecules
Simple combinations of atoms:
- FormField (Label + Input)
- Card (Container + Text + Image)
- ListItem (Icon + Text + Button)

### Organisms
Complex, reusable sections:
- Form (Multiple FormFields + Button)
- Header (Logo + Navigation + Button)
- SearchBar (Input + Icon + Button)

### Templates
Page-level layouts:
- ScreenLayout (Header + Content + Footer)
- TwoColumnLayout
- ModalLayout

## Platform-Specific Components

When a component doesn't work on both platforms, use file extensions:

```
atoms/Button/
├── Button.tsx         # Shared implementation
├── Button.web.tsx    # Web-specific override
└── Button.native.tsx # Mobile-specific override
```

## Usage

### In Shared App Package
```typescript
import { Button, Card, Header } from '@cash-app/ui'
```

### In Mobile App
```typescript
import { Button } from '@cash-app/ui'
// Automatically uses Button.native.tsx if it exists
```

### In Web App
```typescript
import { Button } from '@cash-app/ui'
// Automatically uses Button.web.tsx if it exists
```

## Storybook

View and test components in isolation:

### Web Storybook
```bash
npm run storybook:web
```

### React Native Storybook
```bash
npm run storybook:native
```

## Guidelines

1. **Reusable**: Components should be generic and configurable
2. **Typed**: Strong TypeScript interfaces for all props
3. **Accessible**: Use proper accessibility labels
4. **Tested**: Each component has Storybook stories
5. **Documented**: Props documented with JSDoc comments
6. **Styled**: Use StyleSheet.create, avoid inline styles
7. **Cross-platform first**: Build for both platforms, override when needed

## Theme

All components use the shared theme from `utils/theme.ts`:

```typescript
import { theme } from '@cash-app/ui/utils/theme'

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
})
```
