import type {
  CommunicationKpi,
  MessageLogRow,
  ResponseDistributionPoint,
  VendorRatingPoint,
  WeeklySummaryRow,
} from '@/features/communication/types'

// ─── SMS Dashboard ────────────────────────────────────────────────────────

export const outboundKpis: CommunicationKpi[] = [
  { key: 'total-sent', label: 'Total Sent', value: '12,464', icon: 'send' },
  {
    key: 'success-sent',
    label: 'Successfully Sent',
    value: '12,136',
    icon: 'check-circle',
    trend: { value: '40%', direction: 'up' },
  },
  {
    key: 'failed',
    label: 'Failed',
    value: '328',
    icon: 'flag',
    trend: { value: '2.63%', direction: 'down' },
  },
  { key: 'tracking-clicks', label: 'Tracking Clicks', value: '0', icon: 'mouse-pointer' },
]

export const inboundKpis: CommunicationKpi[] = [
  {
    key: 'total-responses',
    label: 'Total Responses',
    value: '269',
    icon: 'message',
    trend: { value: '0.00%', direction: 'flat' },
  },
  {
    key: 'stop-optout',
    label: 'STOP/Opt-out',
    value: '03',
    icon: 'block',
    trend: { value: '1,125', direction: 'up' },
  },
  {
    key: 'opt-in',
    label: 'Opt-In',
    value: '02',
    icon: 'login',
    trend: { value: '0.74', direction: 'down' },
  },
  {
    key: 'help',
    label: 'Help',
    value: '46',
    icon: 'help',
    trend: { value: '17.10%', direction: 'up' },
  },
]

export const vendorRatingData: VendorRatingPoint[] = [
  { date: 'Oct 15', delivered: 88, failed: 12 },
  { date: 'Oct 16', delivered: 60, failed: 40 },
  { date: 'Oct 17', delivered: 86, failed: 14 },
  { date: 'Oct 18', delivered: 48, failed: 52 },
  { date: 'Oct 19', delivered: 84, failed: 16 },
  { date: 'Oct 20', delivered: 92, failed: 8 },
  { date: 'Oct 20', delivered: 90, failed: 10 },
]

export const responseDistribution: ResponseDistributionPoint[] = [
  { category: 'STOP/Opt-Out', value: 165 },
  { category: 'Opt-In', value: 25 },
  { category: 'Help', value: 105 },
  { category: 'Other', value: 18 },
]

// ─── Weekly Reporting ─────────────────────────────────────────────────────

export const weeklySummary: WeeklySummaryRow[] = [
  {
    id: 'wk-1',
    week: 'Oct 20 - Oct 26',
    sent: '9,112',
    delivered: '8,901',
    deliveryRate: '97.7%',
    failed: '211',
    replies: '144',
    stop: '01',
    help: '07',
    optIn: '01',
    other: '135',
    replyRate: '1.6%',
  },
  {
    id: 'wk-2',
    week: 'Oct 13 - Oct 19',
    sent: '12,989',
    delivered: '12,622',
    deliveryRate: '97.2%',
    failed: '367',
    replies: '277',
    stop: '05',
    help: '40',
    optIn: '03',
    other: '229',
    replyRate: '2.1%',
  },
  {
    id: 'wk-3',
    week: 'Oct 6 - Oct 12',
    sent: '13,743',
    delivered: '13,315',
    deliveryRate: '96.9%',
    failed: '428',
    replies: '340',
    stop: '12',
    help: '50',
    optIn: '04',
    other: '268',
    replyRate: '2.5%',
  },
  {
    id: 'wk-4',
    week: 'Sep 29 - Oct 5',
    sent: '15,347',
    delivered: '14,851',
    deliveryRate: '96.8%',
    failed: '496',
    replies: '379',
    stop: '05',
    help: '64',
    optIn: '02',
    other: '308',
    replyRate: '2.5%',
  },
]

// ─── SMS History ──────────────────────────────────────────────────────────

export const smsHistoryLogs: MessageLogRow[] = [
  {
    id: 'sms-h-1',
    dateSent: 'Oct 22, 2025',
    time: '12:48 AM',
    from: '+12093549478',
    to: '+18889707210',
    body: 'Help',
    status: 'Received',
  },
  {
    id: 'sms-h-2',
    dateSent: 'Sep 29, 2025',
    time: '8:25 PM',
    from: '+18889707210',
    to: '+12093549478',
    body: 'Project Food Box: Your delivery is scheduled for 9/30/25. Click to track your order. https://projectfoodbox.short.gy/track?t=su3569611',
    status: 'Delivered',
  },
  {
    id: 'sms-h-3',
    dateSent: 'Sep 25, 2025',
    time: '10:13 PM',
    from: '+18889707210',
    to: '+12093549478',
    body: "Project Food Box: You've opted-in for notifications on the status of your deliveries. Msg & data rates may apply. Reply STOP to stop or HELP for more info.",
    status: 'Delivered',
  },
]

// ─── Inbound Messages ─────────────────────────────────────────────────────

export const inboundMessages: MessageLogRow[] = [
  {
    id: 'in-1',
    dateSent: 'Oct 23, 2025',
    time: '9:37 PM',
    from: '+16613705990',
    to: '+18889707210',
    body: 'Thank you Food Box. I received mine yesterday, God bless!',
    status: 'Received',
  },
  {
    id: 'in-2',
    dateSent: 'Sep 29, 2025',
    time: '9:30 PM',
    from: '+16506691497',
    to: '+18889707210',
    body: 'Help',
    status: 'Received',
  },
  {
    id: 'in-3',
    dateSent: 'Sep 25, 2025',
    time: '9:29 PM',
    from: '+14086200402',
    to: '+18889707210',
    body: '8317534209',
    status: 'Received',
  },
  {
    id: 'in-4',
    dateSent: 'Oct 23, 2025',
    time: '9:25 PM',
    from: '+14086200402',
    to: '+18889707210',
    body: 'Yes tenkiu',
    status: 'Received',
  },
  {
    id: 'in-5',
    dateSent: 'Oct 23, 2025',
    time: '9:02 PM',
    from: '+14086777588',
    to: '+18889707210',
    body: 'Thank you for these boxes of food, are very needed. Thank you.',
    status: 'Received',
  },
  {
    id: 'in-6',
    dateSent: 'Oct 23, 2025',
    time: '8:59 PM',
    from: '+12092701913',
    to: '+18889707210',
    body: 'Gracias',
    status: 'Received',
  },
]

// ─── Filter dropdown options ──────────────────────────────────────────────

export const DATE_RANGE_OPTIONS = [
  'Past 7 Days',
  'Past 14 Days',
  'Past 30 Days',
  'Past 90 Days',
  'This Year',
] as const

export const WEEKLY_RANGE_OPTIONS = ['4 Weeks', '8 Weeks', '12 Weeks', '24 Weeks'] as const

export const ROW_FILTER_OPTIONS = ['7 Days', '14 Days', '30 Days', '90 Days'] as const
