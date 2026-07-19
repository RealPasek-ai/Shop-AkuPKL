import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/Login/Input'
import Button from '../components/Button'
import Alert from '../components/Login/Alert'
import PasswordStrength from '../components/Login/PasswordStrength'
import { useGlobalToast } from '../context/ToastContext'
import { authService } from '../services/authService'
import { storage } from '../utils/storage'
import { validatePassword, validateConfirmPassword } from '../utils/validation'

/**
 * pages/ResetPassword.jsx
 * Halaman final dari flow forgot-password: user set password baru.
 * Hanya bisa diakses setelah OTP reset-password berhasil diverifikasi
 * (ditandai dengan adanya fashion_current_user di localStorage).
 */
export default function ResetPassword() {
  const navigate = useNavigate()
  const { showToast } = useGlobalToast()
  const email = storage.getCurrentUser()

  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
    }
  }, [email, navigate])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFormError('')
  }

  function handleBlur(field) {
    const validators = {
      password: () => validatePassword(form.password),
      confirmPassword: () => validateConfirmPassword(form.password, form.confirmPassword),
    }
    setErrors((prev) => ({ ...prev, [field]: validators[field]() }))
  }

  function validateAll() {
    const newErrors = {
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    }
    setErrors(newErrors)
    return Object.values(newErrors).every((e) => !e)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!validateAll()) return

    setIsLoading(true)
    setTimeout(() => {
      try {
        authService.resetPassword({ email, newPassword: form.password })
        showToast('Password berhasil diperbarui. Silakan masuk.', 'success')
        navigate('/login')
      } catch (err) {
        setFormError(err.message)
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <AuthLayout title="Atur Password Baru" subtitle="Buat password baru yang kuat dan mudah diingat.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Alert type="error" message={formError} />

        <div>
          <Input
            label="Password Baru"
            type="password"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={errors.password}
            placeholder="Minimal 8 karakter"
            autoComplete="new-password"
          />
          <PasswordStrength password={form.password} />
        </div>

        <Input
          label="Konfirmasi Password Baru"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          onBlur={() => handleBlur('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="Ulangi password baru"
          autoComplete="new-password"
        />

        <Button type="submit" isLoading={isLoading} className="mt-2">
          Simpan Password Baru
        </Button>
      </form>
    </AuthLayout>
  )
}
