'use client'

import { SlidersHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useReporting } from '../ReportingContext'

export function ReportingHeader() {
  const { activeTab, dateRange, setDateRange, filtersOpen, setFiltersOpen } = useReporting()

  const isApplyTab = activeTab === 'package-details'
  const buttonLabel = isApplyTab ? 'Apply' : 'Generate'

  const handlePrimary = () => {
    if (isApplyTab) {
      toast.success('Filters applied', {
        description:
          dateRange?.from && dateRange?.to
            ? `Showing ${dateRange.from.toLocaleDateString()} → ${dateRange.to.toLocaleDateString()}`
            : 'Showing all data',
      })
    } else {
      toast.success('Report generated', {
        description: 'Sample data — connect a real data source to populate.',
      })
    }
  }

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 p-5">
      <div>
        <h1 className="text-2xl font-bold leading-tight text-foreground">Reporting Details</h1>
        <p className="mt-2 text-base text-muted-foreground">Manage &amp; monitor your reports</p>
      </div>

      <div className="flex items-center gap-2">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
        <button
          type="button"
          aria-label="Open filters"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-card text-muted-foreground transition-colors hover:bg-accent"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handlePrimary}
          className="h-10 rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}
