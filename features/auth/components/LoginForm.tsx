'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SocialButtons } from './SocialButtons'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast.error('Please enter your email and password.')
      return
    }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    toast.success(`Welcome back, ${email.split('@')[0]}!`)
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="h-11 border-border bg-card text-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <button
            type="button"
            onClick={() => toast('Password reset coming soon')}
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
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
      </div>

      <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
        Remember me for 30 days
      </label>

      <Button
        type="submit"
        disabled={submitting}
        className="h-11 bg-primary text-sm font-medium text-primary-foreground hover:bg-primary-600 disabled:opacity-60"
      >
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-background px-3 text-muted-foreground">or continue with</span>
        </div>
      </div>

      <SocialButtons />
    </form>
  )
}
