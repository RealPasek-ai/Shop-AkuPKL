import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import VerifyOtp from '../pages/VerifyOtp'
import ResetPassword from '../pages/ResetPassword'
import NotFound from '../pages/NotFound'

import useUser from '../hooks/UserProfile/useUser'
import UserProfile from '../components/UserProfile/UserProfile'
import UbahPassword from '../components/UserProfile/UbahPw'
import Wishlist from '../components/UserProfile/Wishlist'
import Bank from '../components/UserProfile/Bank'
import Orders from '../components/UserProfile/Orders'
import OrderDetail from '../components/UserProfile/OrderDetail'

/**
 * routes/AppRoutes.jsx
 * Definisi seluruh route aplikasi secara terpusat: modul Authentication
 * System (login/register/OTP/reset) beserta halaman UserProfile.
 */
export default function AppRoutes() {
  const { user, setUser } = useUser()

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Halaman UserProfile */}
      <Route path="/UserProfile" element={<UserProfile user={user} setUser={setUser} />} />
      <Route path="/Password" element={<UbahPassword user={user} setUser={setUser} />} />
      <Route path="/Wishlist" element={<Wishlist user={user} setUser={setUser} />} />
      <Route path="/Bank" element={<Bank user={user} setUser={setUser} />} />
      <Route path="/orders" element={<Orders user={user} />} />
      <Route path="/orders/:id" element={<OrderDetail user={user} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
