'use client'

import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { SidebarProvider } from './sidebarStore'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
