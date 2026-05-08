'use client'

import { cn } from '@/lib/utils'

interface RadioProps {
  checked: boolean
  onChange: () => void
  label: string
  name: string
}

export function Radio({ checked, onChange, label, name }: RadioProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground">
      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          checked ? 'border-primary' : 'border-input'
        )}
        aria-hidden
      >
        {checked ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
      </span>
      <input
        type="radio"
        className="sr-only"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  )
}
