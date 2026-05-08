'use client'

import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { DATE_RANGE_OPTIONS, WEEKLY_RANGE_OPTIONS } from '@/mocks/communication'
import { useCommunication } from '../CommunicationContext'
import type { CommunicationTab } from '../types'
import { RangeSelect } from './RangeSelect'

const TABS: Array<{ key: CommunicationTab; label: string }> = [
  { key: 'sms-dashboard', label: 'SMS Dashboard' },
  { key: 'weekly-reporting', label: 'Weekly Reporting' },
  { key: 'sms-history', label: 'SMS History' },
  { key: 'inbound-messages', label: 'Inbound Messages' },
]

export function CommunicationHeader() {
  const {
    activeTab,
    setActiveTab,
    dateRange,
    setDateRange,
    weeklyRange,
    setWeeklyRange,
  } = useCommunication()

  const isWeekly = activeTab === 'weekly-reporting'
  const isLogTab = activeTab === 'sms-history' || activeTab === 'inbound-messages'

  return (
    <div className="flex flex-col gap-5 px-5 pt-5">
      <div>
        <h1 className="text-2xl font-bold leading-tight text-foreground">Communications</h1>
        <p className="mt-2 text-base text-muted-foreground">Manage responses and SMS</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'rounded-md border px-4 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:bg-muted'
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          {isWeekly ? (
            <RangeSelect
              value={weeklyRange}
              options={WEEKLY_RANGE_OPTIONS}
              onChange={setWeeklyRange}
              className="w-[150px]"
            />
          ) : isLogTab ? (
            <RangeSelect
              value=""
              placeholder="Select Dates"
              options={DATE_RANGE_OPTIONS}
              onChange={setDateRange}
              className="w-[170px]"
            />
          ) : (
            <RangeSelect
              value={dateRange}
              options={DATE_RANGE_OPTIONS}
              onChange={setDateRange}
              className="w-[160px]"
            />
          )}
          <button
            type="button"
            onClick={() => toast.success('Filters applied')}
            className="h-10 rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
