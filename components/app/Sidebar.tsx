'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  Package,
  BarChart3,
  FileText,
  Sparkles,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { useSidebar } from './sidebarStore'

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/packages', label: 'Packages', icon: Package },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/reporting', label: 'Reporting', icon: FileText },
  { href: '/algorithms', label: 'Algorithms', icon: Sparkles },
  { href: '/communication', label: 'Communication', icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()
  const { collapsed } = useSidebar()

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      <div
        className={cn(
          'flex h-[88px] items-center border-b border-sidebar-border',
          collapsed ? 'justify-center px-3' : 'px-6'
        )}
      >
        <Logo collapsed={collapsed} />
      </div>

      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors',
                isActive
                  ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
