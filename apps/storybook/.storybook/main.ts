import type { StorybookConfig } from '@storybook/react-vite'
import { join, dirname } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
 // return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-links',
    "@storybook/addon-docs",

  ],

  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },

  docs: {},

  viteFinal: async (config) => {
    // Ensure proper resolution for monorepo packages
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@cash-app/ui': join(__dirname, '../../../packages/ui'),
      }
    }
    return config
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}

export default config
