import { createContext, useContext, useState, useEffect, useCallback } from 'react'

/**
 * context/WishlistContext.jsx
 * State wishlist global. Menyimpan snapshot produk (bentuk FakeStore) agar bisa
 * langsung dirender ulang dengan ProductCard. Di-persist ke localStorage.
 */
const WishlistContext = createContext(null)
const STORAGE_KEY = 'wm_wishlist'

function bacaAwal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(bacaAwal)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const isWishlisted = useCallback((id) => items.some((i) => i.id === id), [items])

  const toggle = useCallback((product) => {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totalWishlist = items.length

  const value = { items, isWishlisted, toggle, remove, clear, totalWishlist }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist harus dipakai di dalam <WishlistProvider>')
  return ctx
}
