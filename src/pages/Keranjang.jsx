import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatRupiah } from '../utils/format'
import SectionTitle from '../components/common/SectionTitle'
import EmptyState from '../components/common/EmptyState'

/**
 * pages/Keranjang.jsx
 * Ringkasan keranjang: ubah kuantitas, hapus item, lalu lanjut ke checkout.
 */
export default function Keranjang() {
  const { items, updateQty, removeItem, totalItem, totalHarga } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <SectionTitle eyebrow="Keranjang" title="Keranjang Belanja" />
        <div className="mt-10">
          <EmptyState title="Keranjang masih kosong" description="Yuk, jelajahi katalog dan tambahkan produk." />
          <div className="mt-6 text-center">
            <Link to="/produk" className="btn-solid">Mulai Belanja</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
      <SectionTitle eyebrow="Keranjang" title="Keranjang Belanja" description={`${totalItem} item dalam keranjang.`} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Daftar item */}
        <ul className="divide-y divide-ash border-y border-ash">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-ash bg-white p-1.5">
                <img src={item.gambar} alt={item.nama} className="h-full w-full object-contain" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{item.nama}</p>
                <p className="mt-0.5 truncate text-xs text-smoke">
                  {item.varian ? `${item.varian} · ` : ''}{formatRupiah(item.harga)}
                </p>
              </div>

              <div className="flex items-center border border-black">
                <button
                  type="button"
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="px-2.5 py-1.5 leading-none transition-colors hover:bg-black hover:text-white"
                  aria-label="Kurangi"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                <button
                  type="button"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="px-2.5 py-1.5 leading-none transition-colors hover:bg-black hover:text-white"
                  aria-label="Tambah"
                >
                  +
                </button>
              </div>

              <div className="w-28 text-right">
                <p className="text-sm font-semibold text-ink">{formatRupiah(item.harga * item.qty)}</p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="mt-1 text-[11px] uppercase tracking-[0.15em] text-steel underline underline-offset-2 transition-colors hover:text-red-500"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Ringkasan */}
        <div className="h-fit border border-black p-6">
          <p className="eyebrow text-smoke">Ringkasan</p>
          <div className="mt-4 flex justify-between text-sm text-smoke">
            <span>Subtotal · {totalItem} item</span>
            <span>{formatRupiah(totalHarga)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-smoke">
            <span>Ongkir</span>
            <span className="text-steel">Dihitung saat checkout</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-ash pt-4">
            <span className="text-base font-semibold text-ink">Total</span>
            <span className="heading-display text-xl text-ink">{formatRupiah(totalHarga)}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="btn-solid mt-6 w-full"
          >
            Lanjut ke Checkout
          </button>
          <Link to="/produk" className="mt-3 block text-center text-xs uppercase tracking-[0.15em] text-smoke underline underline-offset-2 hover:text-black">
            Lanjut Belanja
          </Link>
        </div>
      </div>
    </section>
  )
}
