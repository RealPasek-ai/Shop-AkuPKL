export const getStatusTheme = (status) => {
  const currentStatus = status.toLowerCase();
  
  if (currentStatus === 'pending') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (currentStatus === 'diproses') return 'bg-blue-100 text-blue-800 border-blue-200';
  if (currentStatus === 'selesai') return 'bg-green-100 text-green-800 border-green-200';
  if (currentStatus === 'dibatalkan') return 'bg-red-100 text-red-800 border-red-200';
  
  return 'bg-gray-100 text-gray-800 border-gray-200';
};

export const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(angka);
};