# FEATURE-001: Login Page UI Components

**Type:** Feature
**Platform:** Both
**Status:** ✅ Complete
**Created:** 2025-10-19
**Completed:** 2025-10-19
**Assignee:** ui-expert

## Description

Build the foundational UI components needed for the login page using Gluestack UI as the base. This includes form inputs, buttons, and container components that will be used by the fullstack-expert to build the login screen.

The components should leverage Gluestack UI's built-in accessibility, theming, and cross-platform support while maintaining consistency with the Gluestack UI v2.0 Design Kit in Figma.

## Acceptance Criteria

- [x] Input component (atom) is available for email and password fields
- [x] Button component (atom) is available with primary action styling
- [x] FormField component (molecule) combines Input with label and error display
- [x] Card/Container component (molecule) is available for wrapping the login form
- [x] All components work on both React Native and web
- [x] All components support Tailwind/NativeWind styling
- [x] All components have TypeScript types
- [x] All components have Storybook stories documenting variants (51 stories total)
- [x] Components follow Gluestack UI composition patterns
- [x] Accessibility features are preserved from Gluestack UI base components

## Tasks

### Setup (if not already done)
- [x] Initialize Gluestack UI in apps/mobile (npx gluestack-ui init)
- [x] Initialize Gluestack UI in apps/next (npx gluestack-ui init)
- [x] Create GluestackProvider wrapper in packages/ui/provider/
- [x] Configure theme in packages/ui/config/gluestack-ui.config.ts

### Atoms
- [x] **Input Component** (packages/ui/atoms/Input/)
  - Re-export Gluestack's Input and InputField components
  - Add custom focus styles using Tailwind classes
  - Support email and password input types
  - Add size variants (sm, md, lg)
  - Create Input.stories.tsx with all variants (14 stories created)

- [x] **Button Component** (packages/ui/atoms/Button/)
  - Re-export Gluestack's Button, ButtonText, ButtonSpinner components
  - Configure default variant as 'solid' with primary action
  - Support loading state with spinner
  - Support disabled state
  - Create Button.stories.tsx showing all variants (14 stories created)

### Molecules
- [x] **FormField Component** (packages/ui/molecules/FormField/)
  - Extend Gluestack's FormControl component
  - Combine FormControl + FormControlLabel + Input + FormControlError
  - Support required field indicator
  - Support error state and error message display
  - Support helper text
  - Create FormField.stories.tsx with validation examples (12 stories created)

- [x] **Card Component** (packages/ui/molecules/Card/)
  - Extend Gluestack's Box component
  - Add elevated variant with shadow
  - Add outlined variant with border
  - Support padding customization
  - Create Card.stories.tsx showing both variants (11 stories created)

### Documentation
- [x] Update packages/ui/index.ts with all new exports
- [x] Ensure all components export proper TypeScript types
- [x] Test web Storybook (npm run storybook:web)
- [x] Test React Native Storybook (npm run storybook:native)
- [x] Verify Tailwind classes work on both platforms

## Technical Notes

**Gluestack UI Base Components to Use:**
- Input, InputField (for text inputs)
- Button, ButtonText, ButtonSpinner (for action buttons)
- FormControl, FormControlLabel, FormControlError (for form fields)
- Box (for Card component)
- Text (for labels and errors)

**Figma Reference:**
- File Key: AVKx1rAhJojXGssnxYikYL
- Design System Root Node: 203:7391
- Components Node: 203:2

**Use Figma Tools to:**
- Get design specs for Input, Button, and Form components
- Extract exact spacing, colors, and typography
- Verify visual consistency with design system

**Component Exports:**
All components should be exported from `@cash-app/ui` for use by fullstack-expert:
```typescript
import {
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonSpinner,
  FormField,
  Card
} from '@cash-app/ui'
```

**Styling Approach:**
- Use Tailwind CSS classes via NativeWind
- Extend Gluestack's default theme in gluestack-ui.config.ts
- Use design tokens from theme for colors, spacing, typography

**Accessibility:**
- Leverage Gluestack's built-in WCAG compliance
- Ensure proper label associations
- Support screen readers
- Keyboard navigation support

## Related Tickets

- Blocks: FEATURE-002 (Login Screen Implementation)
- Blocks: FEATURE-003 (Mobile Login Integration)
- Blocks: FEATURE-004 (Web Login Integration)
