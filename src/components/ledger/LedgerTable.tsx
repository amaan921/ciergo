import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import type { LedgerEntry, LedgerType } from '@/types'
import { formatDate, formatCurrency, cn } from '@/utils'
import { LEDGER_ENTRY_LABELS, PAYMENT_MODE_LABELS } from '@/constants'
import { Badge } from '@/components/common/badges/Badge'
import { ArrowUpDown, FileText } from 'lucide-react'

interface LedgerTableProps {
  data: LedgerEntry[]
  ledgerType: LedgerType
  loading?: boolean
}

function getAmountColor(amount: number, entryType: string, ledgerType: LedgerType): string {
  if (ledgerType === 'customer') {
    switch (entryType) {
      case 'booking_created':
      case 'money_paid':
        return 'text-danger-600'
      case 'money_received':
      case 'credit_note':
        return 'text-success-600'
      default:
        return amount >= 0 ? 'text-success-600' : 'text-danger-600'
    }
  } else {
    // vendor
    switch (entryType) {
      case 'booking_created':
      case 'money_received':
        return 'text-success-600'
      case 'debit_note':
      case 'money_paid':
        return 'text-danger-600'
      default:
        return amount >= 0 ? 'text-success-600' : 'text-danger-600'
    }
  }
}

function getClosingBalanceColor(balance: number, ledgerType: LedgerType): string {
  if (ledgerType === 'customer') {
    // Customer owes us → red, We owe customer → green
    return balance > 0 ? 'text-danger-600' : 'text-success-600'
  }
  // Vendor owes us → red, We owe vendor → green
  return balance > 0 ? 'text-danger-600' : 'text-success-600'
}

function getStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'neutral' {
  switch (status) {
    case 'completed':
      return 'success'
    case 'pending':
      return 'warning'
    case 'cancelled':
    case 'failed':
      return 'danger'
    default:
      return 'neutral'
  }
}

export function LedgerTable({ data, ledgerType, loading }: LedgerTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<LedgerEntry>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => (
          <span className="text-xs font-medium text-neutral-700">
            {row.original.id}
          </span>
        ),
        size: 140,
      },
      {
        accessorKey: 'service',
        header: 'Service',
        cell: ({ row }) => (
          <span className="text-sm text-neutral-700">
            {row.original.service}
          </span>
        ),
        size: 150,
      },
      {
        accessorKey: 'date',
        header: 'Booking / Payment Date',
        cell: ({ row }) => (
          <span className="text-sm text-neutral-600">
            {formatDate(row.original.date)}
          </span>
        ),
        size: 160,
      },
      {
        id: 'statusMode',
        header: 'Status / Mode',
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <Badge variant={getStatusVariant(row.original.status)} dot>
              {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
            </Badge>
            <span className="text-xs text-neutral-400">
              {PAYMENT_MODE_LABELS[row.original.mode]}
            </span>
          </div>
        ),
        size: 130,
      },
      {
        accessorKey: 'account',
        header: 'Account',
        cell: ({ row }) => (
          <span className="text-sm text-neutral-600">
            {row.original.account}
          </span>
        ),
        size: 130,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
          const { amount, entryType } = row.original
          return (
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-sm font-medium',
                  getAmountColor(amount, entryType, ledgerType),
                )}
              >
                {amount >= 0 ? '+' : ''}{formatCurrency(amount)}
              </span>
              <span className="text-xs text-neutral-400">
                {LEDGER_ENTRY_LABELS[entryType]}
              </span>
            </div>
          )
        },
        size: 140,
      },
      {
        accessorKey: 'closingBalance',
        header: 'Closing Balance',
        cell: ({ row }) => (
          <span
            className={cn(
              'text-sm font-semibold',
              getClosingBalanceColor(row.original.closingBalance, ledgerType),
            )}
          >
            {formatCurrency(row.original.closingBalance)}
          </span>
        ),
        size: 140,
      },
    ],
    [ledgerType],
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
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-primary-600" />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
        <FileText className="h-10 w-10 mb-2" />
        <p className="text-sm font-medium">No ledger entries found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-neutral-200 bg-neutral-50/50">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500',
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
              className="border-b border-neutral-100 transition-colors hover:bg-neutral-50/80"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
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
