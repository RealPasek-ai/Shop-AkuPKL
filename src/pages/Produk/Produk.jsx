import { useProducts } from '../../hooks/Dashboard/useProducts'
import ProductCard from '../../components/common/ProductCard'
import SectionTitle from '../../components/common/SectionTitle'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'

/**
 * pages/Produk/Produk.jsx
 * Katalog seluruh produk. Data diambil dari FakeStore via useProducts,
 * ditampilkan dalam grid ProductCard yang konsisten dengan Home.
 */
export default function Produk() {
  const { products, isLoading, error } = useProducts()

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
      <SectionTitle
        eyebrow="Katalog"
        title="Semua Produk"
        description="Jelajahi seluruh koleksi terkurasi kami."
      />

      <div className="mt-10">
        {isLoading && <Loader label="Memuat produk..." />}
        {error && <EmptyState title="Gagal memuat produk" description={error} />}
        {!isLoading && !error && products.length === 0 && (
          <EmptyState title="Belum ada produk" description="Produk akan tampil di sini." />
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
