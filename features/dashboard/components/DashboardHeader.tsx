'use client'

import { SlidersHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useDashboard } from '../DashboardContext'
import { DashboardFiltersSheet } from './DashboardFiltersSheet'

export function DashboardHeader() {
  const { pendingRange, setPendingRange, apply, isDirty } = useDashboard()

  const handleApply = () => {
    apply()
    toast.success('Filters applied', {
      description: pendingRange?.from && pendingRange?.to
        ? `Showing ${pendingRange.from.toLocaleDateString()} → ${pendingRange.to.toLocaleDateString()}`
        : 'Showing all data',
    })
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-background p-5">
      <div>
        <h1 className="text-2xl font-bold leading-tight">Package Dashboard</h1>
        <p className="mt-2 text-base text-muted-foreground">Monitor your package deliveries</p>
      </div>

      <div className="flex items-center gap-2">
        <DateRangePicker value={pendingRange} onChange={setPendingRange} />
        <Button
          onClick={handleApply}
          disabled={!isDirty}
          className="h-9 w-[100px] bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-60"
        >
          Apply
        </Button>
        <DashboardFiltersSheet>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-border bg-card text-muted-foreground"
            aria-label="Filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </DashboardFiltersSheet>
      </div>
    </div>
  )
}
