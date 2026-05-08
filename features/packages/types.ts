export type PackageStatus =
  | 'in_transit'
  | 'delivered'
  | 'pending'
  | 'delayed'
  | 'out_for_delivery'

export type Package = {
  id: string
  shipper: string
  deliveryDate: string
  packageId: string
  shipmentId: string
  carrierGroup: string
  company: string
  contact: string
  stopNumber: number
  address1: string
  address2: string
  status: PackageStatus
}

export type PackageColumnKey =
  | 'shipper'
  | 'deliveryDate'
  | 'packageId'
  | 'shipmentId'
  | 'carrierGroup'
  | 'company'
  | 'contact'
  | 'stopNumber'
  | 'address1'
  | 'address2'

export type PackageColumn = {
  key: PackageColumnKey
  label: string
  width: number
}

export type PackagesAdvancedFilters = {
  deliveryFrom: Date | undefined
  deliveryTo: Date | undefined
  shipFrom: Date | undefined
  shipTo: Date | undefined
  shipperIds: string[]
  carrierIds: string[]
  locationIds: string[]
}
