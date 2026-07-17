import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="heading-display text-3xl">STORE.</p>
          <p className="mt-4 max-w-xs text-sm text-smoke">
            Etalase koleksi pilihan — dari kebutuhan harian hingga item incaran.
            Belanja dengan mudah, tampilan bersih, fokus pada produk.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="eyebrow mb-1 text-black">Belanja</p>
          <Link to="/" className="text-sm text-smoke hover:text-black">Beranda</Link>
          <Link to="/produk" className="text-sm text-smoke hover:text-black">Semua Produk</Link>
          <Link to="/kategori" className="text-sm text-smoke hover:text-black">Kategori</Link>
          <Link to="/pencarian" className="text-sm text-smoke hover:text-black">Pencarian</Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="eyebrow mb-1 text-black">Informasi</p>
          <Link to="/kebijakan-privasi" className="text-sm text-smoke hover:text-black">Kebijakan Privasi</Link>
          <Link to="/syarat-ketentuan" className="text-sm text-smoke hover:text-black">Syarat &amp; Ketentuan</Link>
        </div>
      </div>

      <div className="border-t border-ash">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} STORE. Seluruh hak cipta dilindungi.</p>
          <p>Data produk oleh FakeStoreAPI.</p>
        </div>
      </div>
    </footer>
  );
}
