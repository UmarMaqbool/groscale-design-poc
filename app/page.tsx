'use client'

import { AppShell } from '@/components/app/AppShell'
import {
  DashboardHeader,
  KpiCard,
  DailyPackageChart,
  FailedDeliveryChart,
  DashboardPackagesTable,
  DashboardProvider,
  useFilteredData,
} from '@/features/dashboard'

function DashboardBody() {
  const { kpis } = useFilteredData()

  return (
    <div className="flex flex-col gap-5 pb-10">
      <DashboardHeader />
      <div className="px-5">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.key} kpi={kpi} />
          ))}
        </div>
      </div>
      <div className="px-5">
        {/*
          Per Figma: Daily Package card has a fixed ~651px width;
          Failed Delivery flexes to fill the remaining row.
          Expanded sidebar (260px)  → Failed Delivery ≈ 429px (narrow)
          Collapsed sidebar (72px) → Failed Delivery ≈ 645px (matches Daily Package)
        */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,_651px)_minmax(0,_1fr)]">
          <DailyPackageChart />
          <FailedDeliveryChart />
        </div>
      </div>
      <DashboardPackagesTable />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <AppShell>
        <DashboardBody />
      </AppShell>
    </DashboardProvider>
  )
}
