'use client'

import { AppShell } from '@/components/app/AppShell'
import {
  AlgorithmProvider,
  AlgorithmForm,
  ResultsTabs,
  AlgorithmResults,
  AlgorithmInputTab,
  AllocationsTab,
  OrderOutputTab,
  useAlgorithm,
} from '@/features/algorithms'

function AlgorithmsBody() {
  const { hasRun, activeTab } = useAlgorithm()

  return (
    <div className="flex flex-col gap-5 px-5 pb-10 pt-5">
      <AlgorithmForm />
      {hasRun ? (
        <div className="flex flex-col gap-6 rounded-[10px] border border-border bg-card p-5">
          <ResultsTabs />
          {activeTab === 'results' && <AlgorithmResults />}
          {activeTab === 'input' && <AlgorithmInputTab />}
          {activeTab === 'allocations' && <AllocationsTab />}
          {activeTab === 'order-output' && <OrderOutputTab />}
        </div>
      ) : null}
    </div>
  )
}

export default function AlgorithmsPage() {
  return (
    <AlgorithmProvider>
      <AppShell>
        <AlgorithmsBody />
      </AppShell>
    </AlgorithmProvider>
  )
}
