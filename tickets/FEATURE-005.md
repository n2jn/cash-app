# FEATURE-005: Login Form Component - Atomic UI Components

**Type:** Feature
**Platform:** Both
**Status:** Todo
**Created:** 2025-10-24
**Assignee:** ui-expert

## Description

Build a complete Login Form component system using atomic design principles based on Figma design specifications. This feature focuses on creating reusable UI components in the `packages/ui/` directory using Gluestack UI v1.1.73 and NativeWind v4.2.1 for cross-platform compatibility (React Native + React Web).

The Login Form includes:
- Heading with sign-up link
- Email and password input fields with labels
- Password visibility toggle (eye icon)
- "Remember me" checkbox
- "Forgot Password?" link
- Primary login button
- Divider with "OR CONTINUE WITH" text
- Social login buttons (Google, Twitter, GitHub)

**Design Tokens:**
- Typography: Heading/xl (24px Bold), Text-medium/sm (14px Medium), Text-semibold/sm (14px SemiBold), Text-normal/xs (12px Regular)
- Spacing: Uses spacing tokens (1=4px, 1.5=6px, 3=12px, 5=20px, 6=24px, 8=32px, 9=36px)
- Colors: Text, border, background, and primary color tokens
- Border radius: 6px for inputs/buttons, 12px for container

## Acceptance Criteria

- [ ] All components work on both React Native (iOS/Android) and React Web
- [ ] Components use Gluestack UI v1.1.73 as the foundation
- [ ] Components use NativeWind v4.2.1 for styling
- [ ] All atoms are standalone and reusable
- [ ] Molecules compose atoms correctly
- [ ] Organism (LoginForm) composes molecules and atoms
- [ ] All components have proper TypeScript types
- [ ] All components have Storybook stories
- [ ] Components follow existing project structure (packages/ui/atoms/, molecules/, organisms/)
- [ ] Components are exported from packages/ui/index.ts
- [ ] Visual design matches Figma specifications
- [ ] Components handle accessibility (aria labels, keyboard navigation)
- [ ] Components support theming via Gluestack config

## Tasks

### Phase 1: Atoms (Foundational Components)
These are the smallest building blocks with no dependencies on other custom components.

- [ ] **FEATURE-005-01**: Create Checkbox atom
  - Component: packages/ui/atoms/Checkbox/Checkbox.tsx
  - Re-export Gluestack Checkbox with custom styling
  - Props: checked, onChange, label, disabled
  - Variants: default
  - Storybook: Checkbox.stories.tsx

- [ ] **FEATURE-005-02**: Create Link atom
  - Component: packages/ui/atoms/Link/Link.tsx
  - Re-export Gluestack Link or create custom Pressable
  - Props: onPress, children, variant (inline, standalone)
  - Variants: primary, secondary, muted
  - Storybook: Link.stories.tsx

- [ ] **FEATURE-005-03**: Create Icon atom
  - Component: packages/ui/atoms/Icon/Icon.tsx
  - Wrapper for react-native-svg icons
  - Props: name, size, color
  - Support common icons: eye, eye-off, google, twitter, github
  - Storybook: Icon.stories.tsx

- [ ] **FEATURE-005-04**: Create Divider atom (if not in Gluestack)
  - Component: packages/ui/atoms/Divider/Divider.tsx
  - Re-export Gluestack Divider with custom variants
  - Props: orientation (horizontal/vertical), thickness
  - Variants: default, text (for "OR CONTINUE WITH")
  - Storybook: Divider.stories.tsx

- [ ] **FEATURE-005-05**: Enhance Text atom
  - Re-export Gluestack Text if not already done
  - Ensure typography variants match design tokens
  - Variants: heading-xl, text-sm-medium, text-sm-semibold, text-xs-normal, text-xs-medium
  - Already re-exported in index.ts - verify variants

- [ ] **FEATURE-005-06**: Enhance Heading atom
  - Re-export Gluestack Heading if not already done
  - Ensure size variants match design tokens
  - Already re-exported in index.ts - verify variants

### Phase 2: Molecules (Composed Components)
These components combine atoms into functional units.

- [ ] **FEATURE-005-07**: Enhance Input molecule with password toggle
  - Extend existing packages/ui/atoms/Input/Input.tsx
  - Add PasswordInput variant with eye icon toggle
  - Props: type (text/password), showPassword, onTogglePassword
  - Use Icon atom for eye/eye-off icons
  - Storybook: Update Input.stories.tsx with password variant

- [ ] **FEATURE-005-08**: Create FormLabel molecule
  - Component: packages/ui/molecules/FormLabel/FormLabel.tsx
  - Combines Text atom with spacing and styling
  - Props: children, required, htmlFor
  - Variants: default, required (with asterisk)
  - Storybook: FormLabel.stories.tsx

- [ ] **FEATURE-005-09**: Enhance FormField molecule
  - Extend existing packages/ui/molecules/FormField/FormField.tsx
  - Add support for password toggle integration
  - Ensure it works with enhanced Input (password variant)
  - Already exists - verify compatibility

- [ ] **FEATURE-005-10**: Create CheckboxField molecule
  - Component: packages/ui/molecules/CheckboxField/CheckboxField.tsx
  - Combines Checkbox atom with label Text
  - Props: checked, onChange, label, disabled
  - Layout: horizontal (checkbox + label)
  - Storybook: CheckboxField.stories.tsx

- [ ] **FEATURE-005-11**: Create TextDivider molecule
  - Component: packages/ui/molecules/TextDivider/TextDivider.tsx
  - Combines Divider atom with centered Text
  - Props: text (e.g., "OR CONTINUE WITH")
  - Layout: line - text - line
  - Storybook: TextDivider.stories.tsx

- [ ] **FEATURE-005-12**: Create SocialButton molecule
  - Component: packages/ui/molecules/SocialButton/SocialButton.tsx
  - Combines Button atom with Icon atom
  - Props: provider (google/twitter/github), onPress, disabled
  - Layout: Icon + Text (provider name)
  - Variants: outline with provider-specific icon
  - Storybook: SocialButton.stories.tsx

### Phase 3: Organism (Complete Component)
The final composed component that brings everything together.

- [ ] **FEATURE-005-13**: Create LoginForm organism
  - Component: packages/ui/organisms/LoginForm/LoginForm.tsx
  - Composes all molecules and atoms into complete login form
  - Props: onSubmit, onSocialLogin, onForgotPassword, onSignUp
  - Layout follows Figma design:
    - Heading with inline "Sign up" link
    - Email FormField
    - Password FormField with toggle
    - HStack: CheckboxField ("Remember me") + Link ("Forgot Password?")
    - Login Button
    - TextDivider ("OR CONTINUE WITH")
    - HStack: SocialButton (Google, Twitter, GitHub)
  - No business logic - UI only (controlled component)
  - Storybook: LoginForm.stories.tsx

### Phase 4: Documentation & Integration

- [ ] **FEATURE-005-14**: Update package exports
  - Update packages/ui/index.ts with all new exports:
    - Atoms: Checkbox, Link, Icon, Divider
    - Molecules: FormLabel, CheckboxField, TextDivider, SocialButton
    - Organisms: LoginForm
  - Ensure proper TypeScript types are exported

- [ ] **FEATURE-005-15**: Create comprehensive Storybook documentation
  - Ensure all components have stories
  - Create overview story showing atomic design hierarchy
  - Document props and usage examples
  - Show mobile and web renderings

- [ ] **FEATURE-005-16**: Test cross-platform compatibility
  - Test all components on React Native (iOS/Android)
  - Test all components on React Web
  - Verify responsive behavior
  - Test accessibility features
  - Verify theme compatibility

## Technical Notes

### Technology Stack
- **Gluestack UI v1.1.73**: Foundation for cross-platform components
- **NativeWind v4.2.1**: Tailwind CSS for React Native styling
- **React Native SVG**: For icon support
- **TypeScript**: Strict typing for all components

### Component Structure
Each component should follow this pattern:
```
packages/ui/
  atoms/
    ComponentName/
      ComponentName.tsx    # Component implementation
      index.ts            # Re-export
  molecules/
    ComponentName/
      ComponentName.tsx
      index.ts
  organisms/
    ComponentName/
      ComponentName.tsx
      index.ts
```

### Design System Integration
- Use Gluestack UI config for theming (packages/ui/config/gluestack-ui.config.ts)
- Leverage existing spacing, color, and typography tokens
- Ensure components respect light/dark mode
- Follow existing patterns from Button and Input atoms

### Accessibility Requirements
- All interactive elements must have accessible labels
- Support keyboard navigation
- Proper focus states
- ARIA attributes where appropriate
- Screen reader compatibility

### Cross-Platform Considerations
- Use Gluestack UI primitives for layout (HStack, VStack, Box)
- Avoid web-only or native-only APIs
- Test on both platforms before marking complete
- Handle platform-specific edge cases (e.g., password autofill)

### Storybook Integration
- All stories should work in both web and React Native Storybook
- Document all props and variants
- Show interactive examples
- Include accessibility notes

### Dependencies
- Phase 1 tasks have no dependencies (can be done in parallel)
- Phase 2 tasks depend on Phase 1 atoms
- Phase 3 (organism) depends on Phase 2 molecules
- Phase 4 depends on all previous phases

## Related Tickets

- Related to: FEATURE-001 (Gluestack UI setup)
- Enables: Future authentication features
- Blocks: None (standalone UI components)
