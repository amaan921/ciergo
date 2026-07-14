import type { ApprovalFilter, BookingTab } from '@/types'
import { SelectDropdown } from '@/components/common/Dropdown'
import { cn } from '@/utils'

interface BookingTabsProps {
  activeTab: BookingTab
  onTabChange: (tab: BookingTab) => void
  approvalFilter: ApprovalFilter
  onApprovalFilterChange: (filter: ApprovalFilter) => void
  showIncomplete: boolean
  onShowIncompleteChange: (show: boolean) => void
  counts: { bookings: number; deleted: number; waitingForApproval: number }
  totalLabel?: string
}

const approvalFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
]

const tabs: { id: BookingTab; label: string }[] = [
  { id: 'bookings', label: 'Bookings' },
  { id: 'deleted', label: 'Deleted' },
  { id: 'waiting_for_approval', label: 'Waiting for Approval' },
]

export function BookingTabs({
  activeTab,
  onTabChange,
  approvalFilter,
  onApprovalFilterChange,
  showIncomplete,
  onShowIncompleteChange,
  totalLabel,
}: BookingTabsProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 px-4">
      {/* Left: tabs */}
      <div className="flex items-center gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-amber-700'
                : 'text-neutral-500 hover:text-neutral-700',
            )}
          >
            {tab.label}

            {/* Active indicator */}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-t-full" />
            )}
          </button>
        ))}

        {/* Approval filter dropdown (inline after Waiting for Approval tab) */}
        {activeTab === 'waiting_for_approval' && (
          <SelectDropdown
            value={approvalFilter}
            options={approvalFilterOptions}
            onChange={(v) => onApprovalFilterChange(v as ApprovalFilter)}
            className="ml-1"
          />
        )}
      </div>

      {/* Right: toggle + total */}
      <div className="flex items-center gap-4">
        {/* Toggle Switch for Show Incomplete */}
        <label className="flex items-center gap-2.5 cursor-pointer">
          {/* Toggle track */}
          <button
            role="switch"
            aria-checked={showIncomplete}
            onClick={() => onShowIncompleteChange(!showIncomplete)}
            className={cn(
              'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
              showIncomplete ? 'bg-amber-500' : 'bg-neutral-300',
            )}
          >
            <span
              className={cn(
                'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm',
                showIncomplete ? 'translate-x-4.5' : 'translate-x-1',
              )}
            />
          </button>
          <span className="text-xs text-neutral-600">Show Incomplete Bookings</span>
        </label>

        {/* Total badge */}
        {totalLabel && (
          <span className="rounded-lg bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            Total <span className="font-bold">{totalLabel}</span>
          </span>
        )}
      </div>
    </div>
  )
}
