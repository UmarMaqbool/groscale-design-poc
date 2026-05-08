'use client'

import { useMemo } from 'react'
import { differenceInDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { dashboardKpis, dailyPackageData, failureBreakdown } from '@/mocks/dashboard'
import { useDashboard } from '../DashboardContext'

/**
 * Derived data that scales mock numbers based on the applied date range.
 * Lets the dashboard feel responsive to user input even with static mocks.
 */
export function useFilteredData() {
  const { appliedRange, appliedFilters } = useDashboard()

  const factor = computeFactor(appliedRange)

  const kpis = useMemo(
    () =>
      dashboardKpis.map((kpi) => ({
        ...kpi,
        value: scaleValue(kpi.value, factor),
        trend: {
          ...kpi.trend,
          delta: Math.max(0, +(kpi.trend.delta * (factor + 0.5)).toFixed(1)),
        },
      })),
    [factor]
  )

  const daily = useMemo(
    () =>
      dailyPackageData.map((p) => ({
        ...p,
        current: Math.round(p.current * factor),
        previous: Math.round(p.previous * factor),
      })),
    [factor]
  )

  const failures = useMemo(
    () =>
      failureBreakdown.map((f) => ({
        ...f,
        value: Math.max(1, Math.round(f.value * factor)),
      })),
    [factor]
  )

  return { kpis, daily, failures, appliedFilters, appliedRange }
}

function computeFactor(range: DateRange | undefined) {
  if (!range?.from || !range?.to) return 1
  const days = Math.max(1, differenceInDays(range.to, range.from) + 1)
  // Normalize so 7 days = factor 1
  return Math.max(0.3, Math.min(3, days / 7))
}

function scaleValue(raw: string, factor: number) {
  const n = Number(raw)
  if (Number.isNaN(n)) return raw
  return Math.round(n * factor).toLocaleString()
}
