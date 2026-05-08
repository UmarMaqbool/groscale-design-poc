'use client'

import { AppShell } from '@/components/app/AppShell'
import {
  CommunicationProvider,
  CommunicationHeader,
  SmsDashboard,
  WeeklyReporting,
  SmsHistory,
  InboundMessages,
  useCommunication,
} from '@/features/communication'

function CommunicationBody() {
  const { activeTab } = useCommunication()
  return (
    <div className="flex flex-col gap-5 pb-10">
      <CommunicationHeader />
      {activeTab === 'sms-dashboard' && <SmsDashboard />}
      {activeTab === 'weekly-reporting' && <WeeklyReporting />}
      {activeTab === 'sms-history' && <SmsHistory />}
      {activeTab === 'inbound-messages' && <InboundMessages />}
    </div>
  )
}

export default function CommunicationPage() {
  return (
    <CommunicationProvider>
      <AppShell>
        <CommunicationBody />
      </AppShell>
    </CommunicationProvider>
  )
}
