import { cn, formatCurrency } from '@/utils'
import type { LedgerSummary } from '@/types'
import { RefreshCw } from 'lucide-react'

interface LedgerSummaryBarProps {
  summary: LedgerSummary
  onRefresh: () => void
  loading?: boolean
}

export function LedgerSummaryBar({ summary, onRefresh, loading }: LedgerSummaryBarProps) {
  const isCollect = summary.label === 'You Collect'

  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-6">
        {/* Balance label */}
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-semibold',
              isCollect
                ? 'bg-success-50 text-success-700'
                : 'bg-danger-50 text-danger-700',
            )}
          >
            {summary.label}
          </span>
          <span
            className={cn(
              'text-lg font-bold',
              isCollect ? 'text-success-600' : 'text-danger-600',
            )}
          >
            {formatCurrency(Math.abs(summary.balance))}
          </span>
        </div>

        {/* Breakdown */}
        <div className="hidden md:flex items-center gap-4 text-xs text-neutral-500">
          <span>Invoice: {formatCurrency(summary.invoice)}</span>
          <span>Credit Note: {formatCurrency(summary.creditNote)}</span>
          <span>Pay In: {formatCurrency(summary.payIn)}</span>
          <span>Pay Out: {formatCurrency(summary.payOut)}</span>
        </div>
      </div>

      <button
        onClick={onRefresh}
        disabled={loading}
        className={cn(
          'rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors',
          loading && 'animate-spin',
        )}
        aria-label="Refresh ledger"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
  )
}
