import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { USD_TO_IDR } from '../utils/format'

/**
 * context/CartContext.jsx
 * State keranjang belanja global. Produk dari FakeStore (USD) dipetakan ke
 * bentuk item yang dipakai halaman bayar ({ id, nama, harga (Rupiah), gambar,
 * varian, qty }) sehingga funnel produk → keranjang → checkout konsisten.
 * Isi keranjang di-persist ke localStorage agar tidak hilang saat refresh.
 */

const CartContext = createContext(null)
const STORAGE_KEY = 'wm_cart'

function bacaAwal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Petakan produk FakeStore (USD) -> item keranjang (harga sudah Rupiah, dibulatkan ke ratusan).
function produkKeItem(product) {
  return {
    id: product.id,
    nama: product.title,
    harga: Math.round((Number(product.price) * USD_TO_IDR) / 100) * 100,
    gambar: product.image,
    varian: product.category || '',
    qty: 1,
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(bacaAwal)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const ada = prev.find((i) => i.id === product.id)
      if (ada) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { ...produkKeItem(product), qty }]
    })
  }, [])

  const updateQty = useCallback((id, qty) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totalItem = items.reduce((acc, i) => acc + i.qty, 0)
  const totalHarga = items.reduce((acc, i) => acc + i.harga * i.qty, 0)

  const value = { items, addItem, updateQty, removeItem, clear, totalItem, totalHarga }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart harus dipakai di dalam <CartProvider>')
  return ctx
}
