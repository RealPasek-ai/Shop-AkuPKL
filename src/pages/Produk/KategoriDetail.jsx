import { useParams, Link } from 'react-router-dom'
import { useProducts } from '../../hooks/Dashboard/useProducts'
import ProductCard from '../../components/common/ProductCard'
import SectionTitle from '../../components/common/SectionTitle'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'

/**
 * pages/Produk/KategoriDetail.jsx
 * Produk dalam satu kategori (`/kategori/:nama`). Memakai useProducts(kategori).
 */
export default function KategoriDetail() {
  const { nama } = useParams()
  const kategori = decodeURIComponent(nama)
  const { products, isLoading, error } = useProducts(kategori)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <Link to="/kategori" className="eyebrow text-smoke hover:text-black">‹ Semua Kategori</Link>

      <div className="mt-6">
        <SectionTitle eyebrow="Kategori" title={<span className="capitalize">{kategori}</span>} />
      </div>

      <div className="mt-10">
        {isLoading && <Loader label="Memuat produk..." />}
        {error && <EmptyState title="Gagal memuat produk" description={error} />}
        {!isLoading && !error && products.length === 0 && (
          <EmptyState title="Belum ada produk" description="Kategori ini belum memiliki produk." />
        )}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
