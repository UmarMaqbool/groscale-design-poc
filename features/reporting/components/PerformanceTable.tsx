import { performanceColumns, performanceRows } from '@/mocks/reporting'
import type { PerformanceRow } from '../types'
import { ReportTable } from './ReportTable'

export function PerformanceTable() {
  return (
    <ReportTable<PerformanceRow, keyof PerformanceRow>
      columns={performanceColumns}
      rows={performanceRows}
      renderCell={(row, key) => row[key]}
    />
  )
}
