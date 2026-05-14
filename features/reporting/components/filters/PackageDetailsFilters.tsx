'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'
import {
  CARRIER_OPTIONS,
  CUSTOMER_TYPE_OPTIONS,
  DELIVERY_PARTNER_OPTIONS,
  DISTRIBUTION_LOCATION_OPTIONS,
  ROUTE_NAME_OPTIONS,
  SHIPPER_OPTIONS,
} from '@/mocks/reporting'
import { useReporting } from '../../ReportingContext'
import type { DeliveryStatusKey, PackageDetailsFilterState } from '../../types'
import { cn } from '@/lib/utils'
import { FilterShell } from './FilterShell'
import { FilterSelect } from './FilterSelect'

const DELIVERY_STATUS_OPTIONS: { key: DeliveryStatusKey; label: string }[] = [
  { key: 'select-all', label: 'Select All' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'pending', label: 'Pending' },
  { key: 'in-transit', label: 'In Transit' },
  { key: 'failed-process', label: 'Failed Process' },
  { key: 'failed-delivery', label: 'Failed Delivery' },
]

const ALL_STATUS_KEYS: DeliveryStatusKey[] = DELIVERY_STATUS_OPTIONS
  .filter((o) => o.key !== 'select-all')
  .map((o) => o.key)

const initial: PackageDetailsFilterState = {
  deliveryStatus: new Set(['select-all']),
  deliveryPartner: '',
  customerType: '',
  routeName: '',
  distributionLocation: '',
  shipper: '',
}

export function PackageDetailsFilters() {
  const { setFiltersOpen } = useReporting()
  const [filters, setFilters] = useState<PackageDetailsFilterState>(initial)
  const [statusOpen, setStatusOpen] = useState(true)

  const toggleStatus = (key: DeliveryStatusKey) => {
    const next = new Set(filters.deliveryStatus)
    if (key === 'select-all') {
      if (next.has('select-all')) {
        next.clear()
      } else {
        next.clear()
        next.add('select-all')
        ALL_STATUS_KEYS.forEach((k) => next.add(k))
      }
    } else {
      next.delete('select-all')
      if (next.has(key)) next.delete(key)
      else next.add(key)
    }
    setFilters({ ...filters, deliveryStatus: next })
  }

  const handleApply = () => {
    toast.success('Filters applied')
    setFiltersOpen(false)
  }
  const handleClear = () => {
    setFilters(initial)
    toast('Filters cleared')
  }

  return (
    <FilterShell
      footer={
        <>
          <button
            type="button"
            onClick={handleApply}
            className="h-10 w-full rounded-md bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="h-10 w-full rounded-md border border-input bg-card text-sm text-foreground transition-colors hover:bg-accent"
          >
            Clear All
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {/* Delivery status — expandable with checkbox grid */}
        <div className="rounded-md border border-input">
          <button
            type="button"
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex w-full items-center justify-between px-3 py-2.5 text-sm text-foreground"
          >
            Delivery status
            {statusOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {statusOpen ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border px-3 py-3">
              {DELIVERY_STATUS_OPTIONS.map((opt) => (
                <label
                  key={opt.key}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 text-sm',
                    filters.deliveryStatus.has(opt.key) ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  <Checkbox
                    checked={filters.deliveryStatus.has(opt.key)}
                    onCheckedChange={() => toggleStatus(opt.key)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          ) : null}
        </div>

        <FilterSelect
          placeholder="Delivery partner"
          value={filters.deliveryPartner}
          options={DELIVERY_PARTNER_OPTIONS}
          onChange={(v) => setFilters({ ...filters, deliveryPartner: v })}
        />
        <FilterSelect
          placeholder="Customer type"
          value={filters.customerType}
          options={CUSTOMER_TYPE_OPTIONS}
          onChange={(v) => setFilters({ ...filters, customerType: v })}
        />
        <FilterSelect
          placeholder="Route name"
          value={filters.routeName}
          options={ROUTE_NAME_OPTIONS}
          onChange={(v) => setFilters({ ...filters, routeName: v })}
        />
        <FilterSelect
          placeholder="Distribution location"
          value={filters.distributionLocation}
          options={DISTRIBUTION_LOCATION_OPTIONS}
          onChange={(v) => setFilters({ ...filters, distributionLocation: v })}
        />
        <FilterSelect
          placeholder="Shipper"
          value={filters.shipper}
          options={SHIPPER_OPTIONS}
          onChange={(v) => setFilters({ ...filters, shipper: v })}
        />
      </div>
    </FilterShell>
  )
}
