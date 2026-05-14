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
    <div className="rounded-[10px] border border-border bg-card p-4 lg:p-5">
      <h2 className="mb-5 text-lg font-bold text-foreground lg:mb-6 lg:text-xl">
        Delivery Timeline
      </h2>

      {/* Mobile: vertical timeline (one row per step) */}
      <ol className="flex flex-col lg:hidden">
        {steps.map((step, i) => {
          const state = stateFor(i, currentIndex)
          const isLast = i === steps.length - 1

          return (
            <li key={step.key} className="flex items-stretch gap-4">
              <div className="flex flex-col items-center">
                <StepBadge state={state} />
                {!isLast && <Connector active={state === 'completed'} orientation="vertical" />}
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
                    state === 'pending' ? 'text-muted-foreground' : 'text-primary'
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">{step.date}</p>
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
          const leftActive = !isFirst && (state === 'completed' || state === 'current')
          const rightActive = !isLast && state === 'completed'

          return (
            <div key={step.key} className="flex flex-1 flex-col items-center gap-4">
              <div className="flex w-full items-center justify-center">
                {isFirst ? (
                  <div className="h-0.5 flex-1 bg-transparent" />
                ) : (
                  <Connector active={leftActive} orientation="horizontal" />
                )}
                <StepBadge state={state} />
                {isLast ? (
                  <div className="h-0.5 flex-1 bg-transparent" />
                ) : (
                  <Connector active={rightActive} orientation="horizontal" />
                )}
              </div>
              <div className="flex flex-col items-center text-center">
                <p
                  className={cn(
                    'text-lg leading-tight',
                    state === 'pending' ? 'text-muted-foreground' : 'text-primary'
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">{step.date}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Connector({
  active,
  orientation,
}: {
  active: boolean
  orientation: 'horizontal' | 'vertical'
}) {
  return (
    <div
      className={cn(
        'flex-1',
        orientation === 'horizontal' ? 'h-0.5' : 'w-0.5',
        active ? 'bg-primary' : 'bg-border'
      )}
    />
  )
}

function StepBadge({ state }: { state: StepState }) {
  const isCompleted = state === 'completed'
  const isCurrent = state === 'current'

  return (
    <div
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-md border lg:size-[46px]',
        isCompleted && 'border-transparent bg-primary text-primary-foreground',
        isCurrent && 'border-primary-200 bg-primary-50 text-primary-900',
        state === 'pending' && 'border-border bg-muted text-muted-foreground'
      )}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 12.5L10.5 15L16 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
