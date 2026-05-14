'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { DELIVERY_PARTNER_OPTIONS, SHIPPER_OPTIONS } from '@/mocks/reporting'
import { useReporting } from '../../ReportingContext'
import type { PerformanceFilterState } from '../../types'
import { FilterShell } from './FilterShell'
import { FilterSelect } from './FilterSelect'

const initial: PerformanceFilterState = { shippers: '', deliveryPartner: '', deliveryDate: '' }

export function PerformanceFilters() {
  const { setFiltersOpen } = useReporting()
  const [filters, setFilters] = useState<PerformanceFilterState>(initial)

  const handleGenerate = () => {
    toast.success('Report generated')
    setFiltersOpen(false)
  }
  const handleCancel = () => setFiltersOpen(false)

  return (
    <FilterShell
      footer={
        <>
          <button
            type="button"
            onClick={handleGenerate}
            className="h-10 w-full rounded-md bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Generate
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="h-10 w-full rounded-md border border-input bg-card text-sm text-foreground transition-colors hover:bg-accent"
          >
            Cancel
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <FilterSelect
          label="Select shippers"
          placeholder="Shippers"
          value={filters.shippers}
          options={SHIPPER_OPTIONS}
          onChange={(v) => setFilters({ ...filters, shippers: v })}
        />
        <FilterSelect
          label="Select Delivery Partner"
          placeholder="Delivery partner"
          value={filters.deliveryPartner}
          options={DELIVERY_PARTNER_OPTIONS}
          onChange={(v) => setFilters({ ...filters, deliveryPartner: v })}
        />
        <FilterSelect
          label="Delivery Date"
          placeholder="dd/mm/yyyy"
          value={filters.deliveryDate}
          options={['Today', 'Yesterday', 'Last 7 days', 'Last 30 days']}
          onChange={(v) => setFilters({ ...filters, deliveryDate: v })}
          variant="date"
        />
      </div>
    </FilterShell>
  )
}
