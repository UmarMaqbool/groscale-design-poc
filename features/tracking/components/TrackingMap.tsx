'use client'

import dynamic from 'next/dynamic'
import type { TrackingMapViewProps } from './TrackingMapView'

const TrackingMapView = dynamic(
  () => import('./TrackingMapView').then((m) => m.TrackingMapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#e9eef1] text-sm text-muted-foreground">
        Loading map…
      </div>
    ),
  }
)

export function TrackingMap(props: TrackingMapViewProps) {
  return <TrackingMapView {...props} />
}
