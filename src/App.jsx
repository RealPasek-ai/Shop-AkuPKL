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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserProfile from "./components/UserProfile/UserProfile";
import useUser from "./hooks/UserProfile/useUser";
import UbahPassword from "./components/UserProfile/UbahPw";
import Wishlist from "./components/UserProfile/Wishlist";
import Bank from "./components/UserProfile/Bank";
import Orders from "./components/UserProfile/Orders";
import OrderDetail from "./components/UserProfile/OrderDetail";

function App() {
  const { user, setUser } = useUser();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FBF8F3]">
        <div className="max-w-6xl mx-auto">
          
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/UserProfile" replace />}
            />

            <Route
              path="/UserProfile"
              element={<UserProfile user={user} setUser={setUser} />}
            />

            <Route
              path="/Password"
              element={<UbahPassword user={user} setUser={setUser} />}
            />
            
            <Route
              path="/Wishlist"
              element={<Wishlist user={user} setUser={setUser} />}
            />
            
            <Route
              path="/Bank"
              element={<Bank user={user} setUser={setUser} />}
            />

            <Route 
              path="/orders"
              element={<Orders user={user} />}
            />

            <Route 
              path="/orders/:id"
              element={<OrderDetail user={user} />}
            />

          </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
