import { cn } from '@/utils'
import {
  LayoutDashboard,
  ShoppingBag,
  Settings as SettingsIcon,
  FileText,
  CheckSquare,
  Folder,
  BookOpen,
  ChevronRight,
  Wallet,
} from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'

interface SidebarItem {
  icon: typeof FileText
  label: string
  href: string
  hasChildren?: boolean
  isActive?: boolean
}

const topItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ShoppingBag, label: 'Sales', href: '/sales', hasChildren: true },
  { icon: FileText, label: 'Operations', href: '/operations', hasChildren: true },
  { icon: BookOpen, label: 'Bookings', href: '/bookings' },
  { icon: CheckSquare, label: 'Approvals', href: '/approvals', hasChildren: true },
  { icon: Folder, label: 'Content', href: '/content' },
  { icon: Wallet, label: 'Finance', href: '/finance/bookings', hasChildren: true },
  { icon: FileText, label: 'Directory', href: '/directory', hasChildren: true },
  { icon: FileText, label: 'Reports', href: '/reports' },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="flex w-[200px] flex-col border-r border-neutral-200 bg-white shrink-0">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-neutral-200 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-700">
          <span className="text-sm font-bold text-white">C</span>
        </div>
        <span className="text-lg font-bold text-neutral-800 tracking-tight">
          <span className="text-neutral-400">.</span>go
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
        {topItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === '/finance/bookings'
              ? location.pathname.startsWith('/finance')
              : location.pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800',
              )}
            >
              <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-amber-600' : 'text-neutral-400')} />
              <span className="flex-1">{item.label}</span>
              {item.hasChildren && (
                <ChevronRight className={cn('h-3.5 w-3.5', isActive ? 'text-amber-500' : 'text-neutral-300')} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom settings */}
      <div className="border-t border-neutral-200 p-3">
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800 transition-colors"
        >
          <SettingsIcon className="h-4 w-4 text-neutral-400" />
          <span className="flex-1">Settings</span>
          <ChevronRight className="h-3.5 w-3.5 text-neutral-300" />
        </Link>
      </div>
    </aside>
  )
}
