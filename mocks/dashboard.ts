export type KpiTrend = {
  delta: number
  positive: boolean
}

export interface DashboardKpi {
  key: string
  label: string
  value: string
  icon: 'box' | 'truck' | 'check' | 'x' | 'alert'
  trend: KpiTrend
}

export const dashboardKpis: DashboardKpi[] = [
  { key: 'total', label: 'Total', value: '6789', icon: 'box', trend: { delta: 1.2, positive: true } },
  { key: 'delivered', label: 'Delivered', value: '2345', icon: 'truck', trend: { delta: 2.5, positive: true } },
  { key: 'in_transit', label: 'In Transit', value: '986', icon: 'check', trend: { delta: 3.7, positive: true } },
  { key: 'failed', label: 'Failed Delivery', value: '34', icon: 'x', trend: { delta: 0.8, positive: true } },
  { key: 'missing', label: 'Missing', value: '2', icon: 'alert', trend: { delta: 0.0, positive: false } },
]

export interface DailyPackagePoint {
  date: string
  current: number
  previous: number
}

export const dailyPackageData: DailyPackagePoint[] = [
  { date: '2024-03-15', current: 4200, previous: 1300 },
  { date: '2024-03-16', current: 1100, previous: 900 },
  { date: '2024-03-17', current: 5400, previous: 2200 },
  { date: '2024-03-18', current: 2900, previous: 1800 },
  { date: '2024-03-19', current: 4500, previous: 2400 },
  { date: '2024-03-20', current: 3100, previous: 1500 },
  { date: '2024-03-21', current: 2200, previous: 1100 },
]

export interface FailureBreakdown {
  reason: string
  value: number
}

/**
 * Slice colors come from shadcn `--chart-1..5` CSS tokens, applied by index
 * in the chart component. Light mode = multi-color palette (mint/brand/
 * gray/peach/salmon). Dark mode = monochromatic green shades.
 */
export const failureBreakdown: FailureBreakdown[] = [
  { reason: 'No reason', value: 24 },
  { reason: 'Pending', value: 18 },
  { reason: 'Redeliver', value: 22 },
  { reason: 'Missing', value: 16 },
  { reason: 'Error', value: 20 },
]

export const dailyTableDates = ['10/12', '10/13', '10/14', '10/15', '10/16', '10/18', '10/19']

export interface DailyPackageTableRow {
  id: string
  name: string
  values: Record<string, number>
  total: number
}

export const dailyPackageTableRows: DailyPackageTableRow[] = [
  {
    id: '1',
    name: 'Package Count',
    values: { '10/12': 3628, '10/13': 5987, '10/14': 3987, '10/15': 2765, '10/16': 2987, '10/18': 1098, '10/19': 1098 },
    total: 20568,
  },
  {
    id: '2',
    name: 'Delivered',
    values: { '10/12': 3210, '10/13': 5410, '10/14': 3650, '10/15': 2480, '10/16': 2710, '10/18': 980, '10/19': 1010 },
    total: 19450,
  },
  {
    id: '3',
    name: 'In Transit',
    values: { '10/12': 280, '10/13': 410, '10/14': 250, '10/15': 200, '10/16': 190, '10/18': 80, '10/19': 60 },
    total: 1470,
  },
  {
    id: '4',
    name: 'Failed Delivery',
    values: { '10/12': 98, '10/13': 110, '10/14': 60, '10/15': 65, '10/16': 70, '10/18': 28, '10/19': 22 },
    total: 453,
  },
  {
    id: '5',
    name: 'Missing',
    values: { '10/12': 40, '10/13': 57, '10/14': 27, '10/15': 20, '10/16': 17, '10/18': 10, '10/19': 6 },
    total: 177,
  },
]
