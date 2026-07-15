import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * useCountdown
 * Hook countdown detik-per-detik, dipakai untuk timer OTP.
 * @param {number} initialSeconds - lama countdown dalam detik
 */
export function useCountdown(initialSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const intervalRef = useRef(null)

  useEffect(() => {
    setSecondsLeft(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (secondsLeft <= 0) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [secondsLeft > 0])

  const reset = useCallback((newSeconds) => {
    setSecondsLeft(newSeconds)
  }, [])

  const formatted = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(
    secondsLeft % 60
  ).padStart(2, '0')}`

  return { secondsLeft, isExpired: secondsLeft <= 0, formatted, reset }
}
