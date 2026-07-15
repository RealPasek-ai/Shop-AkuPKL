import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import VerifyOtp from '../pages/VerifyOtp'
import ResetPassword from '../pages/ResetPassword'
import NotFound from '../pages/NotFound'

/**
 * routes/AppRoutes.jsx
 * Definisi seluruh route aplikasi secara terpusat.
 * Project ini murni modul Authentication System, jadi tidak ada
 * halaman Home/Profile — root path diarahkan langsung ke halaman Login.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
