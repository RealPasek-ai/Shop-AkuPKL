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
    <div className="flex min-h-screen bg-[#FBF8F3] p-12 font-sans antialiased text-gray-900 justify-center">
      <div className="w-64 shrink-0 pt-2">
        <SideNavbarUser user={user} />
      </div>

      <main className="grow max-w-3xl ml-4 space-y-10">
        <button 
          onClick={() => navigate('/orders')}
          className="text-xs font-bold underline text-gray-400 hover:text-gray-900 cursor-pointer"
        >
          ← Kembali ke Pesanan
        </button>

        <div className="bg-[#F7F3EB] border border-gray-200/40 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-300/40 pb-6">
            <h1 className="text-sm font-black tracking-wider uppercase text-gray-900">{order.item}</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">ID: {order.id} • {order.tanggal}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-wider mb-3">Informasi Pengiriman</h3>
              <div className="bg-[#FBF8F3] p-4 rounded-xl border border-gray-300/30 space-y-2">
                <p className="text-xs text-gray-500">Kurir: <span className="font-bold text-gray-900">{order.detail?.kurir || "-"}</span></p>
                <p className="text-xs text-gray-500">No. Resi: <span className="font-bold text-gray-900 font-mono">{order.detail?.noResi || "-"}</span></p>
                <p className="text-xs text-gray-500">Alamat: <span className="font-bold text-gray-900">{order.detail?.alamat || "-"}</span></p>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-wider mb-3">Rincian Pembayaran</h3>
              <div className="bg-[#FBF8F3] p-4 rounded-xl border border-gray-300/30 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Metode:</span>
                  <span className="font-bold text-gray-900">{order.detail?.pembayaran || "-"}</span>
                </div>
                <div className="flex justify-between border-t border-gray-300/40 pt-3 text-xs">
                  <span className="font-bold text-gray-900">Total Pembayaran</span>
                  <span className="font-bold text-gray-900">{formatRupiah(order.total)}</span>
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