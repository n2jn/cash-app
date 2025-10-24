import React from 'react'
import { Link as GluestackLink, LinkText } from '@gluestack-ui/themed'
import type { ComponentProps } from 'react'

// Re-export Gluestack Link sub-components
export { LinkText }

// Type definitions
export type LinkProps = ComponentProps<typeof GluestackLink>

/**
 * Link Component (Atom)
 *
 * Re-exports Gluestack UI's Link component with Cash App branding.
 *
 * @example
 * ```tsx
 * import { Link, LinkText } from '@cash-app/ui'
 *
 * <Link onPress={() => navigate('/signup')}>
 *   <LinkText>Sign up</LinkText>
 * </Link>
 * ```
 */
export const Link: React.FC<LinkProps> = (props) => {
  return <GluestackLink {...props} />
}

// Set display name for debugging
Link.displayName = 'Link'
