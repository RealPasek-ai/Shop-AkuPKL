import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/Input'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { useGlobalToast } from '../context/ToastContext'
import { authService } from '../services/authService'
import { validateEmail } from '../utils/validation'

/**
 * pages/ForgotPassword.jsx
 * User memasukkan email, sistem generate OTP baru dengan purpose reset-password,
 * lalu arahkan ke halaman verify-otp.
 */
export default function ForgotPassword() {
  const navigate = useNavigate()
  const { showToast } = useGlobalToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const validationError = validateEmail(email)
    setError(validationError)
    if (validationError) return

    setIsLoading(true)
    setTimeout(() => {
      try {
        authService.forgotPassword(email)
        showToast('Kode OTP reset password telah dibuat.', 'success')
        navigate('/verify-otp')
      } catch (err) {
        setFormError(err.message)
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <AuthLayout
      title="Lupa Password"
      subtitle="Masukkan email terdaftar Anda, kami akan kirimkan kode verifikasi."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Alert type="error" message={formError} />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          onBlur={() => setError(validateEmail(email))}
          error={error}
          placeholder="nama@email.com"
          autoComplete="email"
        />

        <Button type="submit" isLoading={isLoading} className="mt-2">
          Kirim Kode OTP
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-500">
        Ingat password Anda?{' '}
        <Link to="/login" className="font-medium text-gold hover:underline">
          Kembali ke Masuk
        </Link>
      </p>
    </AuthLayout>
  )
}
