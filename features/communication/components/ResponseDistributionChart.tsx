'use client'

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { responseDistribution } from '@/mocks/communication'
import type { ResponseDistributionPoint } from '../types'
import { useThemeTokens } from '@/lib/use-theme-tokens'

export function ResponseDistributionChart() {
  const tokens = useThemeTokens([
    'border',
    'muted-foreground',
    'chart-2',
    'chart-3',
    'chart-4',
    'chart-5',
  ])
  const colors: Record<ResponseDistributionPoint['category'], string> = {
    'STOP/Opt-Out': tokens['chart-5'],
    'Opt-In': tokens['chart-3'],
    Help: tokens['chart-4'],
    Other: tokens['chart-2'],
  }
  const max = Math.max(...responseDistribution.map((d) => d.value))
  const ticks = computeTicks(max)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-3 text-xs text-muted-foreground">
        {responseDistribution.map((d) => (
          <span key={d.category} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[d.category] }} />
            {d.category}
          </span>
        ))}
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={responseDistribution}
            layout="vertical"
            margin={{ top: 4, right: 8, left: 16, bottom: 0 }}
            barCategoryGap={12}
          >
            <CartesianGrid stroke={tokens.border} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, ticks[ticks.length - 1]]}
              ticks={ticks}
              stroke={tokens['muted-foreground']}
              tick={{ fontSize: 12, fill: tokens['muted-foreground'] }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="category"
              stroke={tokens['muted-foreground']}
              tick={{ fontSize: 12, fill: tokens['muted-foreground'] }}
              tickLine={false}
              axisLine={false}
              width={88}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {responseDistribution.map((entry) => (
                <Cell key={entry.category} fill={colors[entry.category]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function computeTicks(max: number) {
  const round = Math.ceil(max / 55) * 55
  return [0, round / 4, round / 2, (round * 3) / 4, round]
}
