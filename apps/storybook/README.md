# Cash App Storybook (Web)

Web-only Storybook application for browsing, testing, and documenting the shared UI component library from `@cash-app/ui`.

## Overview

This Storybook instance provides:

- **Component Browser**: Interactive showcase of all UI components
- **Documentation**: Auto-generated docs with prop tables and usage examples
- **Testing**: Visual testing and interaction testing capabilities
- **Development**: Isolated component development environment

## Components

### Atoms (Basic Components)
- **Button**: Action buttons with multiple variants (solid, outline, link) and states
- **Input**: Text input fields with various types and configurations

### Molecules (Composite Components)
- **FormField**: Complete form field with label, input, helper text, and error handling
- **Card**: Container component with elevated and outlined variants

## Getting Started

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

From the root of the monorepo:

```bash
npm install
```

### Development

Run Storybook in development mode:

```bash
# From monorepo root
npm run storybook

# Or from this directory
npm run storybook
```

This will start Storybook at [http://localhost:6006](http://localhost:6006).

### Build

Build a static version of Storybook:

```bash
# From monorepo root
npm run build-storybook

# Or from this directory
npm run build-storybook
```

The built files will be in the `storybook-static` directory and can be served statically.

## Project Structure

```
apps/storybook/
├── .storybook/           # Storybook configuration
│   ├── main.ts          # Main configuration (addons, framework)
│   └── preview.tsx      # Global decorators and parameters
├── src/
│   └── stories/         # Component stories
│       ├── Introduction.mdx      # Documentation homepage
│       ├── Button.stories.tsx    # Button component stories
│       ├── Input.stories.tsx     # Input component stories
│       ├── FormField.stories.tsx # FormField component stories
│       └── Card.stories.tsx      # Card component stories
├── package.json
├── tsconfig.json
└── README.md
```

## Writing Stories

Stories are written using Component Story Format (CSF) 3.0:

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonText } from '@cash-app/ui'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: (args) => (
    <Button {...args}>
      <ButtonText>Click Me</ButtonText>
    </Button>
  ),
  args: {
    action: 'primary',
    size: 'md',
  },
}
```

## Addons

This Storybook includes the following addons:

- **@storybook/addon-essentials**: Core addons (docs, controls, actions, viewport, backgrounds, toolbars, measure, outline)
- **@storybook/addon-interactions**: Interaction testing
- **@storybook/addon-links**: Link stories together

## Configuration

### Gluestack UI Integration

All stories are wrapped with `UIProvider` from `@cash-app/ui` to provide theming and styling:

```typescript
// .storybook/preview.tsx
import { UIProvider } from '@cash-app/ui'

const withUIProvider = (Story: any) => (
  <UIProvider>
    <Story />
  </UIProvider>
)

export const decorators = [withUIProvider]
```

### Module Resolution

Storybook is configured to resolve the `@cash-app/ui` package from the monorepo workspace using Vite:

```typescript
// .storybook/main.ts
viteFinal: async (config) => {
  config.resolve.alias = {
    '@cash-app/ui': join(__dirname, '../../../packages/ui'),
  }
  return config
}
```

## Testing

### Visual Testing

Browse components in different states and viewports using the Storybook UI.

### Interaction Testing

Interaction tests can be added to stories using the `play` function:

```typescript
export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText('email@example.com')
    await userEvent.type(emailInput, 'test@example.com')
  },
}
```

## Deployment

The built Storybook can be deployed to any static hosting service:

1. Build the static site: `npm run build-storybook`
2. Deploy the `storybook-static` directory

Recommended hosting options:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Troubleshooting

### Components not rendering

Make sure the `UIProvider` is set up correctly in `.storybook/preview.tsx`.

### Module resolution errors

Check that the `@cash-app/ui` alias is correctly configured in `.storybook/main.ts`.

### Styling issues

Verify that Gluestack UI is properly configured in the `packages/ui` package.

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)
- [Gluestack UI](https://gluestack.io/ui/docs)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)

## License

Private - Cash App Internal Use Only
