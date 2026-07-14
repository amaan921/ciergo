import { cn } from '@/utils'
import type { BookingStatus, PaymentStatus, ApprovalStatus } from '@/types'
import {
  BOOKING_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  APPROVAL_STATUS_LABELS,
} from '@/constants'

// ── Booking Status Chip ───────────────────────────────────────────────

const bookingStatusStyles: Record<BookingStatus, string> = {
  confirmed: 'bg-success-50 text-success-700',
  pending: 'bg-warning-50 text-warning-600',
  cancelled: 'bg-danger-50 text-danger-700',
  completed: 'bg-primary-50 text-primary-700',
  on_hold: 'bg-neutral-100 text-neutral-600',
}

interface BookingStatusChipProps {
  status: BookingStatus
  className?: string
}

export function BookingStatusChip({ status, className }: BookingStatusChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        bookingStatusStyles[status],
        className,
      )}
    >
      {BOOKING_STATUS_LABELS[status]}
    </span>
  )
}

// ── Payment Status Chip ───────────────────────────────────────────────

const paymentStatusStyles: Record<PaymentStatus, string> = {
  paid: 'bg-success-50 text-success-700',
  partial: 'bg-warning-50 text-warning-600',
  unpaid: 'bg-danger-50 text-danger-700',
  refunded: 'bg-primary-50 text-primary-700',
  overdue: 'bg-danger-50 text-danger-700',
}

interface PaymentStatusChipProps {
  status: PaymentStatus
  className?: string
}

export function PaymentStatusChip({ status, className }: PaymentStatusChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        paymentStatusStyles[status],
        className,
      )}
    >
      {PAYMENT_STATUS_LABELS[status]}
    </span>
  )
}

// ── Payment Status Dots (Figma style) ─────────────────────────────────

const dotColorMap: Record<PaymentStatus, string> = {
  paid: 'bg-success-500',
  partial: 'bg-warning-500',
  unpaid: 'bg-danger-500',
  refunded: 'bg-primary-500',
  overdue: 'bg-danger-600',
}

interface PaymentDotsProps {
  status: PaymentStatus
  className?: string
}

export function PaymentDots({ status, className }: PaymentDotsProps) {
  const dots = (() => {
    switch (status) {
      case 'paid':
        return ['success', 'success', 'success', 'success'] as const
      case 'partial':
        return ['success', 'success', 'warning', 'neutral'] as const
      case 'unpaid':
        return ['danger', 'danger', 'danger', 'danger'] as const
      case 'refunded':
        return ['primary', 'primary', 'primary', 'primary'] as const
      case 'overdue':
        return ['danger', 'danger', 'danger', 'warning'] as const
    }
  })()

  const colorMap = {
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
    primary: 'bg-primary-500',
    neutral: 'bg-neutral-300',
  }

  return (
    <div className={cn('flex items-center gap-1', className)} title={PAYMENT_STATUS_LABELS[status]}>
      {dots.map((color, i) => (
        <span
          key={i}
          className={cn('h-2.5 w-2.5 rounded-full', colorMap[color])}
        />
      ))}
    </div>
  )
}

// ── Approval Status Chip ──────────────────────────────────────────────

const approvalStatusStyles: Record<ApprovalStatus, string> = {
  pending: 'bg-warning-50 text-warning-600',
  approved: 'bg-success-50 text-success-700',
  rejected: 'bg-danger-50 text-danger-700',
}

interface ApprovalStatusChipProps {
  status: ApprovalStatus
  className?: string
}

export function ApprovalStatusChip({ status, className }: ApprovalStatusChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        approvalStatusStyles[status],
        className,
      )}
    >
      {APPROVAL_STATUS_LABELS[status]}
    </span>
  )
}

export { dotColorMap }
