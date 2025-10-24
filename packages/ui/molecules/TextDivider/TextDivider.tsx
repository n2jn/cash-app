import React from 'react'
import { HStack, Text } from '@gluestack-ui/themed'
import { Divider } from '../../atoms/Divider'

export interface TextDividerProps {
  text: string
}

/**
 * TextDivider Component (Molecule)
 *
 * Horizontal divider with centered text.
 * Perfect for "OR CONTINUE WITH" separator in login forms.
 *
 * @example
 * ```tsx
 * import { TextDivider } from '@cash-app/ui'
 *
 * <TextDivider text="OR CONTINUE WITH" />
 * <TextDivider text="OR" />
 * ```
 */
export const TextDivider: React.FC<TextDividerProps> = ({ text }) => {
  return (
    <HStack alignItems="center">
      <Divider flex={1} />
      <Text>{text}</Text>
      <Divider flex={1} />
    </HStack>
  )
}

// Set display name for debugging
TextDivider.displayName = 'TextDivider'
