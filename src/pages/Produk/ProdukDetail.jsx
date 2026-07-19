import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProductDetail } from '../../hooks/Dashboard/useProductDetail'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { hargaProdukRupiah } from '../../utils/format'
import Rating from '../../components/common/Rating'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'

/**
 * pages/Produk/ProdukDetail.jsx
 * Detail satu produk + aksi tambah ke keranjang / beli sekarang.
 */
export default function ProdukDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, isLoading, error } = useProductDetail(id)
  const { addItem } = useCart()
  const { isWishlisted, toggle: toggleWishlist } = useWishlist()

  const [qty, setQty] = useState(1)
  const [ditambah, setDitambah] = useState(false)

  const handleTambah = () => {
    addItem(product, qty)
    setDitambah(true)
    setTimeout(() => setDitambah(false), 2500)
  }

  const handleBeli = () => {
    addItem(product, qty)
    navigate('/keranjang')
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <Loader label="Memuat detail produk..." />
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <EmptyState title="Produk tidak ditemukan" description={error || 'Coba kembali ke katalog.'} />
        <div className="mt-6 text-center">
          <Link to="/produk" className="btn-invert">Kembali ke Katalog</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <Link to="/produk" className="eyebrow text-smoke hover:text-black">‹ Kembali ke Katalog</Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* Gambar */}
        <div className="flex aspect-square items-center justify-center border border-ash bg-white p-10">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <span className="eyebrow text-smoke">{product.category}</span>
          <h1 className="heading-display text-3xl sm:text-4xl">{product.title}</h1>
          <Rating rate={product.rating?.rate} count={product.rating?.count} />
          <p className="heading-display text-3xl text-ink">{hargaProdukRupiah(product.price)}</p>
          <p className="max-w-prose text-sm leading-relaxed text-smoke">{product.description}</p>

          {/* Kuantitas */}
          <div className="flex items-center gap-4 pt-2">
            <span className="eyebrow text-smoke">Jumlah</span>
            <div className="flex items-center border border-black">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg leading-none transition-colors hover:bg-black hover:text-white"
                aria-label="Kurangi"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-lg leading-none transition-colors hover:bg-black hover:text-white"
                aria-label="Tambah"
              >
                +
              </button>
            </div>
          </div>

          {/* Aksi */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={handleTambah} className="btn-solid">
              Tambah ke Keranjang
            </button>
            <button type="button" onClick={handleBeli} className="btn-invert">
              Beli Sekarang
            </button>
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className="mt-1 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-smoke transition-colors hover:text-black"
          >
            <span className="text-base leading-none">{isWishlisted(product.id) ? '♥' : '♡'}</span>
            {isWishlisted(product.id) ? 'Tersimpan di Wishlist' : 'Simpan ke Wishlist'}
          </button>

          {ditambah && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              ✓ Ditambahkan ke keranjang
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
