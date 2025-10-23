
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './atoms/**/*.{ts,tsx}',
    './molecules/**/*.{ts,tsx}',
    './organisms/**/*.{ts,tsx}',
    './templates/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D632',
        'primary-light': '#4AE16D',
        'primary-dark': '#00A826',
        secondary: '#000000',
        'secondary-light': '#333333',
        accent: '#00D632',
        background: '#FFFFFF',
        surface: '#F8F8F8',
        error: '#F23645',
        warning: '#FFA500',
        success: '#00D632',
        info: '#007AFF',
        'text-primary': '#000000',
        'text-secondary': '#666666',
        'text-disabled': '#999999',
        border: '#E0E0E0',
        'border-focus': '#00D632',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      fontFamily: {
        heading: ['System'],
        body: ['System'],
        mono: ['Courier'],
      },
    },
  },
}
