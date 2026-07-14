import { useState, useCallback, useEffect } from 'react'
import type {
  ApprovalFilter,
  BookingFilters,
  BookingTab,
  PaginationState,
  SummaryMetrics,
} from '@/types'
import {
  getBookings,
  getSummaryMetrics,
  deleteBooking,
  restoreBooking,
  duplicateBooking,
  approveBooking,
  rejectBooking,
  sendForApprovalAgain,
  getBookingsCount,
  type GetBookingsResult,
} from '@/services/bookingService'

const INITIAL_FILTERS: BookingFilters = {}
const INITIAL_PAGINATION: PaginationState = { pageIndex: 0, pageSize: 6 }

export function useBookings() {
  const [tab, setTab] = useState<BookingTab>('bookings')
  const [approvalFilter, setApprovalFilter] = useState<ApprovalFilter>('all')
  const [filters, setFilters] = useState<BookingFilters>(INITIAL_FILTERS)
  const [pagination, setPagination] = useState<PaginationState>(INITIAL_PAGINATION)
  const [result, setResult] = useState<GetBookingsResult>({ data: [], total: 0 })
  const [metrics, setMetrics] = useState<SummaryMetrics>({ net: 0, youGive: 0, youGet: 0 })
  const [loading, setLoading] = useState(true)
  const [showIncomplete, setShowIncomplete] = useState(false)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const [bookingsResult, metricsResult] = await Promise.all([
        getBookings(filters, tab, approvalFilter, pagination),
        getSummaryMetrics(),
      ])
      setResult(bookingsResult)
      setMetrics(metricsResult)
    } finally {
      setLoading(false)
    }
  }, [filters, tab, approvalFilter, pagination])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handleTabChange = useCallback((newTab: BookingTab) => {
    setTab(newTab)
    setPagination(INITIAL_PAGINATION)
  }, [])

  const handleFiltersChange = useCallback((newFilters: BookingFilters) => {
    setFilters(newFilters)
    setPagination(INITIAL_PAGINATION)
  }, [])

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS)
    setPagination(INITIAL_PAGINATION)
  }, [])

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteBooking(id)
      await fetchBookings()
    },
    [fetchBookings],
  )

  const handleRestore = useCallback(
    async (id: string) => {
      await restoreBooking(id)
      await fetchBookings()
    },
    [fetchBookings],
  )

  const handleDuplicate = useCallback(
    async (id: string) => {
      await duplicateBooking(id)
      await fetchBookings()
    },
    [fetchBookings],
  )

  const handleApprove = useCallback(
    async (id: string) => {
      await approveBooking(id)
      await fetchBookings()
    },
    [fetchBookings],
  )

  const handleReject = useCallback(
    async (id: string) => {
      await rejectBooking(id)
      await fetchBookings()
    },
    [fetchBookings],
  )

  const handleSendForApproval = useCallback(
    async (id: string) => {
      await sendForApprovalAgain(id)
      await fetchBookings()
    },
    [fetchBookings],
  )

  const counts = {
    bookings: getBookingsCount('bookings', 'all'),
    deleted: getBookingsCount('deleted', 'all'),
    waitingForApproval: getBookingsCount('waiting_for_approval', approvalFilter),
  }

  return {
    // State
    tab,
    approvalFilter,
    filters,
    pagination,
    data: result.data,
    total: result.total,
    metrics,
    loading,
    showIncomplete,
    counts,

    // Actions
    setTab: handleTabChange,
    setApprovalFilter,
    setFilters: handleFiltersChange,
    setPagination,
    resetFilters: handleResetFilters,
    setShowIncomplete,
    deleteBooking: handleDelete,
    restoreBooking: handleRestore,
    duplicateBooking: handleDuplicate,
    approveBooking: handleApprove,
    rejectBooking: handleReject,
    sendForApproval: handleSendForApproval,
    refresh: fetchBookings,
  }
}
