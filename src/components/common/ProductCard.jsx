import { Link } from 'react-router-dom';
import Rating from './Rating';
import { hargaProdukRupiah } from '../../utils/format';
import { useWishlist } from '../../context/WishlistContext';

/**
 * ProductCard
 * Elemen signature halaman ini: saat hover, kartu membalik palet
 * dari putih-di-atas-hitam menjadi hitam-di-atas-putih (invert),
 * memberi kesan "spotlight" khas etalase sneaker tanpa memakai warna.
 */
export default function ProductCard({ product }) {
  const { id, title, price, image, category, rating } = product;
  const { isWishlisted, toggle } = useWishlist();
  const disukai = isWishlisted(id);

  return (
    <Link
      to={`/produk/${id}`}
      className="group relative flex flex-col border border-ash transition-colors duration-300 hover:border-black hover:bg-black"
    >
      <span className="eyebrow absolute left-3 top-3 z-10 text-smoke group-hover:text-white/60">
        {category}
      </span>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(product);
        }}
        aria-label={disukai ? 'Hapus dari wishlist' : 'Simpan ke wishlist'}
        aria-pressed={disukai}
        className="absolute right-3 top-3 z-10 text-lg leading-none text-ink transition-transform hover:scale-125"
      >
        {disukai ? '♥' : '♡'}
      </button>

      <div className="flex aspect-square items-center justify-center overflow-hidden bg-white p-8">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-ash p-4 group-hover:border-white/10">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-ink group-hover:text-white">
          {title}
        </h3>
        <Rating rate={rating?.rate} count={rating?.count} />
        <p className="heading-display mt-1 text-xl text-ink group-hover:text-white">
          {hargaProdukRupiah(price)}
        </p>
      </div>
    </Link>
  );
}
