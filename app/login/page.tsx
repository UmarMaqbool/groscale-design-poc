'use client'

import Link from 'next/link'
import { AuthShell, LoginForm } from '@/features/auth'

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage shipments, contracts and partners."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Create one
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
