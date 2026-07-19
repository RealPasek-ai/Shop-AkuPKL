import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/Dashboard/useProducts';

export default function Hero() {
  const { products } = useProducts();
  // Kolom gambar produk yang auto-scroll (digandakan agar loop mulus).
  const gambar = products.slice(0, 6).map((p) => p.image);
  const kolom = gambar.length > 0 ? [...gambar, ...gambar] : [];

  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr] md:items-center md:py-24">
        <div className="flex flex-col gap-6">
          <span className="eyebrow text-smoke">Koleksi 2026</span>
          <h1 className="heading-display text-6xl sm:text-7xl md:text-8xl">
            Belanja
            <br />
            Tanpa
            <br />
            Kompromi.
          </h1>
          <p className="max-w-md text-sm text-smoke sm:text-base">
            Pilihan produk terkurasi dengan tampilan bersih dan fokus —
            temukan yang kamu cari tanpa gangguan warna, tanpa basa-basi.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/produk" className="btn-solid">
              Belanja Sekarang
            </Link>
            <Link to="/kategori" className="btn-invert">
              Lihat Kategori
            </Link>
          </div>
        </div>

        {/* Kolom gambar produk auto-scroll ke bawah */}
        <div className="relative h-[380px] overflow-hidden sm:h-[440px]">
          {kolom.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <span className="heading-display text-center text-3xl leading-tight text-ash">
                YOUR
                <br />
                NEXT
                <br />
                FAVORITE
              </span>
            </div>
          ) : (
            <div className="animate-marquee-y flex flex-col gap-3 p-3">
              {kolom.map((src, i) => (
                <div
                  key={i}
                  className="flex aspect-square shrink-0 items-center justify-center bg-white p-8"
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
