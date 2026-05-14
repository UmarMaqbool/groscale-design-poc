'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { LmsLogo, DeliveryTimeline, StatusCard, SupportFooter } from '@/features/tracking'
import { findShipment } from '@/mocks/tracking'

export default function TrackingDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const shipment = id ? findShipment(id) : undefined

  if (!shipment) {
    notFound()
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-stretch bg-gray-50">
      <header className="flex w-full items-center justify-center bg-card p-4 lg:p-5">
        {/* LMS sub-brand uses the darkest end of the brand-green ramp */}
        <LmsLogo colorClassName="bg-primary-900" />
      </header>

      <main className="flex w-full items-start p-4 lg:p-5">
        <div className="mx-auto flex w-full max-w-[1116px] flex-col gap-4 lg:gap-5">
          <div className="flex flex-col gap-3 rounded-[10px] border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-xl font-bold leading-tight text-foreground lg:text-2xl">
              Tracking Details
            </h1>
            <Link
              href="/tracking"
              className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600 sm:self-auto sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:hidden" />
              <span className="sm:hidden">Track another</span>
              <span className="hidden sm:inline">Track Another Package</span>
            </Link>
          </div>

          <DeliveryTimeline steps={shipment.timeline} status={shipment.status} />

          <StatusCard shipment={shipment} />

          <SupportFooter />
        </div>
      </main>
    </div>
  )
}
