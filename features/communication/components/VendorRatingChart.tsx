'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { vendorRatingData } from '@/mocks/communication'
import { useThemeTokens } from '@/lib/use-theme-tokens'

export function VendorRatingChart() {
  const tokens = useThemeTokens(['primary', 'border', 'muted-foreground', 'destructive', 'muted'])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-4 text-xs">
        <LegendDot color={tokens.primary} label="Delivered" />
        <LegendDot color={tokens.destructive} label="Failed" />
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vendorRatingData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke={tokens.border} vertical={false} />
            <XAxis
              dataKey="date"
              stroke={tokens['muted-foreground']}
              tick={{ fontSize: 12, fill: tokens['muted-foreground'] }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              stroke={tokens['muted-foreground']}
              tick={{ fontSize: 12, fill: tokens['muted-foreground'] }}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="delivered" stackId="a" fill={tokens.primary} radius={[0, 0, 0, 0]} />
            <Bar dataKey="failed" stackId="a" fill={tokens.muted} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  )
}
