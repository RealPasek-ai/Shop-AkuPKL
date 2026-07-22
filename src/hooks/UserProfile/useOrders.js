import { useState, useEffect } from 'react';

/**
 * useOrders — daftar pesanan pengguna dari localStorage 'user_orders'.
 * Pesanan nyata ditambahkan saat checkout selesai (tanpa data dummy).
 */
export const useOrders = () => {
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user_orders')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('user_orders', JSON.stringify(orders));
  }, [orders]);

  // Ubah status pesanan tertentu (mis. Pending -> Diproses -> Selesai).
  const updateStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  return { orders, updateStatus };
};