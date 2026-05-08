'use client'

import { Package, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AccountRole = 'shipper' | 'carrier'

interface RoleSelectorProps {
  value: AccountRole
  onChange: (role: AccountRole) => void
}

const OPTIONS: Array<{
  value: AccountRole
  label: string
  description: string
  icon: typeof Package
}> = [
  {
    value: 'shipper',
    label: 'Shipper',
    description: 'Find carriers and manage shipments',
    icon: Package,
  },
  {
    value: 'carrier',
    label: 'Carrier',
    description: 'Win contracts and run routes',
    icon: Truck,
  },
]

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">I&apos;m signing up as a…</span>
      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon
          const selected = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={selected}
              className={cn(
                'group flex flex-col gap-2 rounded-lg border p-3.5 text-left transition-all',
                selected
                  ? 'border-primary bg-primary/10 ring-1 ring-primary'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-muted/40'
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
                  selected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary-700 dark:group-hover:text-primary-200'
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  {opt.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
