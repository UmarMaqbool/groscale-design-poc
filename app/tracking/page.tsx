'use client'

import { LmsLogo, TrackingMap, TrackOrderForm, FeatureCards } from '@/features/tracking'
import { trackingShipments } from '@/mocks/tracking'

export default function TrackingLandingPage() {
  // Use the first sample shipment so the map shows real data with markers.
  const sample = trackingShipments[0]

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 lg:flex-row lg:items-stretch">
      {/* Map — desktop only. On mobile the form is the primary action. */}
      <div className="hidden lg:flex lg:h-screen lg:w-1/2 lg:items-center lg:p-8">
        <div className="relative h-full flex-1 overflow-hidden rounded-[24px] border border-border">
          <TrackingMap
            pickup={sample.pickup}
            dropoff={sample.dropoff}
            driver={sample.driver}
            route={sample.route}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Form panel — full width on mobile, half on desktop */}
      <div className="flex w-full flex-col items-center justify-center gap-10 px-5 pb-10 pt-8 lg:h-screen lg:w-1/2 lg:gap-20 lg:py-8 lg:pr-8">
        <LmsLogo />

        <div className="flex w-full max-w-[480px] flex-col gap-8 lg:gap-11">
          <header className="flex flex-col items-center gap-3 text-center lg:gap-4">
            <h1 className="text-2xl font-bold leading-tight text-muted-foreground lg:text-3xl">
              Track Your Order
            </h1>
            <p className="text-sm leading-snug text-foreground lg:text-base">
              Enter your order number to see real-time delivery status
            </p>
          </header>

          <div className="flex flex-col gap-6">
            <TrackOrderForm />

            <div className="flex flex-col items-center gap-4">
              <p className="w-full text-center text-sm font-medium text-foreground lg:text-base">
                Or
              </p>
              <FeatureCards />
            </div>
          </div>

          <footer className="flex flex-col items-center gap-1 text-center text-xs text-foreground lg:text-base">
            <p>© 2025 GroScale Last Mile Solutions. All rights reserved.</p>
            <p>Simplify your shipping with LMS</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
