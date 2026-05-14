'use client'

import { Package, CheckCircle2, Clock, AlertTriangle, Truck, ArrowUp, ArrowDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useThemeTokens } from '@/lib/use-theme-tokens'
import { cn } from '@/lib/utils'
import type { AnalyticsKpi, IconKey } from '@/mocks/analytics'
import { Sparkline } from './Sparkline'

const iconMap: Record<IconKey, typeof Package> = {
  package: Package,
  check: CheckCircle2,
  clock: Clock,
  alert: AlertTriangle,
  truck: Truck,
}

interface Props {
  kpi: AnalyticsKpi
}

export function AnalyticsKpiCard({ kpi }: Props) {
  const Icon = iconMap[kpi.icon]
  const TrendIcon = kpi.deltaDir === 'up' ? ArrowUp : ArrowDown
  const tokens = useThemeTokens(['primary', 'destructive'])
  const sparkColor = kpi.sparkTone === 'destructive' ? tokens.destructive : tokens.primary

  return (
    <Card className="relative flex flex-col gap-3 overflow-hidden rounded-[10px] border-0 p-5 shadow-card transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{kpi.label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.7} />
      </div>

      <p className="text-3xl font-bold leading-none tracking-tight tabular-nums text-foreground">
        {kpi.value}
      </p>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium',
            kpi.deltaTone === 'success'
              ? 'bg-primary/15 text-primary'
              : 'bg-destructive/15 text-destructive'
          )}
        >
          <TrendIcon className="h-3 w-3" strokeWidth={2.4} />
          {kpi.delta}
        </span>
        <span className="text-xs text-muted-foreground">{kpi.sub}</span>
      </div>

      <div className="-mx-5 -mb-5 mt-1 h-10">
        {sparkColor && <Sparkline data={kpi.sparkline} color={sparkColor} height={40} />}
      </div>
    </Card>
  )
}
