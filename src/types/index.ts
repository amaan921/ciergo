export type BookingStatus =
  | 'confirmed'
  | 'pending'
  | 'cancelled'
  | 'completed'
  | 'on_hold'

export type PaymentStatus =
  | 'paid'
  | 'partial'
  | 'unpaid'
  | 'refunded'
  | 'overdue'

export type ApprovalStatus = 'pending' | 'approved' | 'rejected'

export type BookingType = 'flight' | 'hotel' | 'package' | 'transfer' | 'visa' | 'insurance'

export type BookingTab = 'bookings' | 'waiting_for_approval' | 'deleted'

export type ApprovalFilter = 'all' | 'pending' | 'approved' | 'rejected'

export type LedgerType = 'customer' | 'vendor'

export type LedgerEntryType =
  | 'booking_created'
  | 'money_received'
  | 'credit_note'
  | 'debit_note'
  | 'money_paid'
  | 'invoice'
  | 'pay_in'
  | 'pay_out'

export type LedgerEntryStatus = 'pending' | 'completed' | 'cancelled' | 'failed'

export type PaymentMode = 'cash' | 'bank_transfer' | 'credit_card' | 'upi' | 'cheque' | 'wallet'

export interface Owner {
  id: string
  name: string
  email: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
}

export interface Vendor {
  id: string
  name: string
  email: string
  phone: string
}

export interface Booking {
  id: string
  leadPax: string
  customerId: string
  vendorId: string
  bookingDate: string
  travelDate: string
  service: string
  bookingType: BookingType
  bookingStatus: BookingStatus
  paymentStatus: PaymentStatus
  amount: number
  ownerId: string
  hasVoucher: boolean
  taskCount: number
  isDeleted: boolean
  approvalStatus: ApprovalStatus
  pendingCustomerPayment: number
  pendingVendorPayment: number
  pendingCustomerRefund: number
  pendingVendorRefund: number
}

export interface LedgerEntry {
  id: string
  entityId: string
  entityType: LedgerType
  bookingId?: string
  service: string
  date: string
  entryType: LedgerEntryType
  status: LedgerEntryStatus
  mode: PaymentMode
  account: string
  amount: number
  closingBalance: number
  isPendingInvoice: boolean
}

export interface BookingFilters {
  bookingDateFrom?: string
  bookingDateTo?: string
  travelDateFrom?: string
  travelDateTo?: string
  ownerId?: string
  bookingType?: BookingType
  bookingId?: string
}

export interface LedgerFilters {
  bookingDateFrom?: string
  bookingDateTo?: string
  travelDateFrom?: string
  travelDateTo?: string
  pendingInvoiceOnly: boolean
}

export interface ShareLedgerSettings {
  sharePendingInvoicesOnly: boolean
  customDateRange: boolean
  dateFrom?: string
  dateTo?: string
}

export interface SummaryMetrics {
  net: number
  youGive: number
  youGet: number
}

export interface LedgerSummary {
  balance: number
  label: 'You Collect' | 'You Pay'
  invoice: number
  creditNote: number
  payIn: number
  payOut: number
}

export interface PaginationState {
  pageIndex: number
  pageSize: number
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

export interface DateRange {
  from?: string
  to?: string
}
