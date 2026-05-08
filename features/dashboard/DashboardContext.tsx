'use client'

import * as React from 'react'
import { subDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'

type DashboardFilters = {
  status: string[] // e.g. ['delivered', 'in_transit']
  carrier: string | null
  region: string | null
}

type DashboardContextValue = {
  // Pending values (user is editing)
  pendingRange: DateRange | undefined
  setPendingRange: (r: DateRange | undefined) => void
  pendingFilters: DashboardFilters
  setPendingFilters: React.Dispatch<React.SetStateAction<DashboardFilters>>

  // Applied values (used by widgets)
  appliedRange: DateRange | undefined
  appliedFilters: DashboardFilters

  // Actions
  apply: () => void
  reset: () => void
  isDirty: boolean
}

const DashboardContext = React.createContext<DashboardContextValue | null>(null)

const defaultRange: DateRange = {
  from: subDays(new Date(), 7),
  to: new Date(),
}
const defaultFilters: DashboardFilters = {
  status: [],
  carrier: null,
  region: null,
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [pendingRange, setPendingRange] = React.useState<DateRange | undefined>(defaultRange)
  const [pendingFilters, setPendingFilters] = React.useState<DashboardFilters>(defaultFilters)

  const [appliedRange, setAppliedRange] = React.useState<DateRange | undefined>(defaultRange)
  const [appliedFilters, setAppliedFilters] = React.useState<DashboardFilters>(defaultFilters)

  const apply = React.useCallback(() => {
    setAppliedRange(pendingRange)
    setAppliedFilters(pendingFilters)
  }, [pendingRange, pendingFilters])

  const reset = React.useCallback(() => {
    setPendingRange(defaultRange)
    setPendingFilters(defaultFilters)
    setAppliedRange(defaultRange)
    setAppliedFilters(defaultFilters)
  }, [])

  const isDirty =
    JSON.stringify(pendingRange) !== JSON.stringify(appliedRange) ||
    JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters)

  const value = React.useMemo<DashboardContextValue>(
    () => ({
      pendingRange,
      setPendingRange,
      pendingFilters,
      setPendingFilters,
      appliedRange,
      appliedFilters,
      apply,
      reset,
      isDirty,
    }),
    [pendingRange, pendingFilters, appliedRange, appliedFilters, apply, reset, isDirty]
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const ctx = React.useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used inside DashboardProvider')
  return ctx
}
