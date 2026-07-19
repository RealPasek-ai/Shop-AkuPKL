import { Link } from 'react-router-dom'
import { useCategories } from '../../hooks/Dashboard/useCategories'
import SectionTitle from '../../components/common/SectionTitle'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'

/**
 * pages/Produk/Kategori.jsx
 * Indeks kategori (`/kategori`). Menampilkan seluruh kategori sebagai grid;
 * tiap kategori menuju `/kategori/:nama`.
 */
export default function Kategori() {
  const { categories, isLoading } = useCategories()

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
      <SectionTitle
        eyebrow="Jelajahi"
        title="Kategori"
        description="Pilih kategori untuk menelusuri produk."
      />

      <div className="mt-10">
        {isLoading && <Loader label="Memuat kategori..." />}
        {!isLoading && categories.length === 0 && (
          <EmptyState title="Belum ada kategori" description="Kategori akan tampil di sini." />
        )}
        {!isLoading && categories.length > 0 && (
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-ash bg-ash md:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/kategori/${encodeURIComponent(cat)}`}
                className="group flex aspect-square flex-col items-center justify-center gap-2 bg-white p-4 text-center transition-colors duration-300 hover:bg-black"
              >
                <span className="heading-display text-xl capitalize text-ink group-hover:text-white sm:text-2xl">
                  {cat}
                </span>
                <span className="eyebrow text-smoke group-hover:text-white/60">Lihat semua →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
