import { rateCallsColumns, rateCallsRows } from '@/mocks/reporting'
import type { RateCallsRow } from '../types'
import { ReportTable } from './ReportTable'

export function RateCallsTable() {
  return (
    <ReportTable<RateCallsRow, keyof RateCallsRow>
      columns={rateCallsColumns}
      rows={rateCallsRows}
      renderCell={(row, key) => {
        if (key === 'packagesFromRate') {
          return `${row.packagesFromRate.toFixed(2)}%`
        }
        return row[key]
      }}
    />
  )
}
