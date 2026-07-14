import { cn, formatCurrency } from '@/utils'
import type { SummaryMetrics } from '@/types'
import { BarChart3, ArrowDownCircle, ArrowUpCircle, CalendarDays, ChevronDown } from 'lucide-react'

interface MetricsRowProps {
  metrics: SummaryMetrics
  className?: string
}

export function MetricsRow({ metrics, className }: MetricsRowProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {/* Left: Metric chips */}
      <div className="flex items-center gap-4">
        {/* Net */}
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
          <BarChart3 className="h-3.5 w-3.5 text-neutral-500" />
          <span className="text-xs font-medium text-neutral-600">Net</span>
          <span className="text-sm font-bold text-neutral-800">
            {formatCurrency(metrics.net)}
          </span>
        </div>

        {/* You Give */}
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
          <ArrowDownCircle className="h-3.5 w-3.5 text-danger-500" />
          <span className="text-xs font-medium text-neutral-600">You Give</span>
          <span className="text-sm font-bold text-danger-600">
            {formatCurrency(metrics.youGive)}
          </span>
        </div>

        {/* You Get */}
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
          <ArrowUpCircle className="h-3.5 w-3.5 text-success-500" />
          <span className="text-xs font-medium text-neutral-600">You Get</span>
          <span className="text-sm font-bold text-success-600">
            {formatCurrency(metrics.youGet)}
          </span>
        </div>
      </div>

      {/* Right: More Actions + Calendar */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
          More Actions
          <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
        </button>
        <button className="flex items-center justify-center rounded-lg border border-neutral-200 bg-white p-1.5 text-neutral-500 hover:bg-neutral-50 transition-colors">
          <CalendarDays className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
