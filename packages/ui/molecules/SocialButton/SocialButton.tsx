import React from 'react'
import { Button } from '../../atoms/Button'
import { Icon, IconName } from '../../atoms/Icon'

export type SocialProvider = 'google' | 'twitter' | 'github'

export interface SocialButtonProps {
  provider: SocialProvider
  onPress: () => void
  disabled?: boolean
}

/**
 * SocialButton Component (Molecule)
 *
 * Outline button with social provider icon.
 * Supports Google, Twitter, and GitHub.
 *
 * @example
 * ```tsx
 * import { SocialButton } from '@cash-app/ui'
 *
 * <SocialButton
 *   provider="google"
 *   onPress={() => handleSocialLogin('google')}
 * />
 * ```
 */
export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onPress,
  disabled = false,
}) => {
  const iconColor = {
    google: '#DB4437',
    twitter: '#1DA1F2',
    github: '#333333',
  }

  return (
    <Button
      onPress={onPress}
      isDisabled={disabled}
    >
      <Icon
        name={provider as IconName}
        size={24}
        color={iconColor[provider]}
      />
    </Button>
  )
}

// Set display name for debugging
SocialButton.displayName = 'SocialButton'
