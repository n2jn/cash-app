import React from 'react'
import Svg, { Path } from 'react-native-svg'

export type IconName = 'eye' | 'eye-off' | 'google' | 'twitter' | 'github'

export interface IconProps {
  name: IconName
  size?: number
  color?: string
}

/**
 * Icon Component (Atom)
 *
 * SVG icon wrapper supporting common icons for the login form.
 * Icons: eye, eye-off, google, twitter, github
 *
 * @example
 * ```tsx
 * import { Icon } from '@cash-app/ui'
 *
 * // Password toggle icon
 * <Icon name="eye" size={20} color="#525252" />
 * <Icon name="eye-off" size={20} color="#525252" />
 *
 * // Social icons
 * <Icon name="google" size={24} />
 * <Icon name="twitter" size={24} />
 * <Icon name="github" size={24} />
 * ```
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000000',
}) => {
  const getIconPath = () => {
    switch (name) {
      case 'eye':
        return (
          <>
            <Path
              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M12 9a3 3 0 100 6 3 3 0 000-6z"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )
      case 'eye-off':
        return (
          <>
            <Path
              d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M1 1l22 22"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )
      case 'google':
        return (
          <Path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill={color}
          />
        )
      case 'twitter':
        return (
          <Path
            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      case 'github':
        return (
          <Path
            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      default:
        return null
    }
  }

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {getIconPath()}
    </Svg>
  )
}

// Set display name for debugging
Icon.displayName = 'Icon'
