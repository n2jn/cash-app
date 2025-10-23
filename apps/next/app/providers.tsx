'use client'

import { UIProvider } from '@cash-app/ui'
import { AppProvider } from '@cash-app/app'

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <AppProvider>{children}</AppProvider>
    </UIProvider>
  )
}
