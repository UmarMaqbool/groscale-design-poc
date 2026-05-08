import {
  Send,
  CheckCircle2,
  Flag,
  MousePointer2,
  MessageSquare,
  Ban,
  LogIn,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CommunicationKpi } from '../types'

const ICONS: Record<CommunicationKpi['icon'], LucideIcon> = {
  send: Send,
  'check-circle': CheckCircle2,
  flag: Flag,
  'mouse-pointer': MousePointer2,
  message: MessageSquare,
  block: Ban,
  login: LogIn,
  help: HelpCircle,
}

export function KpiTile({ kpi }: { kpi: CommunicationKpi }) {
  const Icon = ICONS[kpi.icon]
  const trend = kpi.trend
  const TrendIcon = trend?.direction === 'up' ? TrendingUp : trend?.direction === 'down' ? TrendingDown : Minus
  const trendColor =
    trend?.direction === 'up'
      ? 'text-success'
      : trend?.direction === 'down'
        ? 'text-destructive'
        : 'text-muted-foreground'

  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-card p-3.5">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{kpi.label}</span>
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-bold leading-tight text-foreground">{kpi.value}</span>
        {trend ? (
          <span className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
            <TrendIcon className="h-3 w-3" strokeWidth={2.5} />
            {trend.value}
          </span>
        ) : null}
      </div>
    </div>
  )
}
