export type TrackingStatus =
  | 'scheduled'
  | 'out_for_delivery'
  | 'delivered'
  | 'unsuccessful'

export type TimelineStepKey =
  | 'scheduled'
  | 'out_for_delivery'
  | 'delivered'
  | 'unsuccessful'

export interface TimelineStep {
  key: TimelineStepKey
  label: string
  date: string
}

export interface LatLng {
  lat: number
  lng: number
}

export interface Shipment {
  id: string
  orderNumber: string
  packageId: string
  status: TrackingStatus
  deliveryDate: string
  deliveryTime: string
  confirmation: string
  reason?: string
  pickup: LatLng
  dropoff: LatLng
  driver: LatLng
  route: LatLng[]
  pickupLabel: string
  dropoffLabel: string
  timeline: TimelineStep[]
}
