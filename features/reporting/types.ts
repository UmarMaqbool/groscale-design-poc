export type ReportTab = 'package-details' | 'performance' | 'volume' | 'status' | 'rate-calls'

export interface PackageDetailsRow {
  id: string
  name: string
  routeName: string
  address: string
  deliveryStatus: number | string
  distributeLocation: number | string
  shipper: number | string
  deliveryPartner: number | string
}

export interface PerformanceRow {
  id: string
  pkgsTenderedNew: number
  pkgsTenderedOld: number
  pkgsTenderedTotal: number
  missingAtOldScan: number
  delivered: number
  failedDeliveryPendingCs: number
  failed: number
}

export interface RateCallsRow {
  id: string
  createDate: string
  carrier: string
  rateCalls: number
  packages: number
  packagesFromRate: number // 0–100
}

export type DeliveryStatusKey = 'select-all' | 'delivered' | 'pending' | 'in-transit' | 'failed-process' | 'failed-delivery'

export interface PackageDetailsFilterState {
  deliveryStatus: Set<DeliveryStatusKey>
  deliveryPartner: string
  customerType: string
  routeName: string
  distributionLocation: string
  shipper: string
}

export interface PerformanceFilterState {
  shippers: string
  deliveryPartner: string
  deliveryDate: string
}

export interface RateCallsFilterState {
  shippers: string
  carriers: string
}

export interface ReportColumn<K extends string = string> {
  key: K
  label: string
  width?: number
  align?: 'left' | 'right'
}
