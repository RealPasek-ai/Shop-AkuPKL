import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="border-b border-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr] md:items-end md:py-24">
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

        <div className="flex aspect-[4/5] items-center justify-center border border-black bg-cloud">
          <span className="heading-display px-6 text-center text-3xl leading-tight text-ash">
            YOUR
            <br />
            NEXT
            <br />
            FAVORITE
          </span>
        </div>
      </div>
    </section>
  );
}
