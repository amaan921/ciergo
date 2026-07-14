import { cn } from '@/utils'
import { formatCurrency } from '@/utils'
import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: number
  variant: 'net' | 'give' | 'get'
  subtitle?: string
  className?: string
}

const icons: Record<string, ReactNode> = {
  net: <Minus className="h-5 w-5" />,
  give: <TrendingDown className="h-5 w-5" />,
  get: <TrendingUp className="h-5 w-5" />,
}

export function MetricCard({ label, value, variant, subtitle, className }: MetricCardProps) {
  const isPositive = variant === 'get' || (variant === 'net' && value >= 0)
  const isNegative = variant === 'give' || (variant === 'net' && value < 0)

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-lg',
          isPositive && 'bg-success-50 text-success-600',
          isNegative && 'bg-danger-50 text-danger-600',
        )}
      >
        {icons[variant]}
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          {label}
        </span>
        <span
          className={cn(
            'text-xl font-bold',
            isPositive && 'text-success-600',
            isNegative && 'text-danger-600',
          )}
        >
          {formatCurrency(Math.abs(value))}
        </span>
        {subtitle && (
          <span className="text-xs text-neutral-400 mt-0.5">{subtitle}</span>
        )}
      </div>
    </div>
  )
}
