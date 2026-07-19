import { useMemo } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import { useProducts } from '../../hooks/Dashboard/useProducts'
import ProductCard from '../../components/common/ProductCard'
import SectionTitle from '../../components/common/SectionTitle'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'

/**
 * pages/Produk/Pencarian.jsx
 * Hasil pencarian produk (`/pencarian?q=...`). Kata kunci berasal dari kotak
 * pencarian Navbar (satu-satunya sumber). Jika query kosong, kembali ke katalog.
 */
export default function Pencarian() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()
  const { products, isLoading, error } = useProducts()

  const kunci = q.toLowerCase()
  const hasil = useMemo(() => {
    if (!kunci) return []
    return products.filter(
      (p) => p.title.toLowerCase().includes(kunci) || p.category.toLowerCase().includes(kunci)
    )
  }, [products, kunci])

  // Search bar kosong -> kembali ke halaman Semua Produk.
  if (!q) return <Navigate to="/produk" replace />

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <SectionTitle eyebrow="Cari" title="Pencarian Produk" />

      <div className="mt-10">
        {isLoading && <Loader label="Memuat produk..." />}
        {error && <EmptyState title="Gagal memuat produk" description={error} />}

        {!isLoading && !error && hasil.length === 0 && (
          <EmptyState title="Tidak ada hasil" description={`Tidak ditemukan produk untuk "${q}".`} />
        )}

        {!isLoading && !error && hasil.length > 0 && (
          <>
            <p className="eyebrow mb-6 text-smoke">{hasil.length} hasil untuk "{q}"</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {hasil.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
