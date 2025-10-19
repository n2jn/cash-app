# Web Storybook

Storybook for viewing and testing `@cash-app/ui` components in a web browser.

## Usage

```bash
npm run storybook:web
```

Opens at `http://localhost:6006`

## Adding Stories

Stories are located in `packages/ui` alongside components:

```
packages/ui/atoms/Button/
├── Button.tsx
├── Button.stories.tsx  ← Story file
└── index.ts
```

Example story:

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    title: 'Click me',
    onPress: () => alert('Pressed!'),
  },
}
```

## Configuration

- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.ts` - Global decorators and parameters
