'use client'

import { useMemo } from 'react'
import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import {
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ComposedChart,
} from 'recharts'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useThemeTokens } from '@/lib/use-theme-tokens'
import { volumeMonth, volumeWeek } from '@/mocks/analytics'
import { useAnalytics } from '../AnalyticsContext'

export function VolumeCard() {
  const { volumeTab, setVolumeTab, comparePreset } = useAnalytics()
  const tokens = useThemeTokens([
    'primary',
    'border',
    'muted-foreground',
    'card',
    'foreground',
  ])

  const isWeek = volumeTab === 'week'
  const data = isWeek ? volumeWeek : volumeMonth
  const showCompare = isWeek && comparePreset !== 'none'

  const subtitle = isWeek ? 'Current week vs previous week' : 'Last 30 days · current period'

  const csvRows = useMemo(
    () => ['label,current,previous', ...data.map((d) => `${d.label},${d.current},${d.previous ?? ''}`)],
    [data]
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(csvRows.join('\n'))
      toast.success('Volume data copied as CSV')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daily-package-volume-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded daily-package-volume.csv')
  }

  return (
    <Card className="rounded-[10px] border-0 p-5 shadow-card">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-bold leading-tight">Daily Package Volume</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <Tabs value={volumeTab} onValueChange={(v) => setVolumeTab(v as 'week' | 'month')}>
              <TabsList className="h-9 p-1">
                <TabsTrigger value="week" className="px-3 py-1 text-xs">
                  This week
                </TabsTrigger>
                <TabsTrigger value="month" className="px-3 py-1 text-xs">
                  Last 30 days
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ background: tokens.primary }} />
            Current period
          </span>
          {showCompare && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="block h-0 w-3 border-t border-dashed"
                style={{ borderColor: tokens['muted-foreground'] }}
              />
              Previous period
            </span>
          )}
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="volume-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={tokens.primary} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={tokens.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke={tokens.border} vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: tokens['muted-foreground'], fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={isWeek ? 0 : 'preserveStartEnd'}
              />
              <YAxis
                tick={{ fill: tokens['muted-foreground'], fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={48}
                tickFormatter={(v: number) => (v >= 1000 ? `${(v / 1000).toFixed(v % 1000 ? 1 : 0)}k` : `${v}`)}
              />
              <Tooltip
                cursor={{ stroke: tokens.primary, strokeOpacity: 0.4, strokeDasharray: '3 3' }}
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.card,
                  color: tokens.foreground,
                  fontSize: 12,
                }}
                formatter={(value, name) => [
                  `${Number(value).toLocaleString()} pkgs`,
                  name === 'current' ? 'Current' : 'Previous',
                ]}
              />
              <Area
                type="monotone"
                dataKey="current"
                stroke={tokens.primary}
                strokeWidth={2.25}
                fill="url(#volume-area)"
                activeDot={{ r: 5, fill: tokens.card, stroke: tokens.primary, strokeWidth: 2 }}
                dot={{ r: 3, fill: tokens.card, stroke: tokens.primary, strokeWidth: 2 }}
              />
              {showCompare && (
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke={tokens['muted-foreground']}
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
