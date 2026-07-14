import { useEffect } from 'react'
import { cn } from '@/utils'
import type { ToastMessage } from '@/types'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

interface ToastContainerProps {
  toasts: ToastMessage[]
  onRemove: (id: string) => void
}

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const styleMap = {
  success: 'border-success-200 bg-success-50 text-success-800',
  error: 'border-danger-200 bg-danger-50 text-danger-800',
  info: 'border-primary-200 bg-primary-50 text-primary-800',
}

const iconColorMap = {
  success: 'text-success-500',
  error: 'text-danger-500',
  info: 'text-primary-500',
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage
  onRemove: (id: string) => void
}) {
  const Icon = iconMap[toast.type]

  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000)
    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg',
        'animate-in slide-in-from-right duration-300',
        styleMap[toast.type],
      )}
    >
      <Icon className={cn('h-5 w-5 shrink-0', iconColorMap[toast.type])} />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}
