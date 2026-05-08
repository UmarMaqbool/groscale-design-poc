'use client'

import { Search, Download } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useReporting } from '../ReportingContext'
import type { ReportTab } from '../types'

const TABS: Array<{ key: ReportTab; label: string }> = [
  { key: 'package-details', label: 'Package Details' },
  { key: 'performance', label: 'Performance' },
  { key: 'volume', label: 'Volume' },
  { key: 'status', label: 'Status' },
  { key: 'rate-calls', label: 'Rate Calls' },
]

export function ReportingTabs() {
  const { activeTab, setActiveTab, search, setSearch } = useReporting()

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-base font-bold text-foreground">Reporting Status</span>
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'rounded-md border px-4 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:bg-muted'
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <RightActions activeTab={activeTab} search={search} setSearch={setSearch} />
    </div>
  )
}

function RightActions({
  activeTab,
  search,
  setSearch,
}: {
  activeTab: ReportTab
  search: string
  setSearch: (v: string) => void
}) {
  if (activeTab === 'package-details') {
    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="h-9 w-[220px] rounded-md border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => toast.success('Exporting Package Details report')}
          aria-label="Export"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-muted"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    )
  }

  if (activeTab === 'rate-calls') {
    return (
      <button
        type="button"
        onClick={() => toast.success('Exporting CSV')}
        className="flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        <Download className="h-4 w-4" />
        Export To CSV
      </button>
    )
  }

  // Performance / Volume / Status
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => toast.success('Exporting CSV')}
        className="flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        <Download className="h-4 w-4" />
        Export To CSV
      </button>
      <button
        type="button"
        onClick={() => toast.success('Exporting line items')}
        className="flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        <Download className="h-4 w-4" />
        Export Line items
      </button>
    </div>
  )
}
