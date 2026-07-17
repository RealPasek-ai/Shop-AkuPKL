import { createContext, useContext } from 'react'
import { useToast } from '../hooks/Login/useToast'
import ToastContainer from '../components/Login/Toast'

/**
 * context/ToastContext.jsx
 * Menyediakan showToast() secara global agar semua halaman bisa
 * menampilkan notifikasi sukses/error tanpa perlu setup ulang.
 */
const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const { toasts, showToast, dismissToast } = useToast()

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} dismissToast={dismissToast} />
    </ToastContext.Provider>
  )
}

export function useGlobalToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useGlobalToast harus dipakai di dalam <ToastProvider>')
  return ctx
}
