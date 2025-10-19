import type { Preview } from '@storybook/react-vite'
import { UIProvider } from '@cash-app/ui'

// Global decorator to wrap all stories with UIProvider
const withUIProvider = (Story: any) => (
  <UIProvider>
    <Story />
  </UIProvider>
)

const preview: Preview = {
  decorators: [withUIProvider],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#ffffff',
        },

        dark: {
          name: 'dark',
          value: '#1a1a1a',
        }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
}

export default preview
