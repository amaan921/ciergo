import { type ReactNode, useEffect, useCallback, useRef, type MouseEvent } from 'react'
import { cn } from '@/utils'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  headerActions?: ReactNode
  className?: string
  width?: string
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  headerActions,
  className,
  width = 'max-w-3xl',
}: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!isOpen) return null

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          'h-full w-full bg-white shadow-2xl flex flex-col',
          'animate-in slide-in-from-right duration-300',
          width,
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 shrink-0">
          {title && (
            <h2 className="text-lg font-semibold text-neutral-900">
              {title}
            </h2>
          )}
          <div className="flex items-center gap-2">
            {headerActions}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}
