'use client'

import { Calendar, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  FILE_DROP_DATES,
  MAX_REPETITION_OPTIONS,
  MEALS_PER_PACKAGE_OPTIONS,
} from '@/mocks/algorithms'
import { useAlgorithm } from '../AlgorithmContext'
import { Radio } from './Radio'

interface FieldProps {
  label: string
  description: string
  children: React.ReactNode
}

function Field({ label, description, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      <p className="text-xs leading-snug text-muted-foreground">{description}</p>
    </div>
  )
}

interface SelectProps {
  value: string
  options: readonly string[]
  onChange: (v: string) => void
  iconLeft?: React.ReactNode
}

function Select({ value, options, onChange, iconLeft }: SelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex items-center gap-2">
            {iconLeft}
            <span>{value}</span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-1" align="start">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              'flex w-full items-center rounded-sm px-3 py-2 text-left text-sm hover:bg-accent',
              value === opt && 'bg-accent font-medium text-primary-700'
            )}
          >
            {opt}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export function AlgorithmForm() {
  const { form, patchForm, setHasRun, reset } = useAlgorithm()

  const handleRun = () => {
    setHasRun(true)
    toast.success('Algorithm run complete', {
      description: '0.962s · 275 orders processed',
    })
  }

  const handleCancel = () => {
    reset()
    toast('Algorithm cancelled')
  }

  return (
    <div className="rounded-[10px] border border-border bg-card p-5">
      <div>
        <h1 className="text-2xl font-bold leading-tight text-foreground">Algorithms</h1>
        <p className="mt-2 text-base text-muted-foreground">Configure parameters for the algorithm run</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
        <Field
          label="File drop date"
          description="The highest number of meal component repeats that can show up in each meal kit"
        >
          <Select
            value={form.fileDropDate}
            options={FILE_DROP_DATES}
            onChange={(v) => patchForm({ fileDropDate: v })}
            iconLeft={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
        </Field>
        <Field
          label="Maximum meal component repetitions"
          description="The highest number of meal component repeats that can show up in each meal kit"
        >
          <Select
            value={form.maxRepetitions}
            options={MAX_REPETITION_OPTIONS}
            onChange={(v) => patchForm({ maxRepetitions: v })}
          />
        </Field>
        <Field
          label="Meals per package"
          description="The total number of meals that should be determined for a single package"
        >
          <Select
            value={form.mealsPerPackage}
            options={MEALS_PER_PACKAGE_OPTIONS}
            onChange={(v) => patchForm({ mealsPerPackage: v })}
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <span className="text-sm font-bold text-foreground">Inventory distribution strategy</span>
        <div className="flex items-center gap-6">
          <Radio
            name="inventory-strategy"
            label="Event distribution"
            checked={form.inventoryStrategy === 'event-distribution'}
            onChange={() => patchForm({ inventoryStrategy: 'event-distribution' })}
          />
          <Radio
            name="inventory-strategy"
            label="Favor based on weights"
            checked={form.inventoryStrategy === 'favor-weights'}
            onChange={() => patchForm({ inventoryStrategy: 'favor-weights' })}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleRun}
          className="h-10 rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          Run Algorithm
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="h-10 rounded-md border border-input bg-card px-5 text-sm text-foreground transition-colors hover:bg-accent"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
