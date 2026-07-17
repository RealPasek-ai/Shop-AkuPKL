import { Route } from "react-router-dom";
import Checkout from "../pages/Pembayaran/Checkout";
import PilihPembayaran from "../pages/Pembayaran/PilihPembayaran";
import StatusPembayaran from "../pages/Pembayaran/StatusPembayaran";
import Invoice from "../pages/Pembayaran/Invoice";

export default function PembayaranRoutes() {
  return (
    <>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pembayaran/pilih" element={<PilihPembayaran />} />
      <Route path="/pembayaran/status/:orderId" element={<StatusPembayaran />} />
      <Route path="/invoice/:invoiceId" element={<Invoice />} />
    </>
  );
}