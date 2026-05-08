'use client'

import { useState } from 'react'
import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFilteredData } from '../hooks/useFilteredData'
import { useThemeTokens } from '@/lib/use-theme-tokens'

type Tab = 'current' | 'previous'

export function DailyPackageChart() {
  const [tab, setTab] = useState<Tab>('current')
  const { daily } = useFilteredData()
  const tokens = useThemeTokens([
    'primary',
    'secondary',
    'border',
    'muted-foreground',
    'card',
    'foreground',
  ])

  const maxIdx = daily.reduce((best, p, i) => (p[tab] > daily[best][tab] ? i : best), 0)

  const handleCopy = async () => {
    const csv = ['date,current,previous', ...daily.map((d) => `${d.date},${d.current},${d.previous}`)].join('\n')
    try {
      await navigator.clipboard.writeText(csv)
      toast.success('Chart data copied as CSV')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  const handleDownload = () => {
    const csv = ['date,current,previous', ...daily.map((d) => `${d.date},${d.current},${d.previous}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daily-packages-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded daily-packages.csv')
  }

  return (
    <Card className="rounded-[10px] border-0 p-5 shadow-card">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-tight">Daily Package Data</h3>
            <p className="mt-2 text-base text-muted-foreground">Current week vs previous week</p>
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

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daily} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={tokens.border} vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: tokens['muted-foreground'], fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: tokens['muted-foreground'], fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--primary) / 0.08)' }}
                contentStyle={{
                  borderRadius: 8,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.card,
                  color: tokens.foreground,
                  fontSize: 12,
                  fontFamily: 'Helvetica Neue, Helvetica',
                }}
                labelStyle={{ color: tokens.foreground }}
                itemStyle={{ color: tokens.foreground }}
              />
              <Bar dataKey={tab} radius={[10, 10, 10, 10]} maxBarSize={56}>
                {daily.map((_, i) => (
                  <Cell key={`bar-${i}`} fill={i === maxIdx ? tokens.primary : tokens.secondary} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center">
          <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
            <TabsList>
              <TabsTrigger value="current">Daily Packages</TabsTrigger>
              <TabsTrigger value="previous">Previous Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </Card>
  )
}
