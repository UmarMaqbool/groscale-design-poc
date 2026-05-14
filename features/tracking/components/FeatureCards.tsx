import { Clock, MapPin, ClipboardList } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  subtitle: string
}

const FEATURES: Feature[] = [
  { icon: Clock, title: 'Real-time Updates', subtitle: 'Live tracking status' },
  { icon: MapPin, title: 'Location Tracking', subtitle: 'See delivery progress' },
  { icon: ClipboardList, title: 'Delivery Details', subtitle: 'Complete information' },
]

export function FeatureCards() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full gap-4">
        <FeatureRow feature={FEATURES[0]} />
        <FeatureRow feature={FEATURES[1]} />
      </div>
      <FeatureRow feature={FEATURES[2]} />
    </div>
  )
}

function FeatureRow({ feature }: { feature: Feature }) {
  const { icon: Icon, title, subtitle } = feature
  return (
    <div className="flex flex-1 items-center gap-4 rounded-xl border border-gray-300 bg-card px-4 py-3 shadow-xs">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary shadow-xs">
        <Icon className="size-5 text-primary-foreground" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold leading-tight text-foreground">{title}</p>
        <p className="text-xs leading-3 text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}
