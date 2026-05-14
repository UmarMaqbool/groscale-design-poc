'use client'

import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { useReporting } from '../../ReportingContext'

interface FilterShellProps {
  children: ReactNode
  footer: ReactNode
}

/**
 * Right-aligned sheet matching Figma's filter pane.
 * Hides the default Sheet close button; renders a custom one inside the title row.
 */
export function FilterShell({ children, footer }: FilterShellProps) {
  const { filtersOpen, setFiltersOpen } = useReporting()

  return (
    <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
      <SheetContent
        side="right"
        className="flex w-[300px] flex-col gap-0 p-0 sm:max-w-[300px] [&>button.absolute]:hidden"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <SheetTitle className="text-xl font-bold text-foreground">Filter by</SheetTitle>
          <SheetClose
            aria-label="Close filters"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </SheetClose>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        <div className="flex flex-col gap-2 border-t border-border px-5 py-4">{footer}</div>
      </SheetContent>
    </Sheet>
  )
}
