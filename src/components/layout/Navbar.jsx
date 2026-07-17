import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Beranda' },
  { to: '/produk', label: 'Semua Produk' },
  { to: '/kategori', label: 'Kategori' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/pencarian?q=${encodeURIComponent(trimmed)}`);
      setMenuOpen(false);
    }
  }

  const linkClass = ({ isActive }) =>
    `eyebrow transition-colors hover:text-black ${isActive ? 'text-black' : 'text-smoke'}`;

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-8">
        {/* Logo */}
        <Link to="/" className="heading-display text-2xl tracking-tight">
          STORE<span aria-hidden="true">.</span>
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
