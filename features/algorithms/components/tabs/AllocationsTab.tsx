import { allocationColumns, allocationRows } from '@/mocks/algorithms'
import { ReportTable } from '@/features/reporting/components/ReportTable'
import type { AllocationRow } from '../../types'

export function AllocationsTab() {
  return (
    <ReportTable<AllocationRow, keyof AllocationRow>
      columns={allocationColumns}
      rows={allocationRows}
      renderCell={(row, key) => row[key]}
      className=""
    />
  )
}
