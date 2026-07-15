import { Link } from 'react-router-dom'

/**
 * layouts/AuthLayout.jsx
 * Layout split-screen premium untuk semua halaman auth
 * (login, register, forgot-password, verify-otp, reset-password).
 * Sisi kiri: form di atas latar putih bersih.
 * Sisi kanan: panel editorial bertema sepatu dengan aksen gold (hidden di mobile).
 */
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen w-full bg-paper">
      {/* Sisi Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-[55%] lg:px-20 xl:px-28">
        <Link to="/" className="mb-10 font-display text-2xl font-bold tracking-wider text-ink">
          W<span className="text-gold">M.</span>
        </Link>

        <div className="w-full max-w-md">
          {title && <h1 className="mb-2 text-2xl font-bold text-ink sm:text-3xl">{title}</h1>}
          {subtitle && <p className="mb-8 text-sm text-stone-500">{subtitle}</p>}
          {children}
        </div>
      </div>

      {/* Sisi Editorial - signature visual, disembunyikan di mobile */}
      <div className="relative hidden overflow-hidden bg-paper-soft lg:block lg:w-[45%]">
        {/* Garis jahitan gold sebagai pembatas panel - motif jahitan sepatu kulit */}
        <div className="absolute inset-y-0 left-0 w-px border-l border-dashed border-gold/40" />

        <div className="relative flex h-full flex-col justify-between p-14">
          <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-stone-500">
            <span>Koleksi Terbaru</span>
          </div>

         

          <div>
            <p className="font-display text-4xl font-bold leading-tight text-ink xl:text-5xl">
              Setiap
              <br />
              Outfit
              <br />
              <span className="text-gold">Berkelas.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-stone-500">
              produk fashion premium untuk mereka yang memahami detail. Minimalis, tegas, dan berkelas. W<span className="text-gold">M.</span> hadir untuk melengkapi gaya hidup Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Ilustrasi garis kontur sepatu sederhana sebagai elemen visual signature,
// dengan titik-titik eyelet berwarna gold layaknya hardware sepatu kulit.
function ShoeSilhouette() {
  return (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <path
        d="M40 170 C40 150 55 140 75 138 C95 136 100 120 120 110 C145 97 175 92 205 95 C230 97 245 85 265 80 C290 74 320 78 340 95 C355 108 360 125 358 140 C356 158 340 168 320 170 L60 172 C48 172 40 172 40 170 Z"
        stroke="#14110F"
        strokeOpacity="0.8"
        strokeWidth="1.5"
      />
      <path
        d="M120 110 C130 125 150 135 175 138 M205 95 C215 108 235 118 258 120"
        stroke="#14110F"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <line x1="40" y1="170" x2="358" y2="170" stroke="#14110F" strokeOpacity="0.8" strokeWidth="1.5" />
      <circle cx="150" cy="118" r="2.5" fill="#A87C2E" />
      <circle cx="180" cy="112" r="2.5" fill="#A87C2E" />
      <circle cx="210" cy="108" r="2.5" fill="#A87C2E" />
    </svg>
  )
}
