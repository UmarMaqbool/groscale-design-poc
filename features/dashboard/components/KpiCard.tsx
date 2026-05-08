import { Box, Truck, CheckCircle2, XCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { DashboardKpi } from '@/mocks/dashboard'

const iconMap = {
  box: Box,
  truck: Truck,
  check: CheckCircle2,
  x: XCircle,
  alert: AlertTriangle,
} as const

interface KpiCardProps {
  kpi: DashboardKpi & { value: string; trend: { delta: number; positive: boolean } }
}

export function KpiCard({ kpi }: KpiCardProps) {
  const Icon = iconMap[kpi.icon]
  const TrendIcon = kpi.trend.positive ? TrendingUp : TrendingDown
  const trendColor = kpi.trend.positive ? 'text-success' : 'text-destructive'

  return (
    <Card className="rounded-[10px] border-0 shadow-card transition-shadow hover:shadow-md">
      <div className="flex flex-col px-3.5 py-4">
        <div className="flex items-start justify-between">
          <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.7} />
          <div className={`flex items-center gap-0.5 text-sm ${trendColor}`}>
            <TrendIcon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">+{kpi.trend.delta}%</span>
          </div>
        </div>
        <p className="mt-3 text-base text-muted-foreground">{kpi.label}</p>
        <p className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground">{kpi.value}</p>
      </div>
    </Card>
  )
}
