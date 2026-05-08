'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { AlgorithmFormState, AlgorithmTab } from './types'

interface AlgorithmContextValue {
  form: AlgorithmFormState
  setForm: (next: AlgorithmFormState) => void
  patchForm: (patch: Partial<AlgorithmFormState>) => void
  hasRun: boolean
  setHasRun: (v: boolean) => void
  activeTab: AlgorithmTab
  setActiveTab: (tab: AlgorithmTab) => void
  reset: () => void
}

const initial: AlgorithmFormState = {
  fileDropDate: '17/10/25',
  maxRepetitions: '4',
  mealsPerPackage: '14',
  inventoryStrategy: 'event-distribution',
}

const AlgorithmContext = createContext<AlgorithmContextValue | null>(null)

export function AlgorithmProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<AlgorithmFormState>(initial)
  const [hasRun, setHasRun] = useState(true)
  const [activeTab, setActiveTab] = useState<AlgorithmTab>('results')

  const patchForm = (patch: Partial<AlgorithmFormState>) =>
    setForm((prev) => ({ ...prev, ...patch }))

  const reset = () => {
    setForm(initial)
    setHasRun(false)
  }

  return (
    <AlgorithmContext.Provider
      value={{ form, setForm, patchForm, hasRun, setHasRun, activeTab, setActiveTab, reset }}
    >
      {children}
    </AlgorithmContext.Provider>
  )
}

export function useAlgorithm() {
  const ctx = useContext(AlgorithmContext)
  if (!ctx) throw new Error('useAlgorithm must be used within AlgorithmProvider')
  return ctx
}
