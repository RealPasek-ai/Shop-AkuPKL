import AppRoutes from './routes/AppRoutes'
import Loading from './components/Loading'
import { useAuth } from './hooks/useAuth'

/**
 * App.jsx
 * Root component aplikasi. Menunggu AuthContext selesai memeriksa
 * sesi auto-login (dari LocalStorage) sebelum menampilkan route,
 * agar tidak ada "kedipan" antara form login dan status sudah-login.
 */
export default function App() {
  const { isLoading } = useAuth()

  if (isLoading) return <Loading label="Memeriksa sesi login..." />

  return <AppRoutes />
}
