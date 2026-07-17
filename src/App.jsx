import AppRoutes from './routes/AppRoutes'
import Loading from './components/Login/Loading'
import { useAuth } from './hooks/Login/useAuth'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserProfile from "./components/UserProfile/UserProfile";
import useUser from "./hooks/UserProfile/useUser";
import UbahPassword from "./components/UserProfile/UbahPw";
import Wishlist from "./components/UserProfile/Wishlist";
import Bank from "./components/UserProfile/Bank";
import Orders from "./components/UserProfile/Orders";
import OrderDetail from "./components/UserProfile/OrderDetail";

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

