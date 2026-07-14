import { Search, Command } from 'lucide-react'
import { Breadcrumb } from './Breadcrumb'

export function TopBar() {
  return (
    <div className="flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-6 shrink-0">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Finance', href: '/finance/bookings' },
          { label: 'Bookings' },
        ]}
      />

      {/* Search Bar */}
      <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-400 min-w-[260px]">
        <Search className="h-4 w-4" />
        <span>Search or type command...</span>
        <div className="ml-auto flex items-center gap-0.5 rounded border border-neutral-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-neutral-400">
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      </div>

      {/* User Avatar */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
          <span className="text-xs font-bold text-white">YM</span>
        </div>
      </div>
    </div>
  )
}
