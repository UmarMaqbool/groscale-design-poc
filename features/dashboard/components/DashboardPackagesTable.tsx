'use client'

import { useMemo } from 'react'
import { DataGrid, type DataGridColumn } from '@/components/ui/data-grid/DataGrid'
import {
  dailyTableDates,
  dailyPackageTableRows,
  type DailyPackageTableRow,
} from '@/mocks/dashboard'

export function DashboardPackagesTable() {
  const columns = useMemo<DataGridColumn<DailyPackageTableRow>[]>(
    () => [
      {
        key: 'name',
        label: 'Name',
        width: 200,
        render: (row) => <span className="text-foreground">{row.name}</span>,
      },
      ...dailyTableDates.map<DataGridColumn<DailyPackageTableRow>>((d) => ({
        key: `date-${d}`,
        label: d,
        width: 120,
        render: (row) => row.values[d]?.toLocaleString() ?? '—',
      })),
      {
        key: 'total',
        label: 'Total',
        width: 140,
        render: (row) => row.total.toLocaleString(),
      },
    ],
    []
  )

  return (
    <DataGrid<DailyPackageTableRow>
      columns={columns}
      rows={dailyPackageTableRows}
      getRowId={(row) => row.id}
      className="mx-5"
    />
  )
}
