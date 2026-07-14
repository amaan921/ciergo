import type { Booking, BookingTab } from '@/types'
import { Dropdown } from '@/components/common/Dropdown'
import {
  MoreHorizontal,
  CreditCard,
  Edit,
  Trash2,
  Copy,
  Link,
  CheckCircle,
  XCircle,
  RotateCcw,
  Send,
  ClipboardList,
  FileEdit,
} from 'lucide-react'

interface ActionMenuProps {
  booking: Booking
  tab: BookingTab
  onAction: (action: string, booking: Booking) => void
}

export function ActionMenu({ booking, tab, onAction }: ActionMenuProps) {
  const getItems = () => {
    if (tab === 'deleted') {
      return [
        {
          label: 'Restore',
          icon: <RotateCcw className="h-4 w-4" />,
          onClick: () => onAction('restore', booking),
        },
        {
          label: 'Duplicate',
          icon: <Copy className="h-4 w-4" />,
          onClick: () => onAction('duplicate', booking),
        },
      ]
    }

    if (tab === 'waiting_for_approval') {
      if (booking.approvalStatus === 'rejected') {
        return [
          {
            label: 'Send for Approval Again',
            icon: <Send className="h-4 w-4" />,
            onClick: () => onAction('send_for_approval', booking),
          },
          { label: '', onClick: () => {}, divider: true },
          {
            label: 'Delete',
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => onAction('delete', booking),
            danger: true,
          },
          {
            label: 'Duplicate',
            icon: <Copy className="h-4 w-4" />,
            onClick: () => onAction('duplicate', booking),
          },
        ]
      }

      // Pending
      return [
        {
          label: 'Approve',
          icon: <CheckCircle className="h-4 w-4" />,
          onClick: () => onAction('approve', booking),
        },
        {
          label: 'Reject',
          icon: <XCircle className="h-4 w-4" />,
          onClick: () => onAction('reject', booking),
          danger: true,
        },
        { label: '', onClick: () => {}, divider: true },
        {
          label: 'Edit',
          icon: <Edit className="h-4 w-4" />,
          onClick: () => onAction('edit', booking),
        },
        {
          label: 'Delete',
          icon: <Trash2 className="h-4 w-4" />,
          onClick: () => onAction('delete', booking),
          danger: true,
        },
        {
          label: 'Duplicate',
          icon: <Copy className="h-4 w-4" />,
          onClick: () => onAction('duplicate', booking),
        },
      ]
    }

    // Default bookings tab
    return [
      {
        label: 'Payment Record',
        icon: <CreditCard className="h-4 w-4" />,
        onClick: () => onAction('payment_record', booking),
      },
      {
        label: 'Edit',
        icon: <Edit className="h-4 w-4" />,
        onClick: () => onAction('edit', booking),
      },
      { label: '', onClick: () => {}, divider: true },
      {
        label: 'Delete',
        icon: <Trash2 className="h-4 w-4" />,
        onClick: () => onAction('delete', booking),
        danger: true,
      },
      {
        label: 'Duplicate',
        icon: <Copy className="h-4 w-4" />,
        onClick: () => onAction('duplicate', booking),
      },
      {
        label: 'Link',
        icon: <Link className="h-4 w-4" />,
        onClick: () => onAction('link', booking),
      },
    ]
  }

  return (
    <div className="flex items-center gap-0.5">
      {/* Inline voucher/document icon */}
      <button
        onClick={() => onAction('payment_record', booking)}
        className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
        title="Voucher"
      >
        <ClipboardList className="h-4 w-4" />
      </button>

      {/* Edit/receipt icon */}
      <button
        onClick={() => onAction('edit', booking)}
        className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
        title="Edit"
      >
        <FileEdit className="h-4 w-4" />
      </button>

      {/* Three dots menu */}
      <Dropdown
        trigger={
          <button className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        }
        items={getItems()}
        align="right"
      />
    </div>
  )
}
