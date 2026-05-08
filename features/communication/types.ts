export type CommunicationTab = 'sms-dashboard' | 'weekly-reporting' | 'sms-history' | 'inbound-messages'

export type KpiTrendDirection = 'up' | 'down' | 'flat'

export interface CommunicationKpi {
  key: string
  label: string
  value: string
  icon: 'send' | 'check-circle' | 'flag' | 'mouse-pointer' | 'message' | 'block' | 'login' | 'help'
  trend?: {
    value: string
    direction: KpiTrendDirection
  }
}

export interface VendorRatingPoint {
  date: string
  delivered: number
  failed: number
}

export interface ResponseDistributionPoint {
  category: 'STOP/Opt-Out' | 'Opt-In' | 'Help' | 'Other'
  value: number
}

export interface WeeklySummaryRow {
  id: string
  week: string
  sent: string
  delivered: string
  deliveryRate: string
  failed: string
  replies: string
  stop: string
  help: string
  optIn: string
  other: string
  replyRate: string
}

export interface MessageLogRow {
  id: string
  dateSent: string
  time: string
  from: string
  to: string
  body: string
  status: 'Received' | 'Delivered' | 'Failed'
}
