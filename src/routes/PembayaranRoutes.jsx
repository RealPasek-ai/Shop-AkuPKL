import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "../pages/Pembayaran/Checkout";
import PilihPembayaran from "../pages/Pembayaran/PilihPembayaran";
import StatusPembayaran from "../pages/Pembayaran/StatusPembayaran";
import Invoice from "../pages/Pembayaran/Invoice";

/**
 * Modul Pembayaran. Seluruh rute (checkout, pilih metode, status, invoice)
 * butuh login (ProtectedRoute) — konsisten dengan alur React-Store.
 */
export default function PembayaranRoutes() {
  return (
    <>
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pembayaran/pilih"
        element={
          <ProtectedRoute>
            <PilihPembayaran />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pembayaran/status/:orderId"
        element={
          <ProtectedRoute>
            <StatusPembayaran />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoice/:invoiceId"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />
    </>
  );
}
