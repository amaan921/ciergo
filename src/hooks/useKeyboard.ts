import { useEffect } from 'react'

export function useKeyboard(
  key: string,
  handler: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return

    const listener = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler()
      }
    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [key, handler, enabled])
}
