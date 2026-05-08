'use client'

import { AppShell } from '@/components/app/AppShell'
import {
  PackagesProvider,
  PackagesHeader,
  PackagesToolbar,
  PackagesTable,
} from '@/features/packages'

export default function PackagesPage() {
  return (
    <PackagesProvider>
      <AppShell>
        <div className="flex flex-col gap-0 pb-10">
          <PackagesHeader />
          <PackagesToolbar />
          <PackagesTable />
        </div>
      </AppShell>
    </PackagesProvider>
  )
}
