import { Component } from 'react'

/**
 * components/common/ErrorBoundary.jsx
 * Jaring pengaman global: menangkap error render di seluruh pohon komponen
 * agar satu error tidak membuat seluruh halaman blank (layar putih).
 * Menampilkan fallback bergaya WM. + tombol untuk memuat ulang.
 *
 * Catatan: error boundary WAJIB berupa class component — belum ada padanan hook-nya.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Titik integrasi logging (mis. Sentry) bisa ditambahkan tim lain di sini.
    console.error('ErrorBoundary menangkap error:', error, info)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 text-center">
        <p className="mb-10 font-display text-2xl font-bold tracking-wider text-black">
          W<span className="text-ink">M.</span>
        </p>

        <p className="font-display text-7xl font-extrabold text-ash sm:text-8xl">Oops</p>
        <h1 className="-mt-4 text-2xl font-bold text-black sm:text-3xl">Terjadi Kesalahan</h1>
        <p className="mt-3 max-w-sm text-sm text-smoke">
          Maaf, ada yang tidak beres saat menampilkan halaman ini. Coba muat ulang —
          jika masih terjadi, kembali beberapa saat lagi.
        </p>

        <button
          type="button"
          onClick={this.handleReload}
          className="mt-8 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
        >
          Muat Ulang Halaman
        </button>
      </div>
    )
  }
}
