'use client'

import { ChevronDown, Calendar as CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface FilterSelectProps {
  label?: string
  placeholder: string
  value?: string
  options: string[]
  onChange?: (v: string) => void
  variant?: 'default' | 'date'
}

export function FilterSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
  variant = 'default',
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? <span className="text-sm text-foreground">{label}</span> : null}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="flex items-center gap-2">
              {variant === 'date' ? (
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              ) : null}
              <span className={cn('truncate', !value && 'text-muted-foreground')}>
                {value || placeholder}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-1" align="start">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange?.(opt)}
              className={cn(
                'flex w-full items-center rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-muted',
                value === opt && 'bg-accent font-medium text-primary-700'
              )}
            >
              {opt}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
