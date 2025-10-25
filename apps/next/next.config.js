import { withGluestackUI } from '@gluestack/ui-next-adapter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    // Workspace packages
    '@cash-app/ui',
    '@cash-app/app',

    // Gluestack packages
    '@gluestack-ui/themed',
    '@gluestack-style/react',

    // Gluestack component packages
    '@gluestack-ui/button',
    '@gluestack-ui/input',
    '@gluestack-ui/form-control',
    '@gluestack-ui/provider',
    '@gluestack-ui/spinner',
    '@gluestack-ui/utils',

    // React Native packages
    '@expo/html-elements',
    'react-native-web',
  ],
}

export default withGluestackUI(nextConfig)
