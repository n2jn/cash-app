import React from 'react'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '../config/gluestack-ui.config'


interface UIProviderProps {
  children: React.ReactNode
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  console.log("here", config)
  return (
    <GluestackUIProvider config={config}>
      {children as any}
    </GluestackUIProvider>
  )
}

export default UIProvider
