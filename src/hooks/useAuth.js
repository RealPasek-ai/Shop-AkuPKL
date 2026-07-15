import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Custom hook agar komponen cukup panggil useAuth() tanpa import Context langsung
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  }
  return context
}
