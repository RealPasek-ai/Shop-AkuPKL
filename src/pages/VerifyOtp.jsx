import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import OtpInput from '../components/Login/OtpInput'
import Button from '../components/Button'
import Alert from '../components/Login/Alert'
import { useCountdown } from '../hooks/Login/useCountdown'
import { useGlobalToast } from '../context/ToastContext'
import { authService } from '../services/authService'
import { storage } from '../utils/storage'
import { validateOtp } from '../utils/validation'
import { OTP_DURATION_SECONDS, getRemainingSeconds } from '../utils/otp'

/**
 * pages/VerifyOtp.jsx
 * Halaman verifikasi OTP simulasi. Menampilkan kode OTP langsung di layar
 * (menggantikan pengiriman email sungguhan) lengkap dengan countdown 2 menit.
 */
export default function VerifyOtp() {
  const navigate = useNavigate()
  const { showToast } = useGlobalToast()
  const email = storage.getCurrentUser()

  const [otpPayload, setOtpPayload] = useState(() => storage.getOtp())
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const initialRemaining = otpPayload ? getRemainingSeconds(otpPayload) : 0
  const { secondsLeft, isExpired, formatted, reset } = useCountdown(initialRemaining)

  // Jika tidak ada email/OTP aktif (misal user akses langsung URL ini), arahkan ke register
  useEffect(() => {
    if (!email) {
      navigate('/register')
    }
  }, [email, navigate])

  function handleGenerateNewOtp() {
    setIsResending(true)
    setError('')
    setTimeout(() => {
      const purpose = otpPayload?.purpose || 'verify-email'
      const newOtp = authService.regenerateOtp(email, purpose)
      setOtpPayload(newOtp)
      reset(OTP_DURATION_SECONDS)
      setCode('')
      setIsResending(false)
      showToast('Kode OTP baru berhasil dibuat.', 'success')
    }, 600)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const validationError = validateOtp(code)
    if (validationError) {
      setError(validationError)
      return
    }
    if (isExpired) {
      setError('Kode OTP sudah kadaluarsa, silakan generate OTP baru')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      try {
        const { purpose } = authService.verifyOtp({ email, code })
        setIsLoading(false)
        if (purpose === 'verify-email') {
          showToast('Email berhasil diverifikasi. Silakan masuk.', 'success')
          navigate('/login')
        } else {
          showToast('Verifikasi berhasil. Silakan atur password baru.', 'success')
          navigate('/reset-password')
        }
      } catch (err) {
        setIsLoading(false)
        if (err.code === 'EXPIRED') {
          setError(err.message)
        } else {
          setError(err.message)
        }
      }
    }, 700)
  }

  return (
    <AuthLayout
      title="Verifikasi Email"
      subtitle="Masukkan 6 digit kode OTP untuk melanjutkan."
    >
      {/* Simulasi Email Box */}
      <div className="mb-6 border border-dashed border-ink/40 bg-cloud/40 p-4 animate-fadeIn">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
          📩 Simulasi Email
        </p>
        <p className="text-sm text-ink-soft">
          Kode OTP Anda adalah:{' '}
          <span className="text-lg font-bold tracking-[0.2em] text-black">
            {otpPayload?.code || '------'}
          </span>
        </p>
        <p className="mt-1.5 text-xs text-smoke">
          Pada aplikasi sebenarnya, kode ini dikirim melalui email ke <strong className="text-ink-soft">{email}</strong>.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Alert type="error" message={error} />

        <OtpInput value={code} onChange={setCode} error="" />

        <div className="flex items-center justify-between text-sm">
          <span className={isExpired ? 'text-red-500' : 'text-smoke'}>
            {isExpired ? 'Kode OTP kadaluarsa' : `Kode berlaku: ${formatted}`}
          </span>
          <button
            type="button"
            onClick={handleGenerateNewOtp}
            disabled={isResending}
            className="font-medium text-ink hover:underline disabled:opacity-50"
          >
            {isResending ? 'Mengirim...' : 'Generate OTP Baru'}
          </button>
        </div>

        <Button type="submit" isLoading={isLoading} disabled={isExpired}>
          Verifikasi
        </Button>
      </form>
    </AuthLayout>
  )
}
