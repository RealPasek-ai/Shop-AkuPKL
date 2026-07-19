import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import VerifyOtp from '../pages/VerifyOtp'
import ResetPassword from '../pages/ResetPassword'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import Produk from '../pages/Produk/Produk'
import ProdukDetail from '../pages/Produk/ProdukDetail'
import Kategori from '../pages/Produk/Kategori'
import KategoriDetail from '../pages/Produk/KategoriDetail'
import Pencarian from '../pages/Produk/Pencarian'
import Keranjang from '../pages/Keranjang'
import Wishlist from '../pages/Wishlist'
import Legal from '../pages/Legal'
import Layout from '../components/layout/Layout'

import useUser from '../hooks/UserProfile/useUser'
import UserProfile from '../components/UserProfile/UserProfile'
import UbahPassword from '../components/UserProfile/UbahPw'
import Bank from '../components/UserProfile/Bank'
import Orders from '../components/UserProfile/Orders'
import OrderDetail from '../components/UserProfile/OrderDetail'

import PembayaranRoutes from './PembayaranRoutes'

/**
 * routes/AppRoutes.jsx
 * Definisi seluruh route aplikasi secara terpusat: modul Authentication
 * System (login/register/OTP/reset) beserta halaman UserProfile.
 */
export default function AppRoutes() {
  const { user, setUser } = useUser()

  return (
    <Routes>
      {/* Storefront publik — dibungkus Layout (Navbar + MarqueeBar + Footer). `/` = Home. */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/produk/:id" element={<ProdukDetail />} />
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/kategori/:nama" element={<KategoriDetail />} />
        <Route path="/pencarian" element={<Pencarian />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/kebijakan-privasi" element={<Legal doc="privasi" />} />
        <Route path="/syarat-ketentuan" element={<Legal doc="syarat" />} />

        {/* Akun — butuh login (ProtectedRoute), tetap di dalam Layout utama */}
        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
          <Route path="/akun" element={<UserProfile user={user} setUser={setUser} />} />
          <Route path="/akun/password" element={<UbahPassword user={user} setUser={setUser} />} />
          <Route path="/akun/bank" element={<Bank user={user} setUser={setUser} />} />
          <Route path="/akun/pesanan" element={<Orders user={user} />} />
          <Route path="/akun/pesanan/:id" element={<OrderDetail user={user} />} />
        </Route>
        <Route path="/akun/wishlist" element={<Navigate to="/wishlist" replace />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Modul Pembayaran (checkout, pilih metode, status, invoice) */}
      {PembayaranRoutes()}

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
