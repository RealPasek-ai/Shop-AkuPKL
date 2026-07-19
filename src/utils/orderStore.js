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
