import { Link } from 'react-router-dom'

/**
 * layouts/AuthLayout.jsx
 * Layout split-screen premium untuk semua halaman auth
 * (login, register, forgot-password, verify-otp, reset-password).
 * Sisi kiri: form di atas latar putih bersih.
 * Sisi kanan: panel editorial bertema sepatu dengan aksen ink (hidden di mobile).
 */
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sisi Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-[55%] lg:px-20 xl:px-28">
        <Link to="/" className="mb-10 font-display text-2xl font-bold tracking-wider text-black">
          W<span className="text-ink">M.</span>
        </Link>

        <div className="w-full max-w-md">
          {title && <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl">{title}</h1>}
          {subtitle && <p className="mb-8 text-sm text-smoke">{subtitle}</p>}
          {children}
        </div>
      </div>

      {/* Sisi Editorial - signature visual, disembunyikan di mobile */}
      <div className="relative hidden overflow-hidden bg-cloud lg:block lg:w-[45%]">
        {/* Garis jahitan ink sebagai pembatas panel - motif jahitan sepatu kulit */}
        <div className="absolute inset-y-0 left-0 w-px border-l border-dashed border-ink/40" />

        <div className="relative flex h-full flex-col justify-between p-14">
          <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-smoke">
            <span>Koleksi Terbaru</span>
          </div>

          <div>
            <p className="font-display text-4xl font-bold leading-tight text-black xl:text-5xl">
              Setiap
              <br />
              Outfit
              <br />
              <span className="text-ink">Berkelas.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-smoke">
              produk fashion premium untuk mereka yang memahami detail. Minimalis, tegas, dan berkelas. W<span className="text-ink">M.</span> hadir untuk melengkapi gaya hidup Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
