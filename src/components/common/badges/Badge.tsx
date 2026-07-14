import type { ReactNode } from 'react'
import { cn } from '@/utils'

type BadgeVariant =
  | 'default'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700',
  success: 'bg-success-50 text-success-700 border border-success-100',
  danger: 'bg-danger-50 text-danger-700 border border-danger-100',
  warning: 'bg-warning-50 text-warning-600 border border-warning-100',
  info: 'bg-primary-50 text-primary-700 border border-primary-100',
  neutral: 'bg-neutral-100 text-neutral-600',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-neutral-400',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  info: 'bg-primary-500',
  neutral: 'bg-neutral-400',
}

export function Badge({ variant = 'default', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])}
        />
      )}
      {children}
    </span>
  )
}

export type { BadgeProps, BadgeVariant }
