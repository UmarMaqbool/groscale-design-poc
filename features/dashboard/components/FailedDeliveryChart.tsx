'use client'

import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { useFilteredData } from '../hooks/useFilteredData'
import { useThemeTokens } from '@/lib/use-theme-tokens'

export function FailedDeliveryChart() {
  const { failures } = useFilteredData()
  const tokens = useThemeTokens([
    'chart-1',
    'chart-2',
    'chart-3',
    'chart-4',
    'chart-5',
    'border',
    'card',
    'foreground',
  ])

  const palette = [tokens['chart-1'], tokens['chart-2'], tokens['chart-3'], tokens['chart-4'], tokens['chart-5']]

  const handleCopy = async () => {
    const csv = ['reason,value', ...failures.map((f) => `${f.reason},${f.value}`)].join('\n')
    try {
      await navigator.clipboard.writeText(csv)
      toast.success('Chart data copied')
    } catch {
      toast.error('Could not copy')
    }
  }

  const handleDownload = () => {
    const csv = ['reason,value', ...failures.map((f) => `${f.reason},${f.value}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `failed-delivery-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded failed-delivery.csv')
  }

  return (
    <Card className="rounded-[10px] border-0 p-5 shadow-card">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-tight">Failed Delivery</h3>
            <p className="mt-2 text-base text-muted-foreground">Breakdown by failure type</p>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <button
              onClick={handleCopy}
              className="rounded-md p-1 hover:bg-muted hover:text-foreground"
              aria-label="Copy data"
            >
              <Copy className="h-5 w-5" />
            </button>
            <button
              onClick={handleDownload}
              className="rounded-md p-1 hover:bg-muted hover:text-foreground"
              aria-label="Download CSV"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex h-[260px] w-full items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={failures}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={110}
                dataKey="value"
                stroke={tokens.card}
                strokeWidth={2}
                isAnimationActive
              >
                {failures.map((_, i) => (
                  <Cell key={`slice-${i}`} fill={palette[i % palette.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.card,
                  color: tokens.foreground,
                  fontSize: 12,
                }}
                labelStyle={{ color: tokens.foreground }}
                itemStyle={{ color: tokens.foreground }}
                formatter={(value, _name, item) => [value as number, (item.payload as { reason: string }).reason]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {failures.map((item, i) => (
            <div key={item.reason} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: palette[i % palette.length] }} />
              <span className="text-xs text-foreground">{item.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
