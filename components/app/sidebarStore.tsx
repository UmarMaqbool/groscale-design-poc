'use client'

import * as React from 'react'

type SidebarContextValue = {
  collapsed: boolean
  toggle: () => void
  setCollapsed: (v: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false)
  const toggle = React.useCallback(() => setCollapsed((c) => !c), [])
  const value = React.useMemo(() => ({ collapsed, toggle, setCollapsed }), [collapsed, toggle])
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used inside SidebarProvider')
  return ctx
}
