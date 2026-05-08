'use client'

import { AppShell } from '@/components/app/AppShell'
import {
  ActivityFeedCard,
  AnalyticsHeader,
  AnalyticsProvider,
  FailureMixCard,
  FunnelCard,
  HeatmapCard,
  KpiRail,
  RegionsCard,
  VolumeCard,
} from '@/features/analytics'

function AnalyticsBody() {
  return (
    <div className="flex flex-col">
      <AnalyticsHeader />
      <div className="flex flex-col gap-5 p-5">
        <KpiRail />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VolumeCard />
          </div>
          <FailureMixCard />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FunnelCard />
          </div>
          <RegionsCard />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <HeatmapCard />
          </div>
          <ActivityFeedCard />
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <AnalyticsProvider>
      <AppShell>
        <AnalyticsBody />
      </AppShell>
    </AnalyticsProvider>
  )
}
