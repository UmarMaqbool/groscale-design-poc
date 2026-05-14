'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  className?: string
}

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <SingleField
        label="Start"
        date={value?.from}
        onSelect={(d) => onChange?.({ from: d, to: value?.to })}
        max={value?.to}
      />
      <SingleField
        label="End"
        date={value?.to}
        onSelect={(d) => onChange?.({ from: value?.from, to: d })}
        min={value?.from}
      />
    </div>
  )
}

function SingleField({
  label,
  date,
  onSelect,
  min,
  max,
}: {
  label: string
  date?: Date
  onSelect: (d: Date | undefined) => void
  min?: Date
  max?: Date
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-9 w-[150px] items-center justify-between rounded-md border border-border bg-card px-3 text-sm text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            date && 'text-foreground'
          )}
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{date ? format(date, 'MMM d, yyyy') : label}</span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          disabled={(d) => Boolean((min && d < min) || (max && d > max))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
