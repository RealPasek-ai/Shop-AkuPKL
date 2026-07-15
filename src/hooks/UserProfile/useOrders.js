import { useState, useEffect } from 'react';

const DUMMY_ORDERS = [
  {
    id: "ORD-98231",
    tanggal: "12 Jul 2026",
    total: 250000,
    status: "Diproses",
    item: "Sepatu Running Lokal v2",
    jumlah: 1,
    detail: {
      kurir: "JNE Express",
      noResi: "JNE1234567890",
      alamat: "Jl. Gatot Subroto No. 45, Jakarta",
      pembayaran: "Transfer Bank BCA",
      hargaSatuan: 250000
    }
  },
  {
    id: "ORD-98230",
    tanggal: "10 Jul 2026",
    total: 170000,
    status: "Selesai",
    item: "Kaos Polos Cotton Combed 30s",
    jumlah: 2,
    detail: {
      kurir: "SiCepat",
      noResi: "SC123456789",
      alamat: "Perumahan Indah Blok C2, Bandung",
      pembayaran: "E-Wallet (Dana)",
      hargaSatuan: 85000
    }
  }
];

export const useOrders = () => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('user_orders');
    return savedOrders ? JSON.parse(savedOrders) : DUMMY_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('user_orders', JSON.stringify(orders));
  }, [orders]);

  return { orders };
};