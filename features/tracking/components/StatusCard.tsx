'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { TrackingMap } from './TrackingMap'
import type { Shipment, TrackingStatus } from '../types'

const STATUS_LABEL: Record<TrackingStatus, string> = {
  scheduled: 'Scheduled',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  unsuccessful: 'Unsuccessful Delivery',
}

const STATUS_TONE: Record<TrackingStatus, string> = {
  scheduled: 'bg-muted text-muted-foreground',
  out_for_delivery: 'bg-orange-50 text-orange-700',
  delivered: 'bg-primary-100 text-primary-900',
  unsuccessful: 'bg-red-50 text-red-700',
}

interface StatusCardProps {
  shipment: Shipment
}

export function StatusCard({ shipment }: StatusCardProps) {
  const [reason, setReason] = useState(shipment.reason ?? '')

  return (
    <div className="rounded-[10px] border border-border bg-card p-4 lg:p-5">
      <div className="flex flex-col gap-5 lg:gap-6">
        {/* Status header — stacked tone pill on mobile */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2 lg:gap-3.5">
            <h2 className="text-lg font-bold leading-tight text-foreground lg:text-2xl">
              Status
            </h2>
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium lg:text-base ${STATUS_TONE[shipment.status]}`}
            >
              {STATUS_LABEL[shipment.status]}
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              toast.info(`Order ${shipment.orderNumber}`, {
                description: `Last updated ${shipment.deliveryDate} • ${shipment.deliveryTime}`,
              })
            }
            aria-label="More info"
            className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground transition-colors hover:bg-accent lg:size-[46px]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 8V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 15.99V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Map — placed first on mobile for visual focus, side-by-side on desktop */}
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
          <div className="order-1 h-[220px] flex-1 overflow-hidden rounded-[10px] border border-border sm:h-[280px] lg:order-2 lg:h-[320px]">
            <TrackingMap
              pickup={shipment.pickup}
              dropoff={shipment.dropoff}
              driver={shipment.driver}
              route={shipment.route}
              className="h-full w-full"
            />
          </div>

          <div className="order-2 flex flex-1 flex-col gap-5 lg:order-1 lg:gap-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
              <Field label="Order Number" value={shipment.orderNumber} />
              <Field label="Package ID" value={shipment.packageId} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
              <Field label="Delivery Date" value={shipment.deliveryDate} />
              <Field label="Delivery Time" value={shipment.deliveryTime} />
            </div>
            <Field label="Confirmation" value={shipment.confirmation} />

            {shipment.status === 'unsuccessful' ? (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reason" className="text-sm text-muted-foreground">
                  Reason
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason here..."
                  className="min-h-[88px] w-full resize-none rounded-md border border-gray-300 bg-card px-3.5 py-2.5 text-base text-muted-foreground placeholder:text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <p className="text-xs leading-tight text-muted-foreground lg:text-sm">{label}</p>
      <p className="text-base leading-snug text-foreground lg:text-lg">{value}</p>
    </div>
  )
}
