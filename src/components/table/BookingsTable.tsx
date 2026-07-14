import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import type { Booking, BookingTab } from '@/types'
import { formatDate, cn } from '@/utils'
import { PAYMENT_STATUS_LABELS } from '@/constants'
import { ActionMenu } from './ActionMenu'
import {
  Plane,
  Hotel,
  Package,
  Car,
  Stamp,
  Shield,
  FileText,
  ChevronDown,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Plus,
  ClipboardList,
} from 'lucide-react'
import type { ReactNode } from 'react'

const serviceIcons: Record<string, ReactNode> = {
  flight: <Plane className="h-4 w-4" />,
  hotel: <Hotel className="h-4 w-4" />,
  package: <Package className="h-4 w-4" />,
  transfer: <Car className="h-4 w-4" />,
  visa: <Stamp className="h-4 w-4" />,
  insurance: <Shield className="h-4 w-4" />,
}

// Owner avatar colors matching Figma
const avatarColors = [
  'bg-purple-100 text-purple-700',
  'bg-red-100 text-red-700',
  'bg-amber-100 text-amber-700',
  'bg-green-100 text-green-700',
]

// Simulated multi-owner initials per row (Figma shows AS, AK, SR, VG)
const ownerSets = [
  ['AS', 'AK', 'SR', 'VG'],
  ['AS', 'AK', 'SR', 'VG'],
  ['AS', 'AK', 'SR', 'VG'],
  ['AS', 'AK', 'SR', 'VG'],
]

function PaymentStatusChip({ status }: { status: string }) {
  const label =
    status === 'paid'
      ? 'Paid'
      : status === 'partial'
        ? 'Partially Paid'
        : status === 'unpaid'
          ? 'Pending'
          : status === 'overdue'
            ? 'Pending'
            : PAYMENT_STATUS_LABELS[status as keyof typeof PAYMENT_STATUS_LABELS] ?? status

  const style =
    status === 'paid'
      ? 'bg-success-50 text-success-700 border-success-200'
      : status === 'partial'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-orange-50 text-orange-600 border-orange-200'

  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', style)}>
      {label}
    </span>
  )
}

interface BookingsTableProps {
  data: Booking[]
  tab: BookingTab
  onAction: (action: string, booking: Booking) => void
  loading?: boolean
}

export function BookingsTable({ data, tab, onAction, loading }: BookingsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Booking ID',
        cell: ({ row }) => (
          <span className="font-medium text-neutral-800 text-xs">
            {row.original.id}
          </span>
        ),
        size: 110,
      },
      {
        accessorKey: 'leadPax',
        header: 'Lead Pax',
        cell: ({ row }) => (
          <span className="text-sm text-neutral-700">{row.original.leadPax}</span>
        ),
        size: 130,
      },
      {
        accessorKey: 'travelDate',
        header: 'Travel Date',
        cell: ({ row }) => (
          <span className="text-sm text-neutral-600">
            {formatDate(row.original.travelDate)}
          </span>
        ),
        size: 110,
      },
      {
        accessorKey: 'service',
        header: 'Service',
        cell: ({ row }) => {
          const isPackage = row.original.bookingType === 'package'
          return (
            <div className="flex flex-col items-center gap-0.5 text-center">
              {isPackage ? (
                <>
                  <span className="text-[10px] font-medium text-blue-600 bg-blue-50 rounded px-1.5 py-0.5">UAE</span>
                  <span className="text-xs text-neutral-600">{row.original.service}</span>
                </>
              ) : (
                <>
                  <span className="text-neutral-400">
                    {serviceIcons[row.original.bookingType]}
                  </span>
                  <span className="text-xs text-neutral-600">{row.original.service}</span>
                </>
              )}
            </div>
          )
        },
        size: 130,
        enableSorting: false,
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        cell: ({ row }) => (
          <PaymentStatusChip status={row.original.paymentStatus} />
        ),
        size: 130,
        enableSorting: false,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => (
          <span className="text-sm font-medium text-neutral-800">
            ₹ {row.original.amount.toLocaleString('en-IN')}
          </span>
        ),
        size: 100,
      },
      {
        id: 'owner',
        header: 'Owner',
        cell: ({ row }) => {
          const rowIndex = row.index % ownerSets.length
          const initials = ownerSets[rowIndex]
          return (
            <div className="flex items-center -space-x-1.5">
              {initials.map((init, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ring-2 ring-white',
                    avatarColors[i % avatarColors.length],
                  )}
                >
                  {init}
                </div>
              ))}
            </div>
          )
        },
        size: 100,
        enableSorting: false,
      },
      {
        id: 'voucher',
        header: 'Voucher',
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {row.original.hasVoucher ? (
              <>
                <FileText className="h-4 w-4 text-neutral-400" />
                <ChevronDown className="h-3 w-3 text-neutral-400" />
              </>
            ) : (
              <span className="text-neutral-300">—</span>
            )}
          </div>
        ),
        size: 70,
        enableSorting: false,
      },
      {
        id: 'tasks',
        header: 'Tasks',
        cell: ({ row }) => {
          if (row.original.taskCount === 0) {
            return (
              <button className="flex h-5 w-5 items-center justify-center rounded border border-neutral-300 text-neutral-400 hover:bg-neutral-50">
                <Plus className="h-3 w-3" />
              </button>
            )
          }
          return (
            <div className="relative inline-flex items-center">
              <ClipboardList className="h-4 w-4 text-neutral-400" />
              <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-0.5 text-[9px] font-bold text-white">
                {row.original.taskCount}
              </span>
            </div>
          )
        },
        size: 60,
        enableSorting: false,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const booking = row.original

          if (tab === 'waiting_for_approval' && booking.approvalStatus === 'pending') {
            return (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onAction('approve', booking)}
                  className="rounded-full p-1 text-success-600 hover:bg-success-50 transition-colors"
                  title="Approve"
                >
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => onAction('reject', booking)}
                  className="rounded-full p-1 text-danger-500 hover:bg-danger-50 transition-colors"
                  title="Reject"
                >
                  <XCircle className="h-4.5 w-4.5" />
                </button>
                <ActionMenu booking={booking} tab={tab} onAction={onAction} />
              </div>
            )
          }

          return (
            <ActionMenu booking={booking} tab={tab} onAction={onAction} />
          )
        },
        size: 90,
        enableSorting: false,
      },
    ],
    [tab, onAction],
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-amber-500" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
        <FileText className="h-12 w-12 mb-3" />
        <p className="text-sm font-medium">No bookings found</p>
        <p className="text-xs mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-neutral-200 bg-neutral-50/60">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-500',
                    header.column.getCanSort() && 'cursor-pointer select-none hover:text-neutral-700',
                  )}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <ArrowUpDown className="h-3 w-3 text-neutral-300" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-neutral-100 transition-colors hover:bg-neutral-50/50"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
