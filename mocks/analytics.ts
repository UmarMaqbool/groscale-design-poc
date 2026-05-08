export type IconKey = 'package' | 'check' | 'clock' | 'alert' | 'truck'

export interface AnalyticsKpi {
  key: string
  label: string
  value: string
  icon: IconKey
  delta: string
  deltaDir: 'up' | 'down'
  /** Whether this delta is *good* news. Drives pill color. */
  deltaTone: 'success' | 'destructive'
  sub: string
  sparkline: number[]
  sparkTone?: 'primary' | 'destructive'
}

export const analyticsKpis: AnalyticsKpi[] = [
  {
    key: 'total',
    label: 'Total packages',
    value: '24,580',
    icon: 'package',
    delta: '12.4%',
    deltaDir: 'up',
    deltaTone: 'success',
    sub: 'vs prev period',
    sparkline: [3210, 3680, 4220, 4150, 4720, 5180, 4860],
  },
  {
    key: 'on_time',
    label: 'On-time rate',
    value: '94.7%',
    icon: 'check',
    delta: '2.1pt',
    deltaDir: 'up',
    deltaTone: 'success',
    sub: 'goal · 95%',
    sparkline: [91, 92, 92.4, 93.1, 93.8, 94.2, 94.7],
  },
  {
    key: 'transit',
    label: 'Avg transit time',
    value: '1.42d',
    icon: 'clock',
    delta: '0.18d',
    deltaDir: 'down',
    deltaTone: 'success',
    sub: 'faster than last week',
    sparkline: [1.7, 1.62, 1.58, 1.55, 1.5, 1.45, 1.42],
  },
  {
    key: 'failed',
    label: 'Failed delivery',
    value: '312',
    icon: 'alert',
    delta: '3.2%',
    deltaDir: 'down',
    deltaTone: 'success',
    sub: 'of total volume',
    sparkline: [420, 400, 380, 360, 340, 330, 312],
    sparkTone: 'destructive',
  },
  {
    key: 'routes',
    label: 'Active routes',
    value: '84',
    icon: 'truck',
    delta: '6 new',
    deltaDir: 'up',
    deltaTone: 'success',
    sub: 'across 6 cities',
    sparkline: [72, 74, 76, 78, 80, 82, 84],
  },
]

export type VolumeTab = 'week' | 'month'

export interface VolumePoint {
  label: string
  current: number
  previous?: number
}

export const volumeWeek: VolumePoint[] = [
  { label: 'Mon', current: 3210, previous: 2980 },
  { label: 'Tue', current: 3680, previous: 3300 },
  { label: 'Wed', current: 4220, previous: 3870 },
  { label: 'Thu', current: 4150, previous: 3920 },
  { label: 'Fri', current: 4720, previous: 4180 },
  { label: 'Sat', current: 5180, previous: 4510 },
  { label: 'Sun', current: 4860, previous: 4290 },
]

export const volumeMonth: VolumePoint[] = [
  3010, 3220, 3380, 3110, 3450, 3700, 3540, 3800, 3950, 4120, 4040, 4300, 4180, 4520, 4610, 4480,
  4720, 4850, 4710, 4980, 5110, 5040, 5230, 5180, 5320, 5410, 5260, 5380, 5520, 5680,
].map((v, i) => ({ label: `${i + 1}`, current: v }))

export type SliceTone = 'primary-700' | 'primary' | 'primary-300' | 'amber' | 'gray'

export interface FailureSlice {
  reason: string
  value: number
  tone: SliceTone
}

export const failureMix: FailureSlice[] = [
  { reason: 'Address issue', value: 14, tone: 'primary' },
  { reason: 'Pending pickup', value: 9, tone: 'primary-700' },
  { reason: 'Redeliver', value: 6, tone: 'primary-300' },
  { reason: 'Damaged', value: 3, tone: 'amber' },
  { reason: 'Other', value: 2, tone: 'gray' },
]

export interface RegionRow {
  name: string
  packages: number
  successPct: number
  change: string
}

export const regions: RegionRow[] = [
  { name: 'São Paulo, BR', packages: 12480, successPct: 96.4, change: '+8.2%' },
  { name: 'Mexico City, MX', packages: 9340, successPct: 94.1, change: '+5.7%' },
  { name: 'Bogotá, CO', packages: 7110, successPct: 92.8, change: '+3.1%' },
  { name: 'Buenos Aires, AR', packages: 5980, successPct: 91.5, change: '+2.4%' },
  { name: 'Lima, PE', packages: 4720, successPct: 89.7, change: '-1.1%' },
  { name: 'Santiago, CL', packages: 3850, successPct: 88.4, change: '+0.6%' },
]

export interface FunnelStage {
  label: string
  value: number
  pct: number
  /** Lighter ramp from darkest at top to lightest at bottom. */
  shade: 700 | 600 | 500 | 400 | 200
}

export const funnel: FunnelStage[] = [
  { label: 'Created', value: 24580, pct: 100, shade: 700 },
  { label: 'Picked up', value: 23910, pct: 97.3, shade: 600 },
  { label: 'In transit', value: 22640, pct: 92.1, shade: 500 },
  { label: 'Out for delivery', value: 21080, pct: 85.8, shade: 400 },
  { label: 'Delivered', value: 19410, pct: 79.0, shade: 200 },
]

/** 7 rows (Sun..Sat) × 24 hours, value = package count. */
export const heatmap: number[][] = (() => {
  const out: number[][] = []
  for (let d = 0; d < 7; d++) {
    const row: number[] = []
    for (let h = 0; h < 24; h++) {
      const wkBoost = d >= 1 && d <= 5 ? 1 : 0.5
      const peak1 = Math.exp(-Math.pow((h - 10) / 2.4, 2))
      const peak2 = Math.exp(-Math.pow((h - 16) / 2.6, 2))
      const base = (peak1 * 0.9 + peak2 * 1.0) * wkBoost
      row.push(Math.max(0, Math.round(base * 200 + Math.sin(d * 7 + h) * 20)))
    }
    out.push(row)
  }
  return out
})()

export type FeedTone = 'success' | 'warning' | 'destructive'

export interface FeedItem {
  id: string
  tone: FeedTone
  icon: 'check' | 'alert' | 'truck' | 'sparkle'
  /** Plain text with optional bold parts. */
  parts: Array<{ text: string; bold?: boolean }>
  meta: string
}

export const activityFeed: FeedItem[] = [
  {
    id: '1',
    tone: 'success',
    icon: 'check',
    parts: [
      { text: 'SP-NORTE-04', bold: true },
      { text: ' route hit 99.1% delivery rate — best this month.' },
    ],
    meta: '12 minutes ago',
  },
  {
    id: '2',
    tone: 'warning',
    icon: 'alert',
    parts: [
      { text: 'Address-mismatch', bold: true },
      { text: ' spiked +18% in ' },
      { text: 'Mexico City', bold: true },
      { text: ' Zone 3.' },
    ],
    meta: '48 minutes ago',
  },
  {
    id: '3',
    tone: 'success',
    icon: 'truck',
    parts: [
      { text: 'Avg in-transit time dropped to ' },
      { text: '1.42d', bold: true },
      { text: ' across LATAM.' },
    ],
    meta: '2 hours ago',
  },
  {
    id: '4',
    tone: 'destructive',
    icon: 'alert',
    parts: [
      { text: '14 packages flagged ' },
      { text: 'missing', bold: true },
      { text: ' in Bogotá hub overnight.' },
    ],
    meta: '5 hours ago',
  },
  {
    id: '5',
    tone: 'success',
    icon: 'sparkle',
    parts: [
      { text: 'Algorithm ' },
      { text: 'auto-rerouted', bold: true },
      { text: ' 312 packages through SCL warehouse.' },
    ],
    meta: '8 hours ago',
  },
]
