'use client'

import type { ReactNode } from 'react'
import { DataGrid, type DataGridColumn } from '@/components/ui/data-grid/DataGrid'
import type { ReportColumn } from '../types'

interface ReportTableProps<TRow extends { id: string }, K extends string> {
  columns: ReportColumn<K>[]
  rows: TRow[]
  renderCell: (row: TRow, key: K) => ReactNode
  emptyMessage?: string
  /** Override outer container classes — pass empty string to drop default mx-5. */
  className?: string
}

/**
 * Tabular shell for reporting / algorithm / communication tabs. Now backed by
 * AG Grid via `DataGrid` so all tables share the same engine — visual styling
 * (header bg #fafafb, h48; row h42; border #e5e7eb; outer rounded-[10px]) is
 * preserved by the dataGrid theme.
 */
export function ReportTable<TRow extends { id: string }, K extends string>({
  columns,
  rows,
  renderCell,
  emptyMessage = 'No data to display.',
  className = 'mx-5',
}: ReportTableProps<TRow, K>) {
  const dgColumns: DataGridColumn<TRow>[] = columns.map((col) => ({
    key: col.key,
    label: col.label,
    width: col.width,
    align: col.align,
    render: (row) => renderCell(row, col.key),
  }))

  return (
    <DataGrid<TRow>
      columns={dgColumns}
      rows={rows}
      getRowId={(row) => row.id}
      emptyMessage={emptyMessage}
      className={className}
    />
  )
}
