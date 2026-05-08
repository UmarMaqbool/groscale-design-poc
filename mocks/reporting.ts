import type {
  PackageDetailsRow,
  PerformanceRow,
  RateCallsRow,
  ReportColumn,
} from '@/features/reporting/types'

// ─── Package Details ──────────────────────────────────────────────────────

const ROUTE_OPTIONS = [
  'Transport logic',
  'Last mile pro...',
  'AMG palm ...',
  'ACE - 002',
]
const ADDRESS_OPTIONS = [
  '652, WINDSWEPT...',
  '1234 N PALO',
  '1607 SAMS CYN',
  '15 HEARTWOOD WAY',
  '1760 E MOUNTAIN',
  '2710 KELVIN AVE',
  '325 KEMPTON',
  '747 DEL RIEGO',
  '747 DEL RIEGO',
]

export const packageDetailsRows: PackageDetailsRow[] = ADDRESS_OPTIONS.map((address, i) => ({
  id: `pd-${i}`,
  name: '10/08/2025',
  routeName: ROUTE_OPTIONS[i % ROUTE_OPTIONS.length],
  address,
  deliveryStatus: '3,987',
  distributeLocation: '2,765',
  shipper: '2,987',
  deliveryPartner: '1,098',
}))

export const packageDetailsColumns: ReportColumn<keyof PackageDetailsRow>[] = [
  { key: 'name', label: 'Name', width: 140 },
  { key: 'routeName', label: 'Route name', width: 160 },
  { key: 'address', label: 'Address', width: 200 },
  { key: 'deliveryStatus', label: 'Delivery status', width: 140 },
  { key: 'distributeLocation', label: 'Distribute location', width: 160 },
  { key: 'shipper', label: 'Shipper', width: 140 },
  { key: 'deliveryPartner', label: 'Delivery partner', width: 140 },
]

// ─── Performance / Volume / Status (shared columns, empty by default) ─────

export const performanceRows: PerformanceRow[] = Array.from({ length: 5 }, (_, i) => ({
  id: `perf-${i}`,
  pkgsTenderedNew: 0,
  pkgsTenderedOld: 0,
  pkgsTenderedTotal: 0,
  missingAtOldScan: 0,
  delivered: 0,
  failedDeliveryPendingCs: 0,
  failed: 0,
}))

export const performanceColumns: ReportColumn<keyof PerformanceRow>[] = [
  { key: 'pkgsTenderedNew', label: 'Pkgs tendered new', width: 160 },
  { key: 'pkgsTenderedOld', label: 'Pkgs tendered old', width: 160 },
  { key: 'pkgsTenderedTotal', label: 'Pkgs tendered total', width: 160 },
  { key: 'missingAtOldScan', label: 'Missing at old scan', width: 160 },
  { key: 'delivered', label: 'Delivered', width: 120 },
  { key: 'failedDeliveryPendingCs', label: 'Failed Delivery: Pendind Cs', width: 200 },
  { key: 'failed', label: 'Failed', width: 100 },
]

// ─── Rate Calls ───────────────────────────────────────────────────────────

const RATE_PACKAGE_VALUES = [2272, 3515, 2645, 2539, 2023, 2676, 3978]

export const rateCallsRows: RateCallsRow[] = RATE_PACKAGE_VALUES.map((pkgs, i) => ({
  id: `rc-${i}`,
  createDate: '10/12/2025',
  carrier: 'gori-lms',
  rateCalls: i === 0 ? 1 : 0,
  packages: pkgs,
  packagesFromRate: i === 0 ? 100 : 0,
}))

export const rateCallsColumns: ReportColumn<keyof RateCallsRow>[] = [
  { key: 'createDate', label: 'Create date', width: 160 },
  { key: 'carrier', label: 'Carrier', width: 180 },
  { key: 'rateCalls', label: 'Rate calls', width: 140 },
  { key: 'packages', label: 'Packages', width: 140 },
  { key: 'packagesFromRate', label: '% of packages from rate ...', width: 200 },
]

// ─── Filter dropdown options ──────────────────────────────────────────────

export const SHIPPER_OPTIONS = ['Acme Shipper', 'Globex', 'Northwind', 'Initech']
export const DELIVERY_PARTNER_OPTIONS = ['DHL', 'FedEx', 'UPS', 'gori-lms']
export const CARRIER_OPTIONS = ['DHL', 'Gori/UniUni', 'FedEx', 'UPS', 'USPS']
export const CUSTOMER_TYPE_OPTIONS = ['Retail', 'Wholesale', 'Direct']
export const ROUTE_NAME_OPTIONS = ['Transport logic', 'Last mile pro', 'AMG palm', 'ACE - 002']
export const DISTRIBUTION_LOCATION_OPTIONS = ['Long Beach', 'Los Angeles', 'Lakewood', 'Bellflower']
