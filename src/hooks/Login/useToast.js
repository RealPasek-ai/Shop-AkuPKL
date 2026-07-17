import { useState, useCallback, useRef } from 'react'

/**
 * useToast
 * Hook sederhana untuk mengelola daftar toast notification yang aktif.
 */
export function useToast() {
  const [toasts, setToasts] = useState([])
  const idCounter = useRef(0)

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = ++idCounter.current
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, showToast, dismissToast }
}
