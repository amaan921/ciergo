import type {
  ApprovalStatus,
  BookingStatus,
  BookingType,
  LedgerEntryType,
  PaymentMode,
  PaymentStatus,
} from '@/types'

export const BOOKING_STATUSES: BookingStatus[] = [
  'confirmed',
  'pending',
  'cancelled',
  'completed',
  'on_hold',
]

export const PAYMENT_STATUSES: PaymentStatus[] = [
  'paid',
  'partial',
  'unpaid',
  'refunded',
  'overdue',
]

export const APPROVAL_STATUSES: ApprovalStatus[] = ['pending', 'approved', 'rejected']

export const BOOKING_TYPES: BookingType[] = [
  'flight',
  'hotel',
  'package',
  'transfer',
  'visa',
  'insurance',
]

export const PAYMENT_MODES: PaymentMode[] = [
  'cash',
  'bank_transfer',
  'credit_card',
  'upi',
  'cheque',
  'wallet',
]

export const PAGE_SIZE_OPTIONS = [6, 10, 20, 50] as const

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: 'Confirmed',
  pending: 'Pending',
  cancelled: 'Cancelled',
  completed: 'Completed',
  on_hold: 'On Hold',
}

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: 'Paid',
  partial: 'Partially Paid',
  unpaid: 'Unpaid',
  refunded: 'Refunded',
  overdue: 'Overdue',
}

export const APPROVAL_STATUS_LABELS: Record<ApprovalStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}

export const BOOKING_TYPE_LABELS: Record<BookingType, string> = {
  flight: 'Flight',
  hotel: 'Hotel',
  package: 'Package',
  transfer: 'Transfer',
  visa: 'Visa',
  insurance: 'Insurance',
}

export const LEDGER_ENTRY_LABELS: Record<LedgerEntryType, string> = {
  booking_created: 'Booking Created',
  money_received: 'Money Received',
  credit_note: 'Credit Note',
  debit_note: 'Debit Note',
  money_paid: 'Money Paid',
  invoice: 'Invoice',
  pay_in: 'Pay In',
  pay_out: 'Pay Out',
}

export const PAYMENT_MODE_LABELS: Record<PaymentMode, string> = {
  cash: 'Cash',
  bank_transfer: 'Bank Transfer',
  credit_card: 'Credit Card',
  upi: 'UPI',
  cheque: 'Cheque',
  wallet: 'Wallet',
}

export const ROUTES = {
  home: '/',
  financeBookings: '/finance/bookings',
  bookingCalendar: '/finance/bookings/calendar',
} as const
