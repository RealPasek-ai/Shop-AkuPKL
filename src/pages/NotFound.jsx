import { Link } from 'react-router-dom'

/**
 * pages/NotFound.jsx
 * Halaman 404 standalone (tanpa Navbar) yang tetap konsisten dengan
 * tema minimalis premium modul Authentication System ini.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-paper px-6 text-center">
      <Link to="/login" className="mb-10 font-display text-2xl font-bold tracking-wider text-ink">
        NOIR<span className="text-gold">.</span>
      </Link>

      <p className="font-display text-8xl font-extrabold text-stone-200 sm:text-9xl">404</p>
      <h1 className="-mt-6 text-2xl font-bold text-ink sm:text-3xl">Halaman Tidak Ditemukan</h1>
      <p className="mt-3 max-w-sm text-sm text-stone-500">
        Sepertinya langkah Anda membawa ke tempat yang salah. Mari kembali ke jalur yang benar.
      </p>
      <Link
        to="/login"
        className="mt-8 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-ink-soft"
      >
        Kembali ke Login
      </Link>
    </div>
  )
}
