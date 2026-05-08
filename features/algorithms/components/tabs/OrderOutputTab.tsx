import { orderOutputColumns, orderOutputRows } from '@/mocks/algorithms'
import { ReportTable } from '@/features/reporting/components/ReportTable'
import type { OrderOutputRow } from '../../types'

export function OrderOutputTab() {
  return (
    <ReportTable<OrderOutputRow, keyof OrderOutputRow>
      columns={orderOutputColumns}
      rows={orderOutputRows}
      renderCell={(row, key) => row[key]}
      className=""
    />
  )
}
