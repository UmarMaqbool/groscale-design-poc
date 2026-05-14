'use client'

import { useMemo, useState } from 'react'
import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { useThemeTokens } from '@/lib/use-theme-tokens'
import { heatmap } from '@/mocks/analytics'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface HoverState {
  day: number
  hour: number
  value: number
  x: number
  y: number
}

export function HeatmapCard() {
  const tokens = useThemeTokens(['primary'])
  const [hover, setHover] = useState<HoverState | null>(null)

  const max = useMemo(() => Math.max(...heatmap.flat()), [])

  const handleCopy = async () => {
    const header = 'day,' + Array.from({ length: 24 }, (_, h) => `h${h}`).join(',')
    const rows = heatmap.map((row, i) => [DAYS[i], ...row].join(','))
    try {
      await navigator.clipboard.writeText([header, ...rows].join('\n'))
      toast.success('Heatmap data copied as CSV')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  const handleDownload = () => {
    const header = 'day,' + Array.from({ length: 24 }, (_, h) => `h${h}`).join(',')
    const rows = heatmap.map((row, i) => [DAYS[i], ...row].join(','))
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `activity-heatmap-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded activity-heatmap.csv')
  }

  const fillFor = (v: number) => {
    if (v === 0 || !tokens.primary) return 'hsl(var(--muted))'
    const a = 0.18 + (v / max) * 0.82
    return `color-mix(in srgb, ${tokens.primary} ${(a * 100).toFixed(0)}%, transparent)`
  }

  return (
    <Card className="rounded-[10px] border-0 p-5 shadow-card">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold leading-tight">Activity Heatmap</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Pickups &amp; dropoffs by hour of day
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Less
              {[0.18, 0.36, 0.54, 0.72, 0.9].map((a, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-[3px]"
                  style={{
                    background: tokens.primary
                      ? `color-mix(in srgb, ${tokens.primary} ${(a * 100).toFixed(0)}%, transparent)`
                      : 'transparent',
                  }}
                />
              ))}
              More
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <button
                onClick={handleCopy}
                className="rounded-md p-1.5 hover:bg-accent hover:text-foreground"
                aria-label="Copy data"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={handleDownload}
                className="rounded-md p-1.5 hover:bg-accent hover:text-foreground"
                aria-label="Download CSV"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: '32px repeat(24, minmax(0, 1fr))' }}
          >
            {heatmap.map((row, di) => (
              <div key={di} className="contents">
                <div className="flex items-center justify-end pr-1.5 text-[11px] text-muted-foreground">
                  {DAYS[di]}
                </div>
                {row.map((v, hi) => (
                  <button
                    key={hi}
                    type="button"
                    onMouseEnter={(e) => {
                      const cell = e.currentTarget.getBoundingClientRect()
                      const parent = e.currentTarget.closest('.relative')!.getBoundingClientRect()
                      setHover({
                        day: di,
                        hour: hi,
                        value: v,
                        x: cell.left - parent.left + cell.width / 2,
                        y: cell.top - parent.top,
                      })
                    }}
                    onMouseLeave={() => setHover(null)}
                    className="aspect-square w-full rounded-[3px] transition-transform duration-100 hover:scale-110 hover:outline hover:outline-1 hover:outline-primary-700"
                    style={{ background: fillFor(v) }}
                    aria-label={`${DAYS[di]} ${hi}:00 — ${v} packages`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div
            className="mt-1.5 grid gap-[3px]"
            style={{ gridTemplateColumns: '32px repeat(24, minmax(0, 1fr))' }}
          >
            <div />
            {Array.from({ length: 24 }).map((_, h) => (
              <div key={h} className="text-center text-[10px] text-muted-foreground">
                {h % 4 === 0 ? h : ''}
              </div>
            ))}
          </div>

          {hover && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[120%] whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-md"
              style={{ left: hover.x, top: hover.y }}
            >
              <div className="font-semibold tabular-nums">{hover.value.toLocaleString()} pkgs</div>
              <div className="opacity-75">
                {DAYS[hover.day]} {hover.hour.toString().padStart(2, '0')}:00
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
