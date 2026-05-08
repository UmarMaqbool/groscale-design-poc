'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { AuthBrandPanel } from './AuthBrandPanel'
import { AuthThemeToggle } from './AuthThemeToggle'

interface AuthShellProps {
  /** Heading shown above the form. */
  title: string
  /** Short instruction beneath the title. */
  subtitle: string
  /** The form itself. */
  children: ReactNode
  /** Bottom-of-form footer (e.g. "Don't have an account? Sign up"). */
  footer: ReactNode
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-[minmax(0,_1fr)_minmax(0,_560px)]">
      <AuthBrandPanel />

      <div className="relative flex flex-col px-6 py-8 lg:px-14 lg:py-12">
        <div className="flex items-center justify-between">
          <div className="lg:hidden">
            <Image
              src="/logo.png"
              alt="GroScale"
              width={120}
              height={32}
              priority
              className="h-8 w-auto dark:brightness-0 dark:invert"
            />
          </div>
          <div className="ml-auto">
            <AuthThemeToggle />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-10">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>
          </div>

          <div className="mt-8">{children}</div>

          <p className="mt-8 text-center text-sm text-muted-foreground">{footer}</p>
        </div>
      </div>
    </div>
  )
}
