'use client'

import { Calendar, ChevronDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface RangeSelectProps {
  value: string
  options: readonly string[]
  onChange: (v: string) => void
  placeholder?: string
  className?: string
  showCalendarIcon?: boolean
}

/**
 * Pill-style date range select used across Communication header and inner cards.
 */
export function RangeSelect({
  value,
  options,
  onChange,
  placeholder,
  className,
  showCalendarIcon = true,
}: RangeSelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-10 items-center justify-between gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:border-[#101828]',
            className
          )}
        >
          <div className="flex items-center gap-2">
            {showCalendarIcon ? <Calendar className="h-4 w-4 text-muted-foreground" /> : null}
            <span className={cn(!value && 'text-muted-foreground')}>{value || placeholder}</span>
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
              'flex w-full items-center rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent',
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
