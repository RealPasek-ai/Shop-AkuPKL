import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const NAV_LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/produk', label: 'Semua Produk' },
  { to: '/kategori', label: 'Kategori' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { totalItem } = useCart();
  const { totalWishlist } = useWishlist();

  function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    // Kosong -> kembali ke katalog Semua Produk; ada isi -> halaman pencarian.
    navigate(trimmed ? `/pencarian?q=${encodeURIComponent(trimmed)}` : '/produk');
    setMenuOpen(false);
  }

  const linkClass = ({ isActive }) =>
    `eyebrow transition-colors hover:text-black ${isActive ? 'text-black' : 'text-smoke'}`;

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-8">
        {/* Logo */}
        <Link to="/" className="heading-display text-2xl tracking-tight">
          WM<span aria-hidden="true">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop search */}
        <form onSubmit={handleSearchSubmit} className="hidden items-center border border-black md:flex">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk..."
            aria-label="Cari produk"
            className="w-56 bg-transparent px-4 py-2 text-sm placeholder:text-steel focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Cari"
            className="border-l border-black px-4 py-2 text-sm font-bold transition-colors hover:bg-black hover:text-white"
          >
            ↵
          </button>
        </form>

        {/* Grup ikon aksi — jarak nyaman, seimbang & elegan */}
        <div className="flex items-center gap-10">
        {/* Wishlist */}
        <Link
          to="/wishlist"
          aria-label="Wishlist"
          className="relative flex items-center text-ink transition-colors hover:text-smoke"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
          </svg>
          {totalWishlist > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white">
              {totalWishlist}
            </span>
          )}
        </Link>

        {/* Keranjang */}
        <Link
          to="/keranjang"
          aria-label="Keranjang"
          className="relative flex items-center text-ink transition-colors hover:text-smoke"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItem > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white">
              {totalItem}
            </span>
          )}
        </Link>

        {/* Akun */}
        <Link
          to="/akun"
          aria-label="Akun"
          className="flex items-center text-ink transition-colors hover:text-smoke"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 0 1 16 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          </svg>
        </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Buka menu"
          aria-expanded={menuOpen}
        >
          <span className={`h-0.5 w-6 bg-black transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-black transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="border-t border-ash bg-white px-4 pb-6 md:hidden">
          <form onSubmit={handleSearchSubmit} className="my-4 flex items-center border border-black">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk..."
              aria-label="Cari produk"
              className="w-full bg-transparent px-4 py-3 text-sm placeholder:text-steel focus:outline-none"
            />
            <button type="submit" className="border-l border-black px-4 py-3 text-sm font-bold">
              ↵
            </button>
          </form>
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
