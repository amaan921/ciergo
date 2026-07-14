import type { BookingFilters, BookingType } from '@/types'
import { SelectDropdown } from '@/components/common/Dropdown'
import { owners } from '@/data/mockData'
import { BOOKING_TYPE_LABELS } from '@/constants'
import { Calendar, Search, RotateCcw, ArrowRight } from 'lucide-react'

interface FilterBarProps {
  filters: BookingFilters
  onChange: (filters: BookingFilters) => void
  onReset: () => void
}

const bookingTypeOptions = [
  { label: 'All Bookings', value: '' },
  ...Object.entries(BOOKING_TYPE_LABELS).map(([value, label]) => ({
    label,
    value,
  })),
]

const ownerOptions = [
  { label: 'Search / Select Owners', value: '' },
  ...owners.map((o) => ({ label: o.name, value: o.id })),
]

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  const update = (partial: Partial<BookingFilters>) => {
    onChange({ ...filters, ...partial })
  }

  return (
    <div className="space-y-3">
      {/* Labels row */}
      <div className="flex items-center gap-0">
        <span className="text-xs font-medium text-neutral-600 w-[260px]">Booking Date</span>
        <span className="text-xs font-medium text-neutral-600 w-[260px]">Travel Date</span>
        <span className="text-xs font-medium text-neutral-600 w-[200px]">Booking Owner</span>
        <span className="text-xs font-medium text-neutral-600 flex-1">Booking Type</span>
      </div>

      {/* Inputs row */}
      <div className="flex items-center gap-3">
        {/* Booking Date Range */}
        <div className="flex items-center gap-0 rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="date"
              value={filters.bookingDateFrom ?? ''}
              onChange={(e) => update({ bookingDateFrom: e.target.value || undefined })}
              placeholder="Start Date"
              className="h-9 w-[110px] bg-transparent pl-9 pr-2 text-xs text-neutral-600 focus:outline-none"
            />
          </div>
          <ArrowRight className="h-3 w-3 text-neutral-300 mx-1" />
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="date"
              value={filters.bookingDateTo ?? ''}
              onChange={(e) => update({ bookingDateTo: e.target.value || undefined })}
              placeholder="End Date"
              className="h-9 w-[110px] bg-transparent pl-9 pr-2 text-xs text-neutral-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Travel Date Range */}
        <div className="flex items-center gap-0 rounded-lg border border-neutral-200 bg-white overflow-hidden">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="date"
              value={filters.travelDateFrom ?? ''}
              onChange={(e) => update({ travelDateFrom: e.target.value || undefined })}
              placeholder="Start Date"
              className="h-9 w-[110px] bg-transparent pl-9 pr-2 text-xs text-neutral-600 focus:outline-none"
            />
          </div>
          <ArrowRight className="h-3 w-3 text-neutral-300 mx-1" />
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            <input
              type="date"
              value={filters.travelDateTo ?? ''}
              onChange={(e) => update({ travelDateTo: e.target.value || undefined })}
              placeholder="End Date"
              className="h-9 w-[110px] bg-transparent pl-9 pr-2 text-xs text-neutral-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Booking Owner */}
        <SelectDropdown
          value={filters.ownerId ?? ''}
          options={ownerOptions}
          onChange={(val) => update({ ownerId: val || undefined })}
          placeholder="Search / Select Owners"
          className="min-w-[190px]"
        />

        {/* Booking Type */}
        <SelectDropdown
          value={filters.bookingType ?? ''}
          options={bookingTypeOptions}
          onChange={(val) => update({ bookingType: (val as BookingType) || undefined })}
          placeholder="All Bookings"
          className="min-w-[150px]"
        />

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={filters.bookingId ?? ''}
            onChange={(e) => update({ bookingId: e.target.value || undefined })}
            placeholder="Search by ID / Lead Pax / Amount"
            className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-3 pr-9 text-xs text-neutral-600 placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 transition-colors"
          />
          <Search className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="flex items-center justify-center rounded-lg border border-neutral-200 bg-white p-2 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600 transition-colors"
          title="Reset filters"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
