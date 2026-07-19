import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/Login/useAuth'
import Loading from '../components/Login/Loading'

/**
 * routes/ProtectedRoute.jsx
 * Pembungkus rute yang butuh login (checkout, pembayaran, akun).
 * - Selama sesi masih diperiksa → tampilkan Loading.
 * - Belum login → alihkan ke /login (menyimpan asal agar bisa kembali).
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return <Loading label="Memeriksa sesi..." />
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return children
}
