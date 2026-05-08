'use client'

import * as React from 'react'
import { subDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import type { VolumeTab } from '@/mocks/analytics'

export type ComparePreset = 'prev_period' | 'prev_year' | 'none'

const REGIONS = [
  'All regions',
  'LATAM',
  'São Paulo, BR',
  'Mexico City, MX',
  'Bogotá, CO',
  'Buenos Aires, AR',
] as const

export type Region = (typeof REGIONS)[number]

interface AnalyticsContextValue {
  range: DateRange | undefined
  setRange: (r: DateRange | undefined) => void
  region: Region
  setRegion: (r: Region) => void
  comparePreset: ComparePreset
  cycleComparePreset: () => void
  volumeTab: VolumeTab
  setVolumeTab: (t: VolumeTab) => void
  regions: typeof REGIONS
}

const AnalyticsContext = React.createContext<AnalyticsContextValue | null>(null)

const compareLabels: Record<ComparePreset, string> = {
  prev_period: 'vs previous period',
  prev_year: 'vs same period last year',
  none: 'no comparison',
}

export function compareLabel(preset: ComparePreset) {
  return compareLabels[preset]
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = React.useState<DateRange | undefined>(() => ({
    from: subDays(new Date(), 30),
    to: new Date(),
  }))
  const [region, setRegion] = React.useState<Region>('All regions')
  const [comparePreset, setComparePreset] = React.useState<ComparePreset>('prev_period')
  const [volumeTab, setVolumeTab] = React.useState<VolumeTab>('week')

  const cycleComparePreset = React.useCallback(() => {
    setComparePreset((prev) =>
      prev === 'prev_period' ? 'prev_year' : prev === 'prev_year' ? 'none' : 'prev_period'
    )
  }, [])

  const value = React.useMemo<AnalyticsContextValue>(
    () => ({
      range,
      setRange,
      region,
      setRegion,
      comparePreset,
      cycleComparePreset,
      volumeTab,
      setVolumeTab,
      regions: REGIONS,
    }),
    [range, region, comparePreset, cycleComparePreset, volumeTab]
  )

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const ctx = React.useContext(AnalyticsContext)
  if (!ctx) throw new Error('useAnalytics must be used inside AnalyticsProvider')
  return ctx
}
