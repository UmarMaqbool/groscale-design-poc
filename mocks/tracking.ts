import type { Shipment } from '@/features/tracking/types'

const longBeachRoute = [
  { lat: 33.7701, lng: -118.1937 }, // Long Beach (pickup)
  { lat: 33.7842, lng: -118.1654 },
  { lat: 33.8003, lng: -118.1488 },
  { lat: 33.8156, lng: -118.1322 }, // mid
  { lat: 33.8312, lng: -118.115 },
  { lat: 33.847, lng: -118.0975 },
  { lat: 33.8625, lng: -118.085 }, // dropoff (Lakewood)
]

export const trackingShipments: Shipment[] = [
  {
    id: '123412313801',
    orderNumber: '123412313801',
    packageId: '#2281012310',
    status: 'scheduled',
    deliveryDate: 'Saturday, April 12, 2025',
    deliveryTime: '12:56 PM',
    confirmation: '#1173',
    pickupLabel: 'Long Beach Distribution Center',
    dropoffLabel: 'Lakewood, CA',
    pickup: longBeachRoute[0],
    dropoff: longBeachRoute[longBeachRoute.length - 1],
    driver: longBeachRoute[0],
    route: longBeachRoute,
    timeline: [
      { key: 'scheduled', label: 'Scheduled', date: 'Apr 12 at 12:56 PM' },
      { key: 'out_for_delivery', label: 'Out for Delivery', date: 'Apr 12 at 9:30 AM' },
      { key: 'delivered', label: 'Delivered', date: 'Apr 12 at 9:30 AM' },
      { key: 'unsuccessful', label: 'Unsuccessful Delivery', date: 'Apr 12 at 9:30 AM' },
    ],
  },
  {
    id: '987865432101',
    orderNumber: '987865432101',
    packageId: '#3391023421',
    status: 'out_for_delivery',
    deliveryDate: 'Saturday, April 12, 2025',
    deliveryTime: '2:15 PM',
    confirmation: '#1184',
    pickupLabel: 'Long Beach Distribution Center',
    dropoffLabel: 'Signal Hill, CA',
    pickup: longBeachRoute[0],
    dropoff: { lat: 33.804, lng: -118.1675 },
    driver: longBeachRoute[2],
    route: [longBeachRoute[0], longBeachRoute[1], longBeachRoute[2], { lat: 33.804, lng: -118.1675 }],
    timeline: [
      { key: 'scheduled', label: 'Scheduled', date: 'Apr 12 at 12:56 PM' },
      { key: 'out_for_delivery', label: 'Out for Delivery', date: 'Apr 12 at 9:30 AM' },
      { key: 'delivered', label: 'Delivered', date: 'Apr 12 at 9:30 AM' },
      { key: 'unsuccessful', label: 'Unsuccessful Delivery', date: 'Apr 12 at 9:30 AM' },
    ],
  },
  {
    id: '556677889900',
    orderNumber: '556677889900',
    packageId: '#4421334512',
    status: 'delivered',
    deliveryDate: 'Saturday, April 12, 2025',
    deliveryTime: '11:42 AM',
    confirmation: '#1167',
    pickupLabel: 'Long Beach Distribution Center',
    dropoffLabel: 'Paramount, CA',
    pickup: longBeachRoute[0],
    dropoff: { lat: 33.8895, lng: -118.1597 },
    driver: { lat: 33.8895, lng: -118.1597 },
    route: [longBeachRoute[0], longBeachRoute[2], longBeachRoute[4], { lat: 33.8895, lng: -118.1597 }],
    timeline: [
      { key: 'scheduled', label: 'Scheduled', date: 'Apr 12 at 12:56 PM' },
      { key: 'out_for_delivery', label: 'Out for Delivery', date: 'Apr 12 at 9:30 AM' },
      { key: 'delivered', label: 'Delivered', date: 'Apr 12 at 11:42 AM' },
      { key: 'unsuccessful', label: 'Unsuccessful Delivery', date: 'Apr 12 at 9:30 AM' },
    ],
  },
  {
    id: '112233445566',
    orderNumber: '112233445566',
    packageId: '#5512445623',
    status: 'unsuccessful',
    deliveryDate: 'Saturday, April 12, 2025',
    deliveryTime: '4:28 PM',
    confirmation: '#1191',
    reason: 'Recipient was not available at the address. Driver waited 5 minutes before leaving.',
    pickupLabel: 'Long Beach Distribution Center',
    dropoffLabel: 'Bellflower, CA',
    pickup: longBeachRoute[0],
    dropoff: { lat: 33.8817, lng: -118.117 },
    driver: { lat: 33.8817, lng: -118.117 },
    route: [longBeachRoute[0], longBeachRoute[3], longBeachRoute[5], { lat: 33.8817, lng: -118.117 }],
    timeline: [
      { key: 'scheduled', label: 'Scheduled', date: 'Apr 12 at 12:56 PM' },
      { key: 'out_for_delivery', label: 'Out for Delivery', date: 'Apr 12 at 9:30 AM' },
      { key: 'delivered', label: 'Delivered', date: 'Apr 12 at 9:30 AM' },
      { key: 'unsuccessful', label: 'Unsuccessful Delivery', date: 'Apr 12 at 4:28 PM' },
    ],
  },
]

export function findShipment(id: string): Shipment | undefined {
  return trackingShipments.find((s) => s.id === id || s.orderNumber === id)
}
