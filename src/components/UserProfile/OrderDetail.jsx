import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../../hooks/UserProfile/useOrders';
import { formatRupiah } from '../../utils/UserProfile/ordersUtils';
import SideNavbarUser from "./SideNavbarUser";

const OrderDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();
  
  const order = orders.find((o) => o.id === id);

  if (!order) return <div className="p-10">Pesanan tidak ditemukan.</div>;

  return (
    <div className="flex min-h-screen bg-cloud p-12 font-body antialiased text-ink justify-center">
      <div className="w-64 shrink-0 pt-2">
        <SideNavbarUser user={user} />
      </div>

      <main className="grow max-w-3xl ml-4 space-y-10">
        <button 
          onClick={() => navigate('/akun/pesanan')}
          className="text-xs font-bold underline text-steel hover:text-ink cursor-pointer"
        >
          ← Kembali ke Pesanan
        </button>

        <div className="bg-white border border-ash/40 p-6 space-y-6">
          <div className="border-b border-ash/40 pb-6">
            <h1 className="text-sm font-black tracking-wider uppercase text-ink">{order.item}</h1>
            <p className="text-[10px] font-bold text-steel uppercase tracking-wider mt-1">ID: {order.id} • {order.tanggal}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-[10px] font-black text-ink uppercase tracking-wider mb-3">Informasi Pengiriman</h3>
              <div className="bg-cloud p-4 border border-ash/30 space-y-2">
                <p className="text-xs text-smoke">Kurir: <span className="font-bold text-ink">{order.detail?.kurir || "-"}</span></p>
                <p className="text-xs text-smoke">No. Resi: <span className="font-bold text-ink font-mono">{order.detail?.noResi || "-"}</span></p>
                <p className="text-xs text-smoke">Alamat: <span className="font-bold text-ink">{order.detail?.alamat || "-"}</span></p>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black text-ink uppercase tracking-wider mb-3">Rincian Pembayaran</h3>
              <div className="bg-cloud p-4 border border-ash/30 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-smoke">Metode:</span>
                  <span className="font-bold text-ink">{order.detail?.pembayaran || "-"}</span>
                </div>
                <div className="flex justify-between border-t border-ash/40 pt-3 text-xs">
                  <span className="font-bold text-ink">Total Pembayaran</span>
                  <span className="font-bold text-ink">{formatRupiah(order.total)}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;