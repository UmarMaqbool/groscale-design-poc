'use client'

import { AppShell } from '@/components/app/AppShell'
import {
  ReportingProvider,
  ReportingHeader,
  ReportingTabs,
  PackageDetailsTable,
  PerformanceTable,
  RateCallsTable,
  PackageDetailsFilters,
  PerformanceFilters,
  RateCallsFilters,
  useReporting,
} from '@/features/reporting'

function ReportingBody() {
  const { activeTab } = useReporting()

  return (
    <div className="flex flex-col gap-4 pb-10">
      <ReportingHeader />
      <ReportingTabs />
      <div className="mt-2">
        {activeTab === 'package-details' && <PackageDetailsTable />}
        {(activeTab === 'performance' ||
          activeTab === 'volume' ||
          activeTab === 'status') && <PerformanceTable />}
        {activeTab === 'rate-calls' && <RateCallsTable />}
      </div>
      {activeTab === 'package-details' && <PackageDetailsFilters />}
      {(activeTab === 'performance' ||
        activeTab === 'volume' ||
        activeTab === 'status') && <PerformanceFilters />}
      {activeTab === 'rate-calls' && <RateCallsFilters />}
    </div>
  )
}

export default function ReportingPage() {
  return (
    <ReportingProvider>
      <AppShell>
        <ReportingBody />
      </AppShell>
    </ReportingProvider>
  )
}
