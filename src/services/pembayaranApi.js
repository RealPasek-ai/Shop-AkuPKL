
function tunda(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchStatusPesanan(orderId) {
  await tunda(1200);

  if (Math.random() < 0.15) {
    throw new Error("Gagal mengambil status pembayaran. Coba lagi.");
  }

  const subtotal = 393000;
  const ongkir = 15000;

  return {
    orderId,
    metode: "Transfer BCA",
    subtotal,
    ongkir,
    total: subtotal + ongkir,
    waktu: "07 Jul 2026, 14:55",
  };
}

export async function fetchInvoice(invoiceId) {
  await tunda(1000);

  if (Math.random() < 0.15) {
    throw new Error("Gagal memuat invoice. Coba lagi.");
  }

  return {
    invoiceId,
    tanggalTerbit: "Jul 07, 2026",
    pelanggan: {
      nama: "Nama Pelanggan",
      alamat: "123 Example St, Denpasar, Bali",
      telepon: "081234567890",
    },
    metodeBayar: "BCA Bank Transfer",
    pengiriman: "Regular · 3-4 days",
  };
}