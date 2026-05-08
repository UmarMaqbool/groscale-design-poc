import { cn } from '@/lib/utils'
import type { TimelineStep, TrackingStatus } from '../types'

interface DeliveryTimelineProps {
  steps: TimelineStep[]
  status: TrackingStatus
}

type StepState = 'completed' | 'current' | 'pending'

const ORDER: Record<TrackingStatus, number> = {
  scheduled: 0,
  out_for_delivery: 1,
  delivered: 2,
  unsuccessful: 3,
}

function stateFor(stepIndex: number, currentIndex: number): StepState {
  if (stepIndex < currentIndex) return 'completed'
  if (stepIndex === currentIndex) return 'current'
  return 'pending'
}

export function DeliveryTimeline({ steps, status }: DeliveryTimelineProps) {
  const currentIndex = ORDER[status]

  return (
    <div className="rounded-[10px] border border-[#e5e7eb] bg-white p-4 lg:p-5">
      <h2 className="mb-5 text-lg font-bold text-[#344054] lg:mb-6 lg:text-xl">
        Delivery Timeline
      </h2>

      {/* Mobile: vertical timeline (one row per step) */}
      <ol className="flex flex-col lg:hidden">
        {steps.map((step, i) => {
          const state = stateFor(i, currentIndex)
          const isLast = i === steps.length - 1
          // Connector below this badge runs to the next badge.
          const connectorColor = !isLast && state === 'completed' ? '#79b26b' : '#e5e7eb'

          return (
            <li key={step.key} className="flex items-stretch gap-4">
              <div className="flex flex-col items-center">
                <StepBadge state={state} />
                {!isLast && (
                  <div
                    className="w-0.5 flex-1"
                    style={{ backgroundColor: connectorColor }}
                  />
                )}
              </div>
              <div
                className={cn(
                  'flex flex-col pt-1',
                  isLast ? 'pb-0' : 'pb-6'
                )}
              >
                <p
                  className={cn(
                    'text-base leading-tight',
                    state === 'pending' ? 'text-[#4a5565]' : 'text-[#79b26b]'
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-sm text-[#4a5565]">{step.date}</p>
              </div>
            </li>
          )
        })}
      </ol>

      {/* Desktop: horizontal timeline */}
      <div className="hidden lg:flex">
        {steps.map((step, i) => {
          const state = stateFor(i, currentIndex)
          const isFirst = i === 0
          const isLast = i === steps.length - 1
          const leftLineColor =
            !isFirst && (state === 'completed' || state === 'current') ? '#79b26b' : '#e5e7eb'
          const rightLineColor = !isLast && state === 'completed' ? '#79b26b' : '#e5e7eb'

          return (
            <div key={step.key} className="flex flex-1 flex-col items-center gap-4">
              <div className="flex w-full items-center justify-center">
                <div
                  className="h-0.5 flex-1"
                  style={{ backgroundColor: isFirst ? 'transparent' : leftLineColor }}
                />
                <StepBadge state={state} />
                <div
                  className="h-0.5 flex-1"
                  style={{ backgroundColor: isLast ? 'transparent' : rightLineColor }}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <p
                  className={cn(
                    'text-lg leading-tight',
                    state === 'pending' ? 'text-[#4a5565]' : 'text-[#79b26b]'
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-sm text-[#4a5565]">{step.date}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StepBadge({ state }: { state: StepState }) {
  const isCompleted = state === 'completed'
  const isCurrent = state === 'current'

  const containerClasses = cn(
    'flex size-10 shrink-0 items-center justify-center rounded-md border lg:size-[46px]',
    isCompleted && 'border-transparent bg-[#79b26b]',
    isCurrent && 'border-[#c0e4ca] bg-[#f7fff5]',
    state === 'pending' && 'border-[#e5e7eb] bg-[#f9fafb]'
  )

  // Stroke colors copied from Figma SVGs
  const strokeColor = isCompleted ? '#ffffff' : isCurrent ? '#06402B' : '#4A5565'

  return (
    <div className={containerClasses}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        <path
          d="M8 12.5L10.5 15L16 9"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
