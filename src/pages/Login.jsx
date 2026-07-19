import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/Login/Input'
import Button from '../components/Button'
import Alert from '../components/Login/Alert'
import Card from '../components/Card'
import Modal from '../components/Login/Modal'
import { useAuth } from '../hooks/Login/useAuth'
import { useGlobalToast } from '../context/ToastContext'
import { validateEmail, validatePassword } from '../utils/validation'

/**
 * pages/Login.jsx
 * Form login dengan validasi, opsi "Ingat Saya", dan redirect ke verify-otp
 * jika akun belum terverifikasi.
 *
 * Karena project ini murni modul Authentication System (tanpa halaman
 * Home/Profile terpisah), begitu user berhasil login, halaman ini
 * menampilkan status sesi aktif secara langsung sebagai bukti bahwa
 * autentikasi berjalan — lengkap dengan tombol Logout.
 */
export default function Login() {
  const { login, logout, currentUser, isAuthenticated } = useAuth()
  const { showToast } = useGlobalToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFormError('')
  }

  function handleBlur(field) {
    const validators = {
      email: () => validateEmail(form.email),
      password: () => validatePassword(form.password),
    }
    setErrors((prev) => ({ ...prev, [field]: validators[field]() }))
  }

  function validateAll() {
    const newErrors = { email: validateEmail(form.email), password: validatePassword(form.password) }
    setErrors(newErrors)
    return Object.values(newErrors).every((e) => !e)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!validateAll()) return

    setIsLoading(true)
    setTimeout(() => {
      try {
        login({ email: form.email, password: form.password, rememberMe: form.rememberMe })
        showToast('Berhasil masuk. Selamat datang kembali!', 'success')
        setIsLoading(false)
        navigate(location.state?.from || '/', { replace: true })
      } catch (err) {

        if (err.code === 'UNVERIFIED') {
          navigate('/verify-otp')
          return
        }
        setFormError(err.message)
        setIsLoading(false)
      }
    }, 800)
  }

  function confirmLogout() {
    logout()
    setShowLogoutModal(false)
    showToast('Anda berhasil keluar.', 'info')
  }

  // ---------- Tampilan saat sudah login (sesi aktif) ----------
  if (isAuthenticated && currentUser) {
    const joinDate = new Date(currentUser.createdAt).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    return (
      <AuthLayout title="Anda Sudah Masuk" subtitle="Sesi login Anda sedang aktif.">
        <Card>
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-lg font-bold text-white">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-base font-semibold text-black">{currentUser.name}</p>
              <p className="text-sm text-smoke">{currentUser.email}</p>
            </div>
          </div>

          <div className="space-y-3 border-t border-ash pt-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-smoke">Tanggal Registrasi</span>
              <span className="font-medium text-black">{joinDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-smoke">Status Verifikasi</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Terverifikasi
              </span>
            </div>
          </div>

          <Button variant="primary" onClick={() => navigate('/akun')} className="mt-6">
            Masuk ke Akun Saya
          </Button>
          <Button variant="secondary" onClick={() => setShowLogoutModal(true)} className="mt-3">
            Keluar
          </Button>
        </Card>

        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          title="Konfirmasi Keluar"
        >
          <p className="mb-6 text-sm text-smoke">
            Apakah Anda yakin ingin keluar dari akun Anda?
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={confirmLogout}>
              Ya, Keluar
            </Button>
          </div>
        </Modal>
      </AuthLayout>
    )
  }

  // ---------- Tampilan form login (belum login) ----------
  return (
    <AuthLayout title="Selamat Datang Kembali" subtitle="Masuk untuk melanjutkan.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Alert type="error" message={formError} />

        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          error={errors.email}
          placeholder="nama@email.com"
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          error={errors.password}
          placeholder="Password Anda"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-smoke">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={(e) => handleChange('rememberMe', e.target.checked)}
              className="h-4 w-4 border-ash bg-white accent-ink"
            />
            Ingat Saya
          </label>
          <Link to="/forgot-password" className="text-sm text-ink-soft hover:text-ink hover:underline">
            Lupa password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-2">
          Masuk
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-smoke">
        Belum punya akun?{' '}
        <Link to="/register" className="font-medium text-ink hover:underline">
          Daftar sekarang
        </Link>
      </p>
    </AuthLayout>
  )
}
