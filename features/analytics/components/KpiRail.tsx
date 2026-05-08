import { analyticsKpis } from '@/mocks/analytics'
import { AnalyticsKpiCard } from './AnalyticsKpiCard'

export function KpiRail() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {analyticsKpis.map((kpi) => (
        <AnalyticsKpiCard key={kpi.key} kpi={kpi} />
      ))}
    </div>
  )
}
