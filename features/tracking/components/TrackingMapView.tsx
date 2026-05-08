'use client'

import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { MapPin, Package, Truck } from 'lucide-react'
import type { LatLng } from '../types'

// Webpack/Next ships marker images at unknown paths — disable defaults so our
// custom DivIcons are the only markers Leaflet renders.
delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl: '', iconRetinaUrl: '', shadowUrl: '' })

type IconKind = 'pickup' | 'driver' | 'dropoff'

const ICON_BG: Record<IconKind, string> = {
  pickup: '#79b26b',
  driver: '#101828',
  dropoff: '#e7000b',
}

function buildIcon(kind: IconKind): L.DivIcon {
  const Icon = kind === 'driver' ? Truck : kind === 'pickup' ? Package : MapPin
  const html = renderToStaticMarkup(
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg ring-4 ring-white"
      style={{ backgroundColor: ICON_BG[kind] }}
    >
      <Icon className="h-4 w-4" strokeWidth={2.5} />
    </div>
  )
  return L.divIcon({
    html,
    className: 'lms-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

function FitBounds({ points }: { points: LatLng[] }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]))
    map.fitBounds(bounds, { padding: [40, 40] })
  }, [map, points])
  return null
}

export interface TrackingMapViewProps {
  pickup: LatLng
  dropoff: LatLng
  driver: LatLng
  route: LatLng[]
  className?: string
  /** Disable user interaction — used in tiny preview thumbnails */
  interactive?: boolean
  showPolyline?: boolean
}

export function TrackingMapView({
  pickup,
  dropoff,
  driver,
  route,
  className,
  interactive = true,
  showPolyline = true,
}: TrackingMapViewProps) {
  const center: [number, number] = [
    (pickup.lat + dropoff.lat) / 2,
    (pickup.lng + dropoff.lng) / 2,
  ]
  const polylinePositions = useMemo<[number, number][]>(
    () => route.map((p) => [p.lat, p.lng]),
    [route]
  )
  const fitPoints = useMemo(() => [pickup, dropoff, driver, ...route], [pickup, dropoff, driver, route])

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={interactive}
        doubleClickZoom={interactive}
        touchZoom={interactive}
        boxZoom={interactive}
        keyboard={interactive}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {showPolyline && polylinePositions.length > 1 ? (
          <Polyline
            positions={polylinePositions}
            pathOptions={{ color: '#79b26b', weight: 4, opacity: 0.85 }}
          />
        ) : null}
        <Marker position={[pickup.lat, pickup.lng]} icon={buildIcon('pickup')} />
        <Marker position={[dropoff.lat, dropoff.lng]} icon={buildIcon('dropoff')} />
        <Marker position={[driver.lat, driver.lng]} icon={buildIcon('driver')} />
        <FitBounds points={fitPoints} />
      </MapContainer>
    </div>
  )
}
