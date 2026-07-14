import { useState, useCallback } from 'react'
import { MetricsRow } from '@/components/filters/MetricsRow'
import { FilterBar } from '@/components/filters/FilterBar'
import { BookingTabs } from '@/components/filters/BookingTabs'
import { BookingsTable } from '@/components/table/BookingsTable'
import { Pagination } from '@/components/pagination/Pagination'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { ToastContainer } from '@/components/common/Toast'
import { CustomerLedgerModal } from '@/components/ledger/CustomerLedgerModal'
import { VendorLedgerModal } from '@/components/ledger/VendorLedgerModal'
import { PdfPreviewDrawer } from '@/components/ledger/PdfPreviewDrawer'
import { ShareLedgerModal } from '@/components/modals/ShareLedgerModal'
import { useBookings } from '@/hooks/useBookings'
import { useToast } from '@/hooks/useToast'
import type { Booking, ShareLedgerSettings } from '@/types'
import { shareLedger } from '@/services/ledgerService'
import { copyToClipboard } from '@/utils'
import { customers, vendors } from '@/data/mockData'

export function FinanceBookingsPage() {
  const bookings = useBookings()
  const toast = useToast()

  // ── Confirm dialog state ─────────────────────────────────────────────
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    message: string
    confirmLabel: string
    confirmVariant: 'danger' | 'success'
    onConfirm: () => Promise<void>
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    confirmVariant: 'danger',
    onConfirm: async () => {},
  })
  const [confirmLoading, setConfirmLoading] = useState(false)

  // ── Ledger modal state ───────────────────────────────────────────────
  const [customerLedger, setCustomerLedger] = useState<{
    isOpen: boolean
    customerId: string
  }>({ isOpen: false, customerId: '' })

  const [vendorLedger, setVendorLedger] = useState<{
    isOpen: boolean
    vendorId: string
  }>({ isOpen: false, vendorId: '' })

  // ── PDF preview state ────────────────────────────────────────────────
  const [pdfPreview, setPdfPreview] = useState<{
    isOpen: boolean
    entityName: string
    entityId: string
    entityType: 'customer' | 'vendor'
  }>({
    isOpen: false,
    entityName: '',
    entityId: '',
    entityType: 'customer',
  })

  // ── Share modal state ────────────────────────────────────────────────
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean
    entityId: string
    entityType: 'customer' | 'vendor'
  }>({
    isOpen: false,
    entityId: '',
    entityType: 'customer',
  })

  // ── Confirm helpers ──────────────────────────────────────────────────
  const closeConfirm = () =>
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }))

  const executeConfirm = async () => {
    setConfirmLoading(true)
    try {
      await confirmDialog.onConfirm()
      closeConfirm()
    } finally {
      setConfirmLoading(false)
    }
  }

  // ── Action handler ───────────────────────────────────────────────────
  const handleAction = useCallback(
    (action: string, booking: Booking) => {
      switch (action) {
        case 'delete':
          setConfirmDialog({
            isOpen: true,
            title: 'Delete Booking',
            message: `Are you sure you want to delete this booking with ID "${booking.id}"?`,
            confirmLabel: 'Yes, Delete',
            confirmVariant: 'danger',
            onConfirm: async () => {
              await bookings.deleteBooking(booking.id)
              toast.success(`Booking ${booking.id} deleted successfully`)
            },
          })
          break

        case 'restore':
          setConfirmDialog({
            isOpen: true,
            title: 'Restore Booking',
            message: `Are you sure you want to restore this booking with ID "${booking.id}"?`,
            confirmLabel: 'Yes, Restore',
            confirmVariant: 'success',
            onConfirm: async () => {
              await bookings.restoreBooking(booking.id)
              toast.success(`Booking ${booking.id} restored successfully`)
            },
          })
          break

        case 'duplicate':
          bookings.duplicateBooking(booking.id).then(() => {
            toast.success(`Booking ${booking.id} duplicated successfully`)
          })
          break

        case 'approve':
          setConfirmDialog({
            isOpen: true,
            title: 'Approve Booking',
            message: `Are you sure you want to approve this booking with ID "${booking.id}"?`,
            confirmLabel: 'Yes, Approve',
            confirmVariant: 'success',
            onConfirm: async () => {
              await bookings.approveBooking(booking.id)
              toast.success(`Booking ${booking.id} approved successfully`)
            },
          })
          break

        case 'reject':
          setConfirmDialog({
            isOpen: true,
            title: 'Reject Booking',
            message: `Are you sure you want to reject this booking with ID "${booking.id}"?`,
            confirmLabel: 'Yes, Reject',
            confirmVariant: 'danger',
            onConfirm: async () => {
              await bookings.rejectBooking(booking.id)
              toast.success(`Booking ${booking.id} rejected`)
            },
          })
          break

        case 'send_for_approval':
          bookings.sendForApproval(booking.id).then(() => {
            toast.success(`Booking ${booking.id} sent for approval again`)
          })
          break

        case 'payment_record':
          setCustomerLedger({ isOpen: true, customerId: booking.customerId })
          break

        case 'edit':
          toast.info(`Edit booking ${booking.id} — Feature coming soon`)
          break

        case 'link':
          copyToClipboard(`https://ciergo.com/bookings/${booking.id}`).then(() => {
            toast.success('Booking link copied to clipboard')
          })
          break

        default:
          break
      }
    },
    [bookings, toast],
  )

  // ── Ledger action handlers ───────────────────────────────────────────
  const activeLedgerEntityId = customerLedger.isOpen
    ? customerLedger.customerId
    : vendorLedger.vendorId

  const activeLedgerEntityType: 'customer' | 'vendor' = customerLedger.isOpen
    ? 'customer'
    : 'vendor'

  const activeLedgerEntityName = customerLedger.isOpen
    ? (customers.find((c) => c.id === customerLedger.customerId)?.name ?? '')
    : (vendors.find((v) => v.id === vendorLedger.vendorId)?.name ?? '')

  const handleViewPdf = () => {
    setPdfPreview({
      isOpen: true,
      entityName: activeLedgerEntityName,
      entityId: activeLedgerEntityId,
      entityType: activeLedgerEntityType,
    })
  }

  const handleOpenShare = () => {
    setShareModal({
      isOpen: true,
      entityId: activeLedgerEntityId,
      entityType: activeLedgerEntityType,
    })
  }

  const handleShare = async (
    method: 'whatsapp' | 'email' | 'link',
    settings: ShareLedgerSettings,
  ) => {
    const result = await shareLedger(
      shareModal.entityId,
      shareModal.entityType,
      settings,
      method,
    )

    if (method === 'link') {
      await copyToClipboard(result)
      toast.success('Ledger link copied to clipboard')
    } else {
      toast.success(result)
    }
    setShareModal((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      {/* Summary Metrics Row */}
      <MetricsRow metrics={bookings.metrics} />

      {/* Filters */}
      <FilterBar
        filters={bookings.filters}
        onChange={bookings.setFilters}
        onReset={bookings.resetFilters}
      />

      {/* Table container */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        {/* Tabs */}
        <BookingTabs
          activeTab={bookings.tab}
          onTabChange={bookings.setTab}
          approvalFilter={bookings.approvalFilter}
          onApprovalFilterChange={bookings.setApprovalFilter}
          showIncomplete={bookings.showIncomplete}
          onShowIncompleteChange={bookings.setShowIncomplete}
          counts={bookings.counts}
          totalLabel={String(bookings.total)}
        />

        {/* Table */}
        <BookingsTable
          data={bookings.data}
          tab={bookings.tab}
          onAction={handleAction}
          loading={bookings.loading}
        />

        {/* Pagination */}
        <Pagination
          pagination={bookings.pagination}
          total={bookings.total}
          onChange={bookings.setPagination}
        />
      </div>

      {/* ── Modals ────────────────────────────────────────────────────── */}

      {/* Confirm dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirm}
        onConfirm={executeConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        confirmVariant={confirmDialog.confirmVariant}
        loading={confirmLoading}
      />

      {/* Customer Ledger */}
      <CustomerLedgerModal
        isOpen={customerLedger.isOpen}
        onClose={() => setCustomerLedger({ isOpen: false, customerId: '' })}
        customerId={customerLedger.customerId}
        onViewPdf={handleViewPdf}
        onShare={handleOpenShare}
      />

      {/* Vendor Ledger */}
      <VendorLedgerModal
        isOpen={vendorLedger.isOpen}
        onClose={() => setVendorLedger({ isOpen: false, vendorId: '' })}
        vendorId={vendorLedger.vendorId}
        onViewPdf={handleViewPdf}
        onShare={handleOpenShare}
      />

      {/* PDF Preview Drawer */}
      <PdfPreviewDrawer
        isOpen={pdfPreview.isOpen}
        onClose={() => setPdfPreview((prev) => ({ ...prev, isOpen: false }))}
        entityName={pdfPreview.entityName}
        entityId={pdfPreview.entityId}
        entityType={pdfPreview.entityType}
        onDownload={() => toast.success('PDF download started')}
        onShare={handleOpenShare}
      />

      {/* Share Ledger Modal */}
      <ShareLedgerModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal((prev) => ({ ...prev, isOpen: false }))}
        onShare={handleShare}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  )
}
