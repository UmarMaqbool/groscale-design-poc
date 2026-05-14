'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { findShipment, trackingShipments } from '@/mocks/tracking'

export function TrackOrderForm() {
  const router = useRouter()
  const [tracking, setTracking] = useState('')

  const sampleId = trackingShipments[0]?.orderNumber

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = tracking.trim()
    if (!trimmed) {
      toast.error('Please enter a tracking number', {
        description: sampleId ? `Try ${sampleId} for a sample shipment.` : undefined,
      })
      return
    }
    const shipment = findShipment(trimmed)
    if (!shipment) {
      toast.error('Tracking number not found', {
        description: sampleId ? `Try ${sampleId} to see a sample shipment.` : undefined,
      })
      return
    }
    toast.success('Tracking found', { description: `Status: ${shipment.status.replace(/_/g, ' ')}` })
    router.push(`/tracking/${shipment.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <label htmlFor="tracking-number" className="text-sm text-foreground">
        Tracking Number
      </label>
      <input
        id="tracking-number"
        type="text"
        value={tracking}
        onChange={(e) => setTracking(e.target.value)}
        placeholder={sampleId ? `Try ${sampleId}` : 'Enter your order number'}
        className="w-full rounded-xl border border-gray-300 bg-card px-3.5 py-2.5 text-lg text-foreground shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />
      <button
        type="submit"
        className="mt-4 flex h-11 w-full items-center justify-center rounded-xl border border-primary bg-primary px-5 py-3 text-base font-bold text-primary-foreground shadow-xs transition-colors hover:bg-primary-600"
      >
        Track Package
      </button>
    </form>
  )
}
