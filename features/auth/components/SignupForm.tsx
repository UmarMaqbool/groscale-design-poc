'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { RoleSelector, type AccountRole } from './RoleSelector'
import { SocialButtons } from './SocialButtons'

interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4
  label: string
  toneClass: string
}

function evaluatePassword(pw: string): PasswordStrength {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'] as const
  const tones = ['bg-muted', 'bg-destructive', 'bg-warning', 'bg-primary-400', 'bg-primary']
  return {
    score: score as PasswordStrength['score'],
    label: labels[score],
    toneClass: tones[score],
  }
}

export function SignupForm() {
  const router = useRouter()
  const [role, setRole] = useState<AccountRole>('shipper')
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const strength = useMemo(() => evaluatePassword(password), [password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!company.trim() || !name.trim() || !email.trim() || !password) {
      toast.error('Please fill in all fields.')
      return
    }
    if (!agreed) {
      toast.error('Please accept the terms to continue.')
      return
    }
    if (strength.score < 2) {
      toast.error('Please choose a stronger password.')
      return
    }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    toast.success(
      role === 'shipper'
        ? `Welcome to GroScale, ${company}! Let's find you carriers.`
        : `Welcome to GroScale, ${company}! Let's get you matched with shippers.`
    )
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <RoleSelector value={role} onChange={setRole} />

      <div className="flex flex-col gap-2">
        <Label htmlFor="company" className="text-sm font-medium">
          Company name
        </Label>
        <Input
          id="company"
          type="text"
          placeholder={role === 'shipper' ? 'GoldenBolt, Inc.' : 'Acme Carriers'}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          autoComplete="organization"
          required
          className="h-11 border-border bg-card text-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Your name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Jane Cooper"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
          className="h-11 border-border bg-card text-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Work email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="jane@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="h-11 border-border bg-card text-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            className="h-11 border-border bg-card pr-11 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {password && (
          <div className="flex items-center gap-3">
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors',
                    i < strength.score ? strength.toneClass : 'bg-muted'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{strength.label}</span>
          </div>
        )}
      </div>

      <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
        <Checkbox checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} className="mt-0.5" />
        <span>
          I agree to GroScale&apos;s{' '}
          <button
            type="button"
            onClick={() => toast('Terms coming soon')}
            className="font-medium text-primary hover:underline"
          >
            Marketplace Terms
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={() => toast('Privacy policy coming soon')}
            className="font-medium text-primary hover:underline"
          >
            Privacy Policy
          </button>
          .
        </span>
      </label>

      <Button
        type="submit"
        disabled={submitting}
        className="h-11 bg-primary text-sm font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-60"
      >
        {submitting ? 'Creating account…' : `Create ${role} account`}
      </Button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-background px-3 text-muted-foreground">or sign up with</span>
        </div>
      </div>

      <SocialButtons />
    </form>
  )
}
