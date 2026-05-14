'use client'

import { ChevronDown, Printer } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PACKAGE_COLUMNS } from '@/mocks/packages'
import type { PackageStatus } from '../types'
import { usePackages } from '../PackagesContext'

const STATUS_TABS: { value: PackageStatus; label: string }[] = [
  { value: 'in_transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'pending', label: 'Pending' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'out_for_delivery', label: 'Out for delivery' },
]

export function PackagesToolbar() {
  const { statusFilter, setStatusFilter, visibleColumns, toggleColumn } = usePackages()

  const handleTabClick = (status: PackageStatus) => {
    const next = statusFilter === status ? null : status
    setStatusFilter(next)
    toast(next ? `Filtered by ${STATUS_TABS.find((t) => t.value === next)?.label}` : 'Cleared status filter')
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-background px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="mr-1 text-base font-bold text-foreground">Package Status</span>
        {STATUS_TABS.map((tab) => {
          const active = statusFilter === tab.value
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleTabClick(tab.value)}
              className={`h-9 rounded-md border px-4 text-sm transition-colors ${
                active
                  ? 'border-primary bg-primary font-medium text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:bg-accent'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 gap-2 border-border bg-card px-3 text-sm font-normal text-foreground"
            >
              Manage Columns
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2">
            <div className="px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Columns
            </div>
            <div className="space-y-1">
              {PACKAGE_COLUMNS.map((col) => {
                const isVisible = visibleColumns.has(col.key)
                return (
                  <button
                    key={col.key}
                    type="button"
                    onClick={() => toggleColumn(col.key)}
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                  >
                    <Checkbox checked={isVisible} onCheckedChange={() => toggleColumn(col.key)} />
                    <span className="text-foreground">{col.label}</span>
                  </button>
                )
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() => {
            window.print()
            toast.success('Print dialog opened')
          }}
          className="h-9 gap-2 border-border bg-card px-3 text-sm font-normal text-foreground"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  )
}
