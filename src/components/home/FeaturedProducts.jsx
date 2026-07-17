import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../common/ProductCard';
import SectionTitle from '../common/SectionTitle';
import Loader from '../common/Loader';
import EmptyState from '../common/EmptyState';

export default function FeaturedProducts() {
  const { products, isLoading, error } = useProducts();
  const featured = products.slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle eyebrow="Pilihan Kami" title="Produk Unggulan" />
        <Link to="/produk" className="eyebrow border-b border-black pb-1 hover:text-smoke">
          Lihat Semua Produk →
        </Link>
      </div>

      <div className="mt-10">
        {isLoading && <Loader label="Memuat produk unggulan..." />}
        {error && <EmptyState title="Gagal memuat" description={error} />}
        {!isLoading && !error && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
