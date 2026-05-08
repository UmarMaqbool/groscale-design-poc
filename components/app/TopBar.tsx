'use client'

import {
  Search,
  PanelLeft,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useSidebar } from './sidebarStore'

const mockNotifications = [
  { id: 1, title: '12 packages delivered today', time: '2 minutes ago', unread: true },
  { id: 2, title: 'New report ready: Weekly performance', time: '1 hour ago', unread: true },
  { id: 3, title: 'Carrier UPS sent rate update', time: '3 hours ago', unread: false },
  { id: 4, title: 'Algorithm v2.1 has been deployed', time: 'Yesterday', unread: false },
]

export function TopBar() {
  const { toggle } = useSidebar()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-border bg-card px-5">
      <div className="flex items-center gap-3">
        <Button
          onClick={toggle}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full border border-border"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <div className="relative w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="h-9 pl-9 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="relative flex h-8 w-[55px] items-center rounded-full bg-card ring-1 ring-border transition-colors hover:bg-muted"
        >
          <span
            className={`absolute flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
              isDark ? 'left-1 bg-primary text-primary-foreground' : 'left-1 text-muted-foreground'
            }`}
          >
            <Moon className="h-3.5 w-3.5" />
          </span>
          <span
            className={`absolute flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
              !isDark ? 'right-1 bg-primary text-primary-foreground' : 'right-1 text-muted-foreground'
            }`}
          >
            <Sun className="h-3.5 w-3.5" />
          </span>
        </button>

        <div className="h-5 w-px bg-border" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="border-b px-4 py-3">
              <p className="text-sm font-medium">Notifications</p>
              <p className="text-xs text-muted-foreground">You have {mockNotifications.filter((n) => n.unread).length} unread</p>
            </div>
            <div className="max-h-80 divide-y divide-border overflow-y-auto">
              {mockNotifications.map((n) => (
                <button
                  key={n.id}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left hover:bg-muted"
                  onClick={() => toast(n.title)}
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      n.unread ? 'bg-primary' : 'bg-transparent'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm leading-snug">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t px-4 py-2 text-center">
              <button className="text-xs font-medium text-primary hover:underline">
                Mark all as read
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 gap-2.5 rounded-md border border-border px-1.5 text-sm font-normal text-muted-foreground hover:bg-muted"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
              <span className="pr-1 text-foreground">John Smith</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>John Smith</span>
                <span className="text-xs font-normal text-muted-foreground">john@groscale.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast('Profile coming soon')}>
              <User /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast('Settings coming soon')}>
              <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast('Help center coming soon')}>
              <HelpCircle /> Help &amp; Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toast.success('Signed out')
                router.push('/login')
              }}
              className="text-destructive"
            >
              <LogOut /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
