import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { cn } from '@/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm', className)}
    >
      <Link
        to="/"
        className="flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      <span className="text-neutral-300">/</span>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-neutral-300">/</span>}
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(
              index === items.length - 1
                ? 'font-semibold text-amber-700'
                : 'text-neutral-500',
            )}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
