'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePackages } from '../PackagesContext'
import { PackagesFiltersSheet } from './PackagesFiltersSheet'

export function PackagesHeader() {
  const { pendingSearch, setPendingSearch, applyHeader, isHeaderDirty } = usePackages()

  const handleApply = () => {
    applyHeader()
    toast.success(
      pendingSearch.trim() ? `Searching for "${pendingSearch.trim()}"` : 'Showing all packages'
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background p-5">
      <div>
        <h1 className="text-2xl font-bold leading-tight">Packages</h1>
        <p className="mt-2 text-base text-muted-foreground">All data about packages</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={pendingSearch}
            onChange={(e) => setPendingSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleApply()
            }}
            placeholder="Search by any field"
            className="h-9 w-[280px] border-border bg-card pl-9 text-base placeholder:text-muted-foreground/70"
          />
        </div>
        <PackagesFiltersSheet>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 border-border bg-card text-muted-foreground"
            aria-label="Filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </PackagesFiltersSheet>
        <Button
          onClick={handleApply}
          disabled={!isHeaderDirty}
          className="h-9 w-[100px] bg-primary px-4 text-base font-normal text-primary-foreground hover:bg-primary-600 disabled:opacity-60"
        >
          Apply
        </Button>
      </div>
    </div>
  )
}
