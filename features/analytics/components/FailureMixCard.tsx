'use client'

import { useMemo } from 'react'
import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { useThemeTokens } from '@/lib/use-theme-tokens'
import { failureMix, type SliceTone } from '@/mocks/analytics'

export function FailureMixCard() {
  const tokens = useThemeTokens([
    'primary',
    'primary-700',
    'primary-300',
    'card',
    'foreground',
    'muted-foreground',
  ])

  const colorFor = (tone: SliceTone): string => {
    switch (tone) {
      case 'primary':
        return tokens.primary
      case 'primary-700':
        return tokens['primary-700']
      case 'primary-300':
        return tokens['primary-300']
      case 'amber':
        return 'hsl(38 92% 55%)'
      case 'gray':
        return 'hsl(216 12% 70%)'
    }
  }

  const total = failureMix.reduce((s, d) => s + d.value, 0)
  const slices = useMemo(
    () => failureMix.map((s) => ({ ...s, color: colorFor(s.tone) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokens]
  )

  const handleCopy = async () => {
    const csv = ['reason,value', ...failureMix.map((f) => `${f.reason},${f.value}`)].join('\n')
    try {
      await navigator.clipboard.writeText(csv)
      toast.success('Failure data copied as CSV')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  const handleDownload = () => {
    const csv = ['reason,value', ...failureMix.map((f) => `${f.reason},${f.value}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `failure-mix-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded failure-mix.csv')
  }

  return (
    <Card className="rounded-[10px] border-0 p-5 shadow-card">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-tight">Failed Delivery Mix</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Breakdown by failure type</p>
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

        <div className="flex flex-col items-center gap-5">
          <div className="relative h-[200px] w-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slices}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={96}
                  dataKey="value"
                  paddingAngle={2}
                  stroke={tokens.card}
                  strokeWidth={2}
                  isAnimationActive
                >
                  {slices.map((s, i) => (
                    <Cell key={`slice-${i}`} fill={s.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold leading-none tabular-nums text-foreground">
                {total}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">Total failures</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            {slices.map((s) => {
              const pct = ((s.value / total) * 100).toFixed(1)
              return (
                <div
                  key={s.reason}
                  className="grid grid-cols-[10px_1fr_auto_56px] items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                  <span className="text-sm text-foreground">{s.reason}</span>
                  <span className="text-sm tabular-nums text-muted-foreground">{s.value}</span>
                  <span className="text-right text-xs tabular-nums text-muted-foreground">
                    {pct}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
