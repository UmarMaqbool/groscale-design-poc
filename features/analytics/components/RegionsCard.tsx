'use client'

import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { regions } from '@/mocks/analytics'

export function RegionsCard() {
  const max = Math.max(...regions.map((r) => r.packages))

  const handleCopy = async () => {
    const csv = [
      'region,packages,success_pct,change',
      ...regions.map((r) => `${r.name},${r.packages},${r.successPct},${r.change}`),
    ].join('\n')
    try {
      await navigator.clipboard.writeText(csv)
      toast.success('Regions data copied as CSV')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  const handleDownload = () => {
    const csv = [
      'region,packages,success_pct,change',
      ...regions.map((r) => `${r.name},${r.packages},${r.successPct},${r.change}`),
    ].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `top-regions-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded top-regions.csv')
  }

  return (
    <Card className="rounded-[10px] border-0 p-5 shadow-card">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-tight">Top Regions</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">By package volume</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <button
              onClick={handleCopy}
              className="rounded-md p-1.5 hover:bg-muted hover:text-foreground"
              aria-label="Copy data"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownload}
              className="rounded-md p-1.5 hover:bg-muted hover:text-foreground"
              aria-label="Download CSV"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {regions.map((r, i) => {
            const isTop = i < 3
            const isNegative = r.change.startsWith('-')
            return (
              <div
                key={r.name}
                className="grid grid-cols-[28px_1fr_auto] items-center gap-3"
              >
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold tabular-nums',
                    isTop
                      ? 'bg-primary/15 text-primary-700 dark:text-primary-200'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm text-foreground">{r.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {r.successPct}% success ·{' '}
                      <span
                        className={
                          isNegative
                            ? 'text-destructive'
                            : 'text-primary-700 dark:text-primary-200'
                        }
                      >
                        {r.change}
                      </span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded bg-muted">
                    <div
                      className="h-full rounded bg-primary"
                      style={{ width: `${(r.packages / max) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="whitespace-nowrap text-sm font-medium tabular-nums text-foreground">
                  {r.packages.toLocaleString()}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
