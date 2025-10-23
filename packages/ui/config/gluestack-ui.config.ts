
// Export a simple config object that can be passed to GluestackUIProvider
export const config = {
  fontSizes: [
    12, 14, 16, 20, 24, 32
  ],
  space: {
    small: 4,
    medium: 8,
    large: 16,
  },
  // Cash App brand colors (to be used in components)
  colors: {
    primary: '#00D632', // Cash App green
    primaryLight: '#4AE16D',
    primaryDark: '#00A826',
    error: '#F23645',
    warning: '#FFA500',
    success: '#00D632',
    info: '#007AFF',
  },
}

export type Config = typeof config
