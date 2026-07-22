/**
 * utils/orderStore.js
 * Penyimpanan snapshot pesanan di localStorage. Dibuat saat pembayaran
 * dikonfirmasi, lalu dibaca oleh halaman status & invoice via pembayaranApi.
 */
const KEY = 'wm_orders'

function bacaSemua() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export function simpanOrder(order) {
  const semua = bacaSemua()
  semua[order.orderId] = order
  localStorage.setItem(KEY, JSON.stringify(semua))
}

export function ambilOrder(orderId) {
  return bacaSemua()[orderId] || null
}

/**
 * Tambahkan pesanan ke daftar dashboard (localStorage 'user_orders') dalam
 * bentuk yang dipakai halaman Orders/OrderDetail. Dipanggil saat pembayaran
 * berhasil sehingga pesanan langsung muncul di dashboard (tanpa data dummy).
 */
const KEY_DASHBOARD = 'user_orders'

export function tambahOrderDashboard(order) {
  let list = []
  try {
    list = JSON.parse(localStorage.getItem(KEY_DASHBOARD)) || []
  } catch {
    list = []
  }

  const items = order.items || []
  const jumlah = items.reduce((acc, i) => acc + i.qty, 0)
  const nama0 = items[0]?.nama || 'Pesanan'

  // COD langsung "Diproses" (bayar saat sampai); metode lain "Pending" (menunggu
  // pembayaran) supaya ada jeda — user menyelesaikannya lewat detail pesanan.
  const isCOD = /cod|bayar di tempat/i.test(order.metode || order.metodeBayar || '')

  const dashOrder = {
    id: order.orderId,
    image: items[0]?.gambar || '',
    item: items.length > 1 ? `${nama0} +${items.length - 1} lainnya` : nama0,
    tanggal: order.tanggalTerbit || order.waktu || '',
    status: isCOD ? 'Diproses' : 'Pending',
    total: order.total,
    jumlah,
    detail: {
      kurir: order.pengiriman || '-',
      noResi: `WM${String(order.orderId).replace(/\D/g, '')}`,
      alamat: order.pelanggan?.alamat || '-',
      pembayaran: order.metode || order.metodeBayar || '-',
    },
  }

  const tanpaDuplikat = list.filter((o) => o.id !== dashOrder.id)
  localStorage.setItem(KEY_DASHBOARD, JSON.stringify([dashOrder, ...tanpaDuplikat]))
}
