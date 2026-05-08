'use client'

import { toast } from 'sonner'
import { inboundKpis, outboundKpis } from '@/mocks/communication'
import { KpiTile } from '../KpiTile'
import { VendorRatingChart } from '../VendorRatingChart'
import { ResponseDistributionChart } from '../ResponseDistributionChart'

export function SmsDashboard() {
  return (
    <div className="grid grid-cols-1 gap-5 px-5 lg:grid-cols-2">
      <DashboardCard
        title="Outbound SMS"
        onExport={() => toast.success('Exporting Outbound SMS data')}
      >
        <div className="grid grid-cols-2 gap-3">
          {outboundKpis.map((kpi) => (
            <KpiTile key={kpi.key} kpi={kpi} />
          ))}
        </div>
        <ChartCard title="Average vendor rating" subtitle="Track how your rating compares to your industry average.">
          <VendorRatingChart />
        </ChartCard>
      </DashboardCard>

      <DashboardCard
        title="Inbound SMS"
        onExport={() => toast.success('Exporting Inbound SMS data')}
      >
        <div className="grid grid-cols-2 gap-3">
          {inboundKpis.map((kpi) => (
            <KpiTile key={kpi.key} kpi={kpi} />
          ))}
        </div>
        <ChartCard title="Response Distribution" subtitle="Track response distribution">
          <ResponseDistributionChart />
        </ChartCard>
      </DashboardCard>
    </div>
  )
}

function DashboardCard({
  title,
  subtitle,
  onExport,
  children,
}: {
  title: string
  subtitle?: string
  onExport: () => void
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-5 rounded-[10px] border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold leading-tight text-foreground">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        <button
          type="button"
          onClick={onExport}
          className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Export Now
        </button>
      </div>
      {children}
    </div>
  )
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}
