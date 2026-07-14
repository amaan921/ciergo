import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react'
import { cn } from '@/utils'
import { ChevronDown } from 'lucide-react'

interface DropdownItem {
  label: string
  icon?: ReactNode
  onClick: () => void
  danger?: boolean
  disabled?: boolean
  divider?: boolean
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export function Dropdown({ trigger, items, align = 'left', className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((e: Event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, handleClickOutside])

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-40 mt-1 min-w-[180px] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg',
            'animate-in fade-in zoom-in-95 duration-150',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} className="my-1 border-t border-neutral-100" />
            }
            return (
              <button
                key={i}
                onClick={() => {
                  item.onClick()
                  setIsOpen(false)
                }}
                disabled={item.disabled}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors',
                  'hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-50',
                  item.danger
                    ? 'text-danger-600 hover:bg-danger-50'
                    : 'text-neutral-700',
                )}
              >
                {item.icon && (
                  <span className="flex h-4 w-4 items-center justify-center shrink-0">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Simple Select Dropdown ────────────────────────────────────────────

interface SelectDropdownProps {
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SelectDropdown({
  value,
  options,
  onChange,
  placeholder = 'Select…',
  className,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen])

  const selectedLabel = options.find((o) => o.value === value)?.label ?? placeholder

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm',
          'hover:border-neutral-400 transition-colors min-w-[120px]',
          !value && 'text-neutral-400',
        )}
      >
        <span className="flex-1 text-left truncate">{selectedLabel}</span>
        <ChevronDown className={cn('h-4 w-4 text-neutral-400 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute z-40 mt-1 w-full min-w-[140px] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
              className={cn(
                'flex w-full items-center px-3 py-2 text-sm transition-colors hover:bg-neutral-50',
                opt.value === value
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-neutral-700',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
