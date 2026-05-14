'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { DATE_RANGE_OPTIONS, smsHistoryLogs } from '@/mocks/communication'
import { useCommunication } from '../../CommunicationContext'
import type { MessageLogRow } from '../../types'
import { ReportTable } from '@/features/reporting/components/ReportTable'
import type { ReportColumn } from '@/features/reporting/types'
import { RangeSelect } from '../RangeSelect'

const columns: ReportColumn<keyof MessageLogRow>[] = [
  { key: 'dateSent', label: 'Date Sent', width: 130 },
  { key: 'time', label: 'Time', width: 100 },
  { key: 'from', label: 'From', width: 140 },
  { key: 'to', label: 'To', width: 140 },
  { key: 'body', label: 'Body', width: 380 },
  { key: 'status', label: 'Status', width: 110 },
]

export function SmsHistory() {
  const { phoneSearch, setPhoneSearch, innerRange, setInnerRange } = useCommunication()
  const [hasResults, setHasResults] = useState(true) // start in data state per Figma

  const handleSearch = () => {
    setHasResults(true)
    toast.success(phoneSearch ? `Searching for ${phoneSearch}` : 'Loaded SMS history')
  }

  return (
    <div className="flex flex-col gap-5 px-5">
      <div className="rounded-[10px] border border-border bg-card p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">SMS History</h2>
          <button
            type="button"
            onClick={() => toast('Viewing SMS Campaigns')}
            className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground transition-colors hover:bg-accent"
          >
            View SMS Campaigns
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone-search" className="text-sm text-foreground">
              Search by Phone Number
            </label>
            <input
              id="phone-search"
              value={phoneSearch}
              onChange={(e) => setPhoneSearch(e.target.value)}
              type="tel"
              placeholder="Phone Number"
              className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-foreground">Date Range</label>
            <RangeSelect
              value={innerRange}
              options={DATE_RANGE_OPTIONS}
              onChange={setInnerRange}
              showCalendarIcon={false}
              className="w-full"
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="mt-2 h-10 w-full rounded-md bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Search
          </button>
        </div>
      </div>

      {hasResults ? (
        <div className="rounded-[10px] border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Message Logs</h2>
            <button
              type="button"
              onClick={() => toast.success('Exporting message logs')}
              className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground transition-colors hover:bg-accent"
            >
              Export Now
            </button>
          </div>
          <ReportTable<MessageLogRow, keyof MessageLogRow>
            columns={columns}
            rows={smsHistoryLogs}
            renderCell={(row, key) => row[key]}
            className="rounded-none border-0 border-t border-border -mx-5 mt-2"
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
