export type AlgorithmTab = 'results' | 'input' | 'allocations' | 'order-output'

export type InventoryStrategy = 'event-distribution' | 'favor-weights'

export interface AlgorithmFormState {
  fileDropDate: string
  maxRepetitions: string
  mealsPerPackage: string
  inventoryStrategy: InventoryStrategy
}

export interface AlgorithmKpi {
  key: string
  label: string
  value: string
}

export interface AllocationRow {
  id: string
  mealComponent: string
  weightageInput: string
  weightageResult: string
  weightageCustom: string
  inventoryUsed: string
  inventoryRemaining: string
}

export interface OrderOutputRow {
  id: string
  shipmentId: string
  deliveryDate: string
  carrierId: string
  packageId: string
  product: string
  customerId: string
  customerName: string
  excludedMeals: string
}
