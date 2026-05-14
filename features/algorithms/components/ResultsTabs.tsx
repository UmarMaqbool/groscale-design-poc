'use client'

import { cn } from '@/lib/utils'
import { useAlgorithm } from '../AlgorithmContext'
import type { AlgorithmTab } from '../types'

const TABS: Array<{ key: AlgorithmTab; label: string }> = [
  { key: 'results', label: 'Algorithm results' },
  { key: 'input', label: 'Algorithm input' },
  { key: 'allocations', label: 'Allocations' },
  { key: 'order-output', label: 'Order output' },
]

export function ResultsTabs() {
  const { activeTab, setActiveTab } = useAlgorithm()
  return (
    <div className="flex items-center gap-2">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'rounded-md border px-4 py-1.5 text-sm transition-colors',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground hover:bg-accent'
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
