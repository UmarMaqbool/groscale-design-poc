'use client'

import * as React from 'react'
import type {
  PackageColumnKey,
  PackageStatus,
  PackagesAdvancedFilters,
} from './types'
import { PACKAGE_COLUMNS } from '@/mocks/packages'

type PackagesContextValue = {
  pendingSearch: string
  setPendingSearch: (s: string) => void
  appliedSearch: string

  statusFilter: PackageStatus | null
  setStatusFilter: (s: PackageStatus | null) => void

  pendingAdvanced: PackagesAdvancedFilters
  setPendingAdvanced: React.Dispatch<React.SetStateAction<PackagesAdvancedFilters>>
  appliedAdvanced: PackagesAdvancedFilters

  visibleColumns: Set<PackageColumnKey>
  toggleColumn: (key: PackageColumnKey) => void

  selectedIds: Set<string>
  toggleRow: (id: string) => void
  toggleAll: (ids: string[]) => void
  clearSelection: () => void

  applyHeader: () => void
  applyAdvanced: () => void
  clearAdvanced: () => void
  isHeaderDirty: boolean
}

const defaultAdvanced: PackagesAdvancedFilters = {
  deliveryFrom: undefined,
  deliveryTo: undefined,
  shipFrom: undefined,
  shipTo: undefined,
  shipperIds: [],
  carrierIds: [],
  locationIds: [],
}

const PackagesContext = React.createContext<PackagesContextValue | null>(null)

export function PackagesProvider({ children }: { children: React.ReactNode }) {
  const [pendingSearch, setPendingSearch] = React.useState('')
  const [appliedSearch, setAppliedSearch] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<PackageStatus | null>(null)
  const [pendingAdvanced, setPendingAdvanced] =
    React.useState<PackagesAdvancedFilters>(defaultAdvanced)
  const [appliedAdvanced, setAppliedAdvanced] =
    React.useState<PackagesAdvancedFilters>(defaultAdvanced)
  const [visibleColumns, setVisibleColumns] = React.useState<Set<PackageColumnKey>>(
    () => new Set(PACKAGE_COLUMNS.map((c) => c.key))
  )
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())

  const toggleColumn = React.useCallback((key: PackageColumnKey) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const toggleRow = React.useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleAll = React.useCallback((ids: string[]) => {
    setSelectedIds((prev) => {
      const allSelected = ids.length > 0 && ids.every((id) => prev.has(id))
      if (allSelected) return new Set()
      return new Set(ids)
    })
  }, [])

  const clearSelection = React.useCallback(() => setSelectedIds(new Set()), [])

  const applyHeader = React.useCallback(() => {
    setAppliedSearch(pendingSearch)
  }, [pendingSearch])

  const applyAdvanced = React.useCallback(() => {
    setAppliedAdvanced(pendingAdvanced)
  }, [pendingAdvanced])

  const clearAdvanced = React.useCallback(() => {
    setPendingAdvanced(defaultAdvanced)
    setAppliedAdvanced(defaultAdvanced)
  }, [])

  const isHeaderDirty = pendingSearch !== appliedSearch

  const value = React.useMemo<PackagesContextValue>(
    () => ({
      pendingSearch,
      setPendingSearch,
      appliedSearch,
      statusFilter,
      setStatusFilter,
      pendingAdvanced,
      setPendingAdvanced,
      appliedAdvanced,
      visibleColumns,
      toggleColumn,
      selectedIds,
      toggleRow,
      toggleAll,
      clearSelection,
      applyHeader,
      applyAdvanced,
      clearAdvanced,
      isHeaderDirty,
    }),
    [
      pendingSearch,
      appliedSearch,
      statusFilter,
      pendingAdvanced,
      appliedAdvanced,
      visibleColumns,
      toggleColumn,
      selectedIds,
      toggleRow,
      toggleAll,
      clearSelection,
      applyHeader,
      applyAdvanced,
      clearAdvanced,
      isHeaderDirty,
    ]
  )

  return <PackagesContext.Provider value={value}>{children}</PackagesContext.Provider>
}

export function usePackages() {
  const ctx = React.useContext(PackagesContext)
  if (!ctx) throw new Error('usePackages must be used inside PackagesProvider')
  return ctx
}
