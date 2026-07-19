/**
 * utils/format.js
 * Sumber tunggal format mata uang untuk seluruh situs.
 * FakeStore API memberi harga dalam USD, sedangkan situs ini memakai Rupiah —
 * konversi memakai rate demo di bawah (bukan kurs real-time; sesuaikan bila perlu).
 */

// Rate konversi demo USD -> IDR.
export const USD_TO_IDR = 16000;

/** Format angka Rupiah tanpa desimal, mis. 393000 -> "Rp 393.000". */
export function formatRupiah(angka) {
  return Number(angka).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });
}

/** Konversi harga produk FakeStore (USD) -> Rupiah, dibulatkan ke ratusan terdekat. */
export function hargaProdukRupiah(usd) {
  const idr = Math.round((Number(usd) * USD_TO_IDR) / 100) * 100;
  return formatRupiah(idr);
}
