import { useState, useCallback } from 'react'
import type { ToastMessage } from '@/types'

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    (type: ToastMessage['type'], message: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      setToasts((prev) => [...prev, { id, type, message }])
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = useCallback(
    (message: string) => addToast('success', message),
    [addToast],
  )

  const error = useCallback(
    (message: string) => addToast('error', message),
    [addToast],
  )

  const info = useCallback(
    (message: string) => addToast('info', message),
    [addToast],
  )

  return { toasts, addToast, removeToast, success, error, info }
}
