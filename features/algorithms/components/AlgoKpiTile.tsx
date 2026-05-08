import type { AlgorithmKpi } from '../types'

export function AlgoKpiTile({ kpi }: { kpi: AlgorithmKpi }) {
  return (
    <div className="flex flex-col gap-1 rounded-md border border-border bg-card px-4 py-3">
      <span className="text-sm leading-tight text-muted-foreground">{kpi.label}</span>
      <span className="text-base font-bold text-foreground">{kpi.value}</span>
    </div>
  )
}
