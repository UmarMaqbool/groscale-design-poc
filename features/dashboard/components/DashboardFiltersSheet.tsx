'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useDashboard } from '../DashboardContext'

const STATUS_OPTIONS = [
  { value: 'delivered', label: 'Delivered' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'failed', label: 'Failed Delivery' },
  { value: 'missing', label: 'Missing' },
]

const CARRIER_OPTIONS = ['All Carriers', 'UPS', 'FedEx', 'USPS', 'DHL']
const REGION_OPTIONS = ['All Regions', 'West', 'Midwest', 'South', 'Northeast']

export function DashboardFiltersSheet({ children }: { children: React.ReactNode }) {
  const { pendingFilters, setPendingFilters, apply, reset } = useDashboard()
  const [open, setOpen] = useState(false)

  const toggleStatus = (value: string) => {
    setPendingFilters((prev) => ({
      ...prev,
      status: prev.status.includes(value)
        ? prev.status.filter((s) => s !== value)
        : [...prev.status, value],
    }))
  }

  const handleApply = () => {
    apply()
    toast.success('Filters applied')
    setOpen(false)
  }

  const handleReset = () => {
    reset()
    toast('Filters reset')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow down dashboard data by status, carrier, or region.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 py-6">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Status</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => {
                const active = pendingFilters.status.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleStatus(opt.value)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground hover:border-foreground/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Carrier</Label>
            <select
              value={pendingFilters.carrier ?? 'All Carriers'}
              onChange={(e) =>
                setPendingFilters((prev) => ({
                  ...prev,
                  carrier: e.target.value === 'All Carriers' ? null : e.target.value,
                }))
              }
              className="mt-2 h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CARRIER_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Region</Label>
            <select
              value={pendingFilters.region ?? 'All Regions'}
              onChange={(e) =>
                setPendingFilters((prev) => ({
                  ...prev,
                  region: e.target.value === 'All Regions' ? null : e.target.value,
                }))
              }
              className="mt-2 h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {REGION_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t pt-4">
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
          <div className="flex gap-2">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleApply}>Apply filters</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
