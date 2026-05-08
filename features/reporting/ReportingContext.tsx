'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { subDays } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import type { ReportTab } from './types'

interface ReportingContextValue {
  activeTab: ReportTab
  setActiveTab: (tab: ReportTab) => void
  dateRange: DateRange | undefined
  setDateRange: (range: DateRange | undefined) => void
  filtersOpen: boolean
  setFiltersOpen: (open: boolean) => void
  search: string
  setSearch: (s: string) => void
}

const ReportingContext = createContext<ReportingContextValue | null>(null)

export function ReportingProvider({
  initialTab = 'package-details',
  children,
}: {
  initialTab?: ReportTab
  children: ReactNode
}) {
  const today = new Date()
  const [activeTab, setActiveTab] = useState<ReportTab>(initialTab)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(today, 7),
    to: today,
  })
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <ReportingContext.Provider
      value={{
        activeTab,
        setActiveTab,
        dateRange,
        setDateRange,
        filtersOpen,
        setFiltersOpen,
        search,
        setSearch,
      }}
    >
      {children}
    </ReportingContext.Provider>
  )
}

export function useReporting() {
  const ctx = useContext(ReportingContext)
  if (!ctx) throw new Error('useReporting must be used within ReportingProvider')
  return ctx
}
