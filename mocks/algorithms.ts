import type {
  AlgorithmKpi,
  AllocationRow,
  OrderOutputRow,
} from '@/features/algorithms/types'
import type { ReportColumn } from '@/features/reporting/types'

// ─── Algorithm Results ────────────────────────────────────────────────────

export const algorithmResultsKpis: AlgorithmKpi[] = [
  { key: 'date-created', label: 'Date created', value: '17/10/25' },
  { key: 'model-accuracy', label: 'Model accuracy', value: '100%' },
  { key: 'allergy-orders-accuracy', label: 'Allergy orders accuracy', value: '100%' },
  { key: 'total-orders', label: 'Total orders', value: '275' },
  { key: 'orders-with-allergies', label: 'Orders with allergies', value: '275' },
  {
    key: 'customers-multi-repeats',
    label: 'Number of customers with > 4 meal component repeats',
    value: '275',
  },
  { key: 'time-taken', label: 'Time taken', value: '0.962 seconds' },
]

// ─── Algorithm Input ──────────────────────────────────────────────────────

export const algorithmInputKpis: AlgorithmKpi[] = [
  { key: 'date-range', label: 'Date Range', value: '17/10/25 - 17/10/25' },
  { key: 'max-repetition', label: 'Max meal repetition', value: '4' },
  { key: 'meals-per-package', label: 'Meals per package', value: '14' },
  { key: 'inventory-strategy', label: 'Inventory strategy', value: 'Even distribution' },
]

// ─── Allocations ──────────────────────────────────────────────────────────

const MEAL_COMPONENTS = [
  'Mac & cheese',
  'Vegetable pot pie',
  'Black bean vege...',
  'Pad thai',
  'Vegetable lasagna',
  'Indian mattar paneer',
  'Cheese enchilada',
]

export const allocationRows: AllocationRow[] = MEAL_COMPONENTS.map((mc, i) => ({
  id: `alloc-${i}`,
  mealComponent: mc,
  weightageInput: '0.00%',
  weightageResult: '11.11%',
  weightageCustom: '0.00%',
  inventoryUsed: '100',
  inventoryRemaining: '0',
}))

export const allocationColumns: ReportColumn<keyof AllocationRow>[] = [
  { key: 'mealComponent', label: 'Meal component', width: 200 },
  { key: 'weightageInput', label: 'Weightage input', width: 160 },
  { key: 'weightageResult', label: 'Weightage result', width: 170 },
  { key: 'weightageCustom', label: 'Weightage in custom...', width: 200 },
  { key: 'inventoryUsed', label: 'Inventory Used', width: 150 },
  { key: 'inventoryRemaining', label: 'Inventory Remaining', width: 180 },
]

// ─── Order Output ─────────────────────────────────────────────────────────

export const orderOutputRows: OrderOutputRow[] = MEAL_COMPONENTS.slice(0, 4).map((mc, i) => ({
  id: `out-${i}`,
  shipmentId: mc,
  deliveryDate: '0.00%',
  carrierId: '11.11%',
  packageId: '0.00%',
  product: '100',
  customerId: '0',
  customerName: '0',
  excludedMeals: '0',
}))

export const orderOutputColumns: ReportColumn<keyof OrderOutputRow>[] = [
  { key: 'shipmentId', label: 'Shipment ID', width: 150 },
  { key: 'deliveryDate', label: 'Delivery date', width: 130 },
  { key: 'carrierId', label: 'Carrier ID', width: 120 },
  { key: 'packageId', label: 'Package ID', width: 130 },
  { key: 'product', label: 'Product...', width: 130 },
  { key: 'customerId', label: 'Customer ID', width: 130 },
  { key: 'customerName', label: 'Customer name', width: 150 },
  { key: 'excludedMeals', label: 'Excluded meals', width: 150 },
]

// ─── Form dropdown options ────────────────────────────────────────────────

export const FILE_DROP_DATES = ['17/10/25', '18/10/25', '19/10/25', '20/10/25', '21/10/25']
export const MAX_REPETITION_OPTIONS = ['2', '3', '4', '5', '6', '8']
export const MEALS_PER_PACKAGE_OPTIONS = ['7', '10', '12', '14', '16', '20']
