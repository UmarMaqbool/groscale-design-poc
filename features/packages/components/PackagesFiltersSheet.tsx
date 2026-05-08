'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { usePackages } from '../PackagesContext'

export function PackagesFiltersSheet({ children }: { children: React.ReactNode }) {
  const { pendingAdvanced, setPendingAdvanced, applyAdvanced, clearAdvanced } = usePackages()
  const [open, setOpen] = useState(false)
  const [shipperInput, setShipperInput] = useState('')
  const [carrierInput, setCarrierInput] = useState('')
  const [locationInput, setLocationInput] = useState('')

  const addId = (
    field: 'shipperIds' | 'carrierIds' | 'locationIds',
    value: string,
    reset: () => void
  ) => {
    const trimmed = value.trim()
    if (!trimmed) return
    setPendingAdvanced((prev) =>
      prev[field].includes(trimmed) ? prev : { ...prev, [field]: [...prev[field], trimmed] }
    )
    reset()
  }

  const removeId = (field: 'shipperIds' | 'carrierIds' | 'locationIds', value: string) => {
    setPendingAdvanced((prev) => ({
      ...prev,
      [field]: prev[field].filter((v) => v !== value),
    }))
  }

  const handleApply = () => {
    applyAdvanced()
    toast.success('Filters applied')
    setOpen(false)
  }

  const handleClear = () => {
    clearAdvanced()
    setShipperInput('')
    setCarrierInput('')
    setLocationInput('')
    toast('Filters cleared')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-[400px] flex-col gap-0 sm:max-w-[400px]">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl font-semibold">Filter by</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto py-2">
          <Section label="Delivery Date Range">
            <DateRangePicker
              value={{ from: pendingAdvanced.deliveryFrom, to: pendingAdvanced.deliveryTo }}
              onChange={(r) =>
                setPendingAdvanced((prev) => ({
                  ...prev,
                  deliveryFrom: r?.from,
                  deliveryTo: r?.to,
                }))
              }
              className="w-full"
            />
          </Section>

          <Section label="Ship Date Range">
            <DateRangePicker
              value={{ from: pendingAdvanced.shipFrom, to: pendingAdvanced.shipTo }}
              onChange={(r) =>
                setPendingAdvanced((prev) => ({
                  ...prev,
                  shipFrom: r?.from,
                  shipTo: r?.to,
                }))
              }
              className="w-full"
            />
          </Section>

          <IdField
            label="Shipper IDs"
            placeholder="Enter Shipper ID"
            input={shipperInput}
            setInput={setShipperInput}
            values={pendingAdvanced.shipperIds}
            onAdd={() => addId('shipperIds', shipperInput, () => setShipperInput(''))}
            onRemove={(v) => removeId('shipperIds', v)}
          />

          <IdField
            label="Carrier IDs"
            placeholder="Enter Carrier ID"
            input={carrierInput}
            setInput={setCarrierInput}
            values={pendingAdvanced.carrierIds}
            onAdd={() => addId('carrierIds', carrierInput, () => setCarrierInput(''))}
            onRemove={(v) => removeId('carrierIds', v)}
          />

          <IdField
            label="Distribution Location IDs"
            placeholder="Enter Distribution Location IDs"
            input={locationInput}
            setInput={setLocationInput}
            values={pendingAdvanced.locationIds}
            onAdd={() => addId('locationIds', locationInput, () => setLocationInput(''))}
            onRemove={(v) => removeId('locationIds', v)}
          />
        </div>

        <div className="space-y-2 border-t pt-4">
          <Button
            onClick={handleApply}
            className="h-11 w-full bg-primary text-base font-normal text-primary-foreground hover:bg-primary-600"
          >
            Apply
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            className="h-11 w-full border-border bg-card text-base font-normal"
          >
            Clear All
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-base font-medium text-foreground">{label}</div>
      {children}
    </div>
  )
}

function IdField({
  label,
  placeholder,
  input,
  setInput,
  values,
  onAdd,
  onRemove,
}: {
  label: string
  placeholder: string
  input: string
  setInput: (v: string) => void
  values: string[]
  onAdd: () => void
  onRemove: (v: string) => void
}) {
  return (
    <div className="space-y-2">
      <div className="text-base font-medium text-foreground">{label}</div>
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onAdd()
            }
          }}
          placeholder={placeholder}
          className="h-9 flex-1 border-border bg-card text-sm"
        />
        <Button
          type="button"
          variant="outline"
          onClick={onAdd}
          className="h-9 border-primary px-4 text-sm font-normal text-primary hover:bg-primary-100"
        >
          Add
        </Button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary-100 px-2.5 py-0.5 text-xs text-primary-700"
            >
              {v}
              <button
                type="button"
                onClick={() => onRemove(v)}
                className="rounded-full hover:bg-primary/10"
                aria-label={`Remove ${v}`}
              >
                <Plus className="h-3 w-3 rotate-45" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
