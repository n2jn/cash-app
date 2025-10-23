/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
  webpack: (config, { isServer }) => {
    // Add aliases for react-native modules
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    }

    // Exclude problematic react-native modules from being parsed
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      net: false,
      tls: false,
    }

    return config
  },
}

module.exports = nextConfig
