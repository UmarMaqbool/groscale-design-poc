'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { CARRIER_OPTIONS, SHIPPER_OPTIONS } from '@/mocks/reporting'
import { useReporting } from '../../ReportingContext'
import type { RateCallsFilterState } from '../../types'
import { FilterShell } from './FilterShell'
import { FilterSelect } from './FilterSelect'

const initial: RateCallsFilterState = { shippers: '', carriers: 'DHL, Gori/UniUni' }

export function RateCallsFilters() {
  const { setFiltersOpen } = useReporting()
  const [filters, setFilters] = useState<RateCallsFilterState>(initial)

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
          label="Select Carriers (optional)"
          placeholder="Carriers"
          value={filters.carriers}
          options={CARRIER_OPTIONS}
          onChange={(v) => setFilters({ ...filters, carriers: v })}
        />
      </div>
    </FilterShell>
  )
}
