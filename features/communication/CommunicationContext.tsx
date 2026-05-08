'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { CommunicationTab } from './types'

interface CommunicationContextValue {
  activeTab: CommunicationTab
  setActiveTab: (tab: CommunicationTab) => void
  dateRange: string
  setDateRange: (v: string) => void
  weeklyRange: string
  setWeeklyRange: (v: string) => void
  innerRange: string
  setInnerRange: (v: string) => void
  phoneSearch: string
  setPhoneSearch: (v: string) => void
}

const CommunicationContext = createContext<CommunicationContextValue | null>(null)

export function CommunicationProvider({
  initialTab = 'sms-dashboard',
  children,
}: {
  initialTab?: CommunicationTab
  children: ReactNode
}) {
  const [activeTab, setActiveTab] = useState<CommunicationTab>(initialTab)
  const [dateRange, setDateRange] = useState('Past 7 Days')
  const [weeklyRange, setWeeklyRange] = useState('4 Weeks')
  const [innerRange, setInnerRange] = useState('Past 30 Days')
  const [phoneSearch, setPhoneSearch] = useState('')

  return (
    <CommunicationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        dateRange,
        setDateRange,
        weeklyRange,
        setWeeklyRange,
        innerRange,
        setInnerRange,
        phoneSearch,
        setPhoneSearch,
      }}
    >
      {children}
    </CommunicationContext.Provider>
  )
}

export function useCommunication() {
  const ctx = useContext(CommunicationContext)
  if (!ctx) throw new Error('useCommunication must be used within CommunicationProvider')
  return ctx
}
