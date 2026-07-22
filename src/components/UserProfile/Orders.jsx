import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavbarUser from "./SideNavbarUser";
import { useOrders } from "../../hooks/UserProfile/useOrders";
import { getStatusTheme, formatRupiah } from "../../utils/UserProfile/ordersUtils";

const Orders = ({ user }) => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Semua');
  const statusList = ['Semua', 'Diproses', 'Selesai', 'Pending'];

  const filteredOrders = useMemo(() => {
    return activeTab === 'Semua'
      ? orders
      : orders.filter((order) => order.status === activeTab);
  }, [orders, activeTab]);

  return (
    <div className="flex min-h-screen bg-cloud p-12 font-body antialiased text-ink justify-center">
      <div className="w-64 shrink-0 pt-2">
        <SideNavbarUser user={user} />
      </div>

      <main className="grow max-w-3xl ml-4 space-y-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-black tracking-wider uppercase text-ink">Riwayat Pesanan</h3>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
            {statusList.map((status) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`text-xs font-bold px-4 py-1.5 border transition cursor-pointer ${
                  activeTab === status 
                    ? 'bg-ink text-white border-ink' 
                    : 'bg-cloud border-ash/50 text-steel hover:bg-ash'
                }`}
              >
                {status}
              </button>
            ))}
        </div>

        {/* Orders Container */}
        <div className="bg-white border border-ash/40 p-6 space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-4 border-b border-ash/40 last:border-0"
              >
                <div className="w-16 h-16 bg-cloud overflow-hidden shrink-0 border border-ash/30">
                  <img src={order.image || undefined} alt={order.item} className="w-full h-full object-cover" />
                </div>

                <div className="grow">
                  <h3 className="text-sm font-bold text-ink">{order.item}</h3>
                  <p className="text-[10px] font-medium text-steel mt-0.5">{order.id} • {order.tanggal}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold border ${getStatusTheme(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-ink">{formatRupiah(order.total)}</p>
                  <button
                    onClick={() => navigate(`/akun/pesanan/${order.id}`)}
                    className="mt-1 text-xs font-bold underline text-steel hover:text-ink cursor-pointer"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-steel text-sm font-medium">
              Tidak ada pesanan {activeTab.toLowerCase()}.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;