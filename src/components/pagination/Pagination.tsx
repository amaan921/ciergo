import type { PaginationState } from '@/types'
import { getPaginationRange, cn } from '@/utils'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface PaginationProps {
  pagination: PaginationState
  total: number
  onChange: (pagination: PaginationState) => void
}

const PAGE_SIZES = [6, 10, 20, 50]

export function Pagination({ pagination, total, onChange }: PaginationProps) {
  const { pageIndex, pageSize } = pagination
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = pageIndex * pageSize + 1
  const end = Math.min((pageIndex + 1) * pageSize, total)
  const pages = getPaginationRange(pageIndex + 1, totalPages)

  const [showDropdown, setShowDropdown] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showDropdown])

  const goToPage = (page: number) => {
    onChange({ ...pagination, pageIndex: page })
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100">
      {/* Left: Rows per page */}
      <div className="flex items-center gap-2" ref={dropRef}>
        <span className="text-xs text-neutral-500">Rows per page:</span>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 rounded border border-neutral-200 bg-white px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            {pageSize}
            <ChevronDown className="h-3 w-3 text-neutral-400" />
          </button>
          {showDropdown && (
            <div className="absolute bottom-full left-0 mb-1 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg z-20">
              {PAGE_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    onChange({ pageIndex: 0, pageSize: size })
                    setShowDropdown(false)
                  }}
                  className={cn(
                    'block w-full px-4 py-1.5 text-xs text-left hover:bg-neutral-50 transition-colors',
                    size === pageSize ? 'font-bold text-amber-700 bg-amber-50' : 'text-neutral-600',
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center: Showing X-Y of Z */}
      <span className="text-xs text-neutral-500">
        Showing {total > 0 ? start : 0}-{end} of {total} Bookings
      </span>

      {/* Right: Page navigation */}
      <div className="flex items-center gap-1">
        <button
          disabled={pageIndex === 0}
          onClick={() => goToPage(pageIndex - 1)}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-400 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, i) => {
          if (page === 'ellipsis') {
            return (
              <span key={`ellipsis-${i}`} className="px-1 text-xs text-neutral-400">
                ...
              </span>
            )
          }
          return (
            <button
              key={page}
              onClick={() => goToPage(page - 1)}
              className={cn(
                'flex h-7 min-w-7 items-center justify-center rounded text-xs font-medium transition-colors',
                page - 1 === pageIndex
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-500 hover:bg-neutral-100',
              )}
            >
              {page}
            </button>
          )
        })}

        <button
          disabled={pageIndex >= totalPages - 1}
          onClick={() => goToPage(pageIndex + 1)}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-400 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
