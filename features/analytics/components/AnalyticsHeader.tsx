'use client'

import { Download, Globe, SlidersHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAnalytics } from '../AnalyticsContext'

export function AnalyticsHeader() {
  const { range, setRange, region, setRegion, regions } = useAnalytics()

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background p-5">
      <div>
        <h1 className="text-2xl font-bold leading-tight">Package Analytics</h1>
        <p className="mt-1.5 text-base text-muted-foreground">
          Performance, throughput and exception trends across your network.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 gap-2 border-border bg-card text-sm font-normal text-foreground hover:bg-muted"
            >
              <Globe className="h-4 w-4 text-muted-foreground" />
              {region}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Region</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={region} onValueChange={(v) => setRegion(v as typeof region)}>
              {regions.map((r) => (
                <DropdownMenuRadioItem key={r} value={r}>
                  {r}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DateRangePicker value={range} onChange={setRange} />

        <Button
          variant="outline"
          size="icon"
          onClick={() => toast('Filters coming soon')}
          className="h-9 w-9 border-border bg-card text-muted-foreground"
          aria-label="Filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => toast.success('Analytics report exported')}
          className="h-9 gap-2 px-4"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
