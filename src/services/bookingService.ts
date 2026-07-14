import type {
  ApprovalFilter,
  Booking,
  BookingFilters,
  BookingTab,
  PaginationState,
  SummaryMetrics,
} from '@/types'
import { bookings as allBookings } from '@/data/mockData'
import { isWithinInterval, parseISO } from 'date-fns'

// Simulated network delay
function delay(ms = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ── Mutable copy of bookings for CRUD ────────────────────────────────

let bookingsData: Booking[] = [...allBookings]

// ── Filtering ─────────────────────────────────────────────────────────

function matchesDateRange(
  date: string,
  from?: string,
  to?: string,
): boolean {
  if (!from && !to) return true
  const d = parseISO(date)
  const start = from ? parseISO(from) : new Date(0)
  const end = to ? parseISO(to) : new Date(9999, 11, 31)
  return isWithinInterval(d, { start, end })
}

function applyFilters(list: Booking[], filters: BookingFilters): Booking[] {
  return list.filter((b) => {
    if (!matchesDateRange(b.bookingDate, filters.bookingDateFrom, filters.bookingDateTo)) return false
    if (!matchesDateRange(b.travelDate, filters.travelDateFrom, filters.travelDateTo)) return false
    if (filters.ownerId && b.ownerId !== filters.ownerId) return false
    if (filters.bookingType && b.bookingType !== filters.bookingType) return false
    if (filters.bookingId && !b.id.toLowerCase().includes(filters.bookingId.toLowerCase())) return false
    return true
  })
}

function filterByTab(
  list: Booking[],
  tab: BookingTab,
  approvalFilter: ApprovalFilter,
): Booking[] {
  switch (tab) {
    case 'bookings':
      return list.filter((b) => !b.isDeleted && b.approvalStatus === 'approved')
    case 'deleted':
      return list.filter((b) => b.isDeleted)
    case 'waiting_for_approval':
      return list.filter((b) => {
        if (b.isDeleted) return false
        if (b.approvalStatus === 'approved') return false
        if (approvalFilter === 'all') return true
        return b.approvalStatus === approvalFilter
      })
    default:
      return list
  }
}

// ── Public API ────────────────────────────────────────────────────────

export interface GetBookingsResult {
  data: Booking[]
  total: number
}

export async function getBookings(
  filters: BookingFilters,
  tab: BookingTab,
  approvalFilter: ApprovalFilter,
  pagination: PaginationState,
): Promise<GetBookingsResult> {
  await delay()
  let result = applyFilters(bookingsData, filters)
  result = filterByTab(result, tab, approvalFilter)
  const total = result.length
  const start = pagination.pageIndex * pagination.pageSize
  const data = result.slice(start, start + pagination.pageSize)
  return { data, total }
}

export async function getSummaryMetrics(): Promise<SummaryMetrics> {
  await delay(100)
  // Hardcoded to match Figma design
  return {
    net: 4870,
    youGive: 70580,
    youGet: 75450,
  }
}

export async function deleteBooking(id: string): Promise<void> {
  await delay()
  bookingsData = bookingsData.map((b) =>
    b.id === id ? { ...b, isDeleted: true } : b,
  )
}

export async function restoreBooking(id: string): Promise<void> {
  await delay()
  bookingsData = bookingsData.map((b) =>
    b.id === id ? { ...b, isDeleted: false } : b,
  )
}

export async function duplicateBooking(id: string): Promise<Booking | null> {
  await delay()
  const original = bookingsData.find((b) => b.id === id)
  if (!original) return null
  const newBooking: Booking = {
    ...original,
    id: `${original.id}-DUP-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  }
  bookingsData.push(newBooking)
  return newBooking
}

export async function approveBooking(id: string): Promise<void> {
  await delay()
  bookingsData = bookingsData.map((b) =>
    b.id === id ? { ...b, approvalStatus: 'approved' } : b,
  )
}

export async function rejectBooking(id: string): Promise<void> {
  await delay()
  bookingsData = bookingsData.map((b) =>
    b.id === id ? { ...b, approvalStatus: 'rejected' } : b,
  )
}

export async function sendForApprovalAgain(id: string): Promise<void> {
  await delay()
  bookingsData = bookingsData.map((b) =>
    b.id === id ? { ...b, approvalStatus: 'pending' } : b,
  )
}

export function getBookingsCount(tab: BookingTab, approvalFilter: ApprovalFilter): number {
  return filterByTab(bookingsData, tab, approvalFilter).length
}

export function getAllBookingsRaw(): Booking[] {
  return bookingsData
}
