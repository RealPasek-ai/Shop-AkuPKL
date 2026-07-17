import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import MarqueeBar from './MarqueeBar';
import Footer from './Footer';

/**
 * Layout — kerangka bersama semua halaman publik.
 * Navbar & MarqueeBar sticky di atas, Footer di bawah, konten halaman
 * dirender lewat <Outlet /> (React Router).
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      <Navbar />
      <MarqueeBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
