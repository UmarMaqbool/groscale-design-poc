'use client'

import { useMemo } from 'react'
import { packageDetailsColumns, packageDetailsRows } from '@/mocks/reporting'
import type { PackageDetailsRow } from '../types'
import { useReporting } from '../ReportingContext'
import { ReportTable } from './ReportTable'

export function PackageDetailsTable() {
  const { search } = useReporting()

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return packageDetailsRows
    return packageDetailsRows.filter((r) =>
      [r.name, r.routeName, r.address, String(r.shipper), String(r.deliveryPartner)]
        .some((v) => v.toLowerCase().includes(q))
    )
  }, [search])

  return (
    <ReportTable<PackageDetailsRow, keyof PackageDetailsRow>
      columns={packageDetailsColumns}
      rows={rows}
      renderCell={(row, key) => row[key]}
    />
  )
}
