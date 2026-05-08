'use client'

import { useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DATE_RANGE_OPTIONS,
  ROW_FILTER_OPTIONS,
  inboundMessages,
} from '@/mocks/communication'
import { useCommunication } from '../../CommunicationContext'
import type { MessageLogRow } from '../../types'
import { ReportTable } from '@/features/reporting/components/ReportTable'
import type { ReportColumn } from '@/features/reporting/types'
import { RangeSelect } from '../RangeSelect'
import { cn } from '@/lib/utils'

const columns: ReportColumn<keyof MessageLogRow>[] = [
  { key: 'dateSent', label: 'Date Sent', width: 130 },
  { key: 'time', label: 'Time', width: 100 },
  { key: 'from', label: 'From', width: 140 },
  { key: 'to', label: 'To', width: 140 },
  { key: 'body', label: 'Body', width: 380 },
  { key: 'status', label: 'Status', width: 110 },
]

export function InboundMessages() {
  const { innerRange, setInnerRange } = useCommunication()
  const [hasResults, setHasResults] = useState(true)
  const [rowRange, setRowRange] = useState<string>(ROW_FILTER_OPTIONS[0])

  const handleSearch = () => {
    setHasResults(true)
    toast.success('Loaded inbound messages')
  }

  return (
    <div className="flex flex-col gap-5 px-5">
      <div className="rounded-[10px] border border-border bg-card p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Inbound Messages</h2>
          <button
            type="button"
            onClick={() => toast.success('Exporting inbound messages')}
            className="flex h-9 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-sm text-foreground transition-colors hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-foreground">Date Range</label>
            <RangeSelect
              value={innerRange === 'Past 30 Days' ? 'Past 7 Days' : innerRange}
              options={DATE_RANGE_OPTIONS}
              onChange={setInnerRange}
              showCalendarIcon={false}
              className="w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="h-10 w-full rounded-md bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Search
          </button>
        </div>
      </div>

      {hasResults ? (
        <div className="rounded-[10px] border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">Inbound Messages</h2>
            </div>
            <button
              type="button"
              onClick={() => toast.success('Exporting inbound messages')}
              className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground transition-colors hover:bg-muted"
            >
              Export Now
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex h-9 items-center gap-1.5 rounded-md border border-input bg-card px-3 text-sm text-foreground"
                >
                  {rowRange}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-1" align="start">
                {ROW_FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRowRange(opt)}
                    className={cn(
                      'flex w-full items-center rounded-sm px-3 py-2 text-left text-sm hover:bg-muted',
                      rowRange === opt && 'bg-accent font-medium text-primary-700'
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
            <button
              type="button"
              onClick={() => toast('Filter dialog')}
              className="h-9 rounded-md border border-input bg-card px-4 text-sm text-foreground transition-colors hover:bg-muted"
            >
              Filter
            </button>
          </div>

          <ReportTable<MessageLogRow, keyof MessageLogRow>
            columns={columns}
            rows={inboundMessages}
            renderCell={(row, key) => row[key]}
            className="rounded-none border-0 border-t border-border -mx-5 mt-4"
          />
        </div>
      ) : (
        <div className="flex h-[200px] items-center justify-center rounded-[10px] border border-border bg-card text-base text-muted-foreground">
          No Data to show here
        </div>
      )}
    </div>
  )
}
