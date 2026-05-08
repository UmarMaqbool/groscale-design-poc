'use client'

import { toast } from 'sonner'
import { weeklySummary } from '@/mocks/communication'
import { ReportTable } from '@/features/reporting/components/ReportTable'
import type { ReportColumn } from '@/features/reporting/types'
import type { WeeklySummaryRow } from '../../types'

const columns: ReportColumn<keyof WeeklySummaryRow>[] = [
  { key: 'week', label: 'Week', width: 140 },
  { key: 'sent', label: 'Sent', width: 100 },
  { key: 'delivered', label: 'Delivered', width: 110 },
  { key: 'deliveryRate', label: 'Delivery Rate', width: 120 },
  { key: 'failed', label: 'Failed', width: 90 },
  { key: 'replies', label: 'Replies', width: 90 },
  { key: 'stop', label: 'Stop', width: 80 },
  { key: 'help', label: 'Help', width: 80 },
  { key: 'optIn', label: 'Opt-In', width: 80 },
  { key: 'other', label: 'Other', width: 90 },
  { key: 'replyRate', label: 'Reply Rate', width: 110 },
]

export function WeeklyReporting() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-2xl font-bold text-foreground">Summary</h2>
        <button
          type="button"
          onClick={() => toast.success('Exporting Weekly Summary')}
          className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground transition-colors hover:bg-muted"
        >
          Export Now
        </button>
      </div>
      <ReportTable<WeeklySummaryRow, keyof WeeklySummaryRow>
        columns={columns}
        rows={weeklySummary}
        renderCell={(row, key) => row[key]}
      />
    </div>
  )
}
