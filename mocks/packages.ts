import type { Package, PackageColumn, PackageStatus } from '@/features/packages/types'

const SHIPPERS = ['FedX', 'UPS', 'DHL', 'USPS', 'OnTrac']
const CARRIER_GROUPS = ['Express', 'Ground', 'Standard', 'Priority']
const COMPANIES = ['Acme Corp', 'Tech', 'Globes', 'Northwind', 'Initech', 'Hooli']
const STREETS = [
  '100 Main Street',
  '101 Main Street',
  '102 Main Street',
  '203 Pine Ave',
  '88 Elm Rd',
  '404 Cedar Ln',
]
const CITIES = ['NY', 'LA', 'HY', 'SF', 'TX', 'WA']
const STATUSES: PackageStatus[] = [
  'in_transit',
  'delivered',
  'pending',
  'delayed',
  'out_for_delivery',
]

const pad = (n: number, length = 6) => String(n).padStart(length, '0')

export const MOCK_PACKAGES: Package[] = Array.from({ length: 48 }).map((_, i) => {
  const shipperIdx = i % SHIPPERS.length
  const carrierIdx = i % CARRIER_GROUPS.length
  const companyIdx = i % COMPANIES.length
  const streetIdx = i % STREETS.length
  const cityIdx = i % CITIES.length
  const statusIdx = i % STATUSES.length
  return {
    id: `pkg-${i}`,
    shipper: SHIPPERS[shipperIdx],
    deliveryDate: '2025-09-10',
    packageId: `PKG${pad(100000 + i)}`,
    shipmentId: `SHP${pad(200000 + i * 3)}`,
    carrierGroup: CARRIER_GROUPS[carrierIdx],
    company: COMPANIES[companyIdx],
    contact: `Contact ${(i % 8) + 1}`,
    stopNumber: (i % 9) + 1,
    address1: STREETS[streetIdx],
    address2: CITIES[cityIdx],
    status: STATUSES[statusIdx],
  }
})

export const PACKAGE_COLUMNS: PackageColumn[] = [
  { key: 'shipper', label: 'Shipper', width: 120 },
  { key: 'deliveryDate', label: 'Delivery Date', width: 140 },
  { key: 'packageId', label: 'Package ID', width: 130 },
  { key: 'shipmentId', label: 'Shipment ID', width: 130 },
  { key: 'carrierGroup', label: 'Carrier Groups', width: 140 },
  { key: 'company', label: 'Company', width: 130 },
  { key: 'contact', label: 'Contact', width: 120 },
  { key: 'stopNumber', label: 'Stop Number', width: 130 },
  { key: 'address1', label: 'Address 1', width: 160 },
  { key: 'address2', label: 'Address 2', width: 120 },
]
