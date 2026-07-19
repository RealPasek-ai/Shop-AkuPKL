import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/common/ProductCard'
import SectionTitle from '../components/common/SectionTitle'
import EmptyState from '../components/common/EmptyState'

/**
 * pages/Wishlist.jsx
 * Wishlist publik (storefront) — grid produk favorit, konsisten dengan katalog.
 */
export default function Wishlist() {
  const { items, totalWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <SectionTitle eyebrow="Favorit" title="Wishlist" />
        <div className="mt-10">
          <EmptyState title="Wishlist masih kosong" description="Tandai produk favoritmu dengan ikon ♥ di kartu produk." />
          <div className="mt-6 text-center">
            <Link to="/produk" className="btn-solid">Jelajahi Produk</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionTitle eyebrow="Favorit" title="Wishlist" description={`${totalWishlist} produk tersimpan.`} />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
