import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import SectionTitle from '../common/SectionTitle';

export default function CategoryGrid() {
  const { categories, isLoading } = useCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
      <SectionTitle
        eyebrow="Jelajahi"
        title="Belanja per Kategori"
        description="Langsung menuju bagian yang kamu minati."
      />

      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-ash bg-ash md:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse bg-cloud" />
            ))
          : categories.map((cat) => (
              <Link
                key={cat}
                to={`/kategori/${encodeURIComponent(cat)}`}
                className="group relative flex aspect-square flex-col items-center justify-center gap-2 bg-white p-4 text-center transition-colors duration-300 hover:bg-black"
              >
                <span className="heading-display text-xl capitalize text-ink group-hover:text-white sm:text-2xl">
                  {cat}
                </span>
                <span className="eyebrow text-smoke group-hover:text-white/60">Lihat semua →</span>
              </Link>
            ))}
      </div>
    </section>
  );
}
