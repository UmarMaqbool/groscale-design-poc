'use client'

import Link from 'next/link'
import { AuthShell, SignupForm } from '@/features/auth'

export default function SignupPage() {
  return (
    <AuthShell
      title="Join the marketplace"
      subtitle="Connect with shippers and carriers. Sign direct contracts. No brokers."
      footer={
        <>
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-primary-700 hover:underline dark:text-primary-200"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  )
}
