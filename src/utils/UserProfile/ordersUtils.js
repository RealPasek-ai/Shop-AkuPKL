export const getStatusTheme = (status) => {
  const currentStatus = status.toLowerCase();

  // Selaras dengan palet situs: netral mono + warna status (amber/emerald/red).
  if (currentStatus === 'pending') return 'bg-amber-50 text-amber-700 border-amber-300';
  if (currentStatus === 'diproses') return 'bg-cloud text-ink-soft border-ash';
  if (currentStatus === 'selesai') return 'bg-emerald-50 text-emerald-700 border-emerald-300';
  if (currentStatus === 'dibatalkan') return 'bg-red-50 text-red-700 border-red-300';

  return 'bg-cloud text-smoke border-ash';
};

// Sumber tunggal format Rupiah ada di utils/format.js — re-export agar konsisten.
export { formatRupiah } from '../format';