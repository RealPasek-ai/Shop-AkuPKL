import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Input from '../components/Input'
import Button from '../components/Button'
import Alert from '../components/Alert'
import PasswordStrength from '../components/PasswordStrength'
import { useAuth } from '../hooks/useAuth'
import { useGlobalToast } from '../context/ToastContext'
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validation'

/**
 * pages/Register.jsx
 * Form pendaftaran user baru. Validasi real-time per field.
 */
export default function Register() {
  const { register } = useAuth()
  const { showToast } = useGlobalToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFormError('')
  }

  // Validasi real-time saat field kehilangan fokus
  function handleBlur(field) {
    const validators = {
      name: () => validateName(form.name),
      email: () => validateEmail(form.email),
      password: () => validatePassword(form.password),
      confirmPassword: () => validateConfirmPassword(form.password, form.confirmPassword),
    }
    setErrors((prev) => ({ ...prev, [field]: validators[field]() }))
  }

  function validateAll() {
    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    }
    setErrors(newErrors)
    return Object.values(newErrors).every((e) => !e)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!validateAll()) return

    setIsLoading(true)
    // Simulasi loading proses register
    setTimeout(() => {
      try {
        register({ name: form.name, email: form.email, password: form.password })
        showToast('Akun berhasil dibuat! Silakan verifikasi email Anda.', 'success')
        navigate('/verify-otp')
      } catch (err) {
        setFormError(err.message)
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <AuthLayout title="Buat Akun Baru" subtitle="Bergabung dan mulai belanja Outfit pilihan Anda.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Alert type="error" message={formError} />

        <Input
          label="Nama Lengkap"
          name="name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          error={errors.name}
          placeholder="Nama lengkap Anda"
          autoComplete="name"
        />
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
        <div>
          <Input
            label="Password"
            type="password"
            name="password"
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
          label="Konfirmasi Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          onBlur={() => handleBlur('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="Ulangi password Anda"
          autoComplete="new-password"
        />

        <Button type="submit" isLoading={isLoading} className="mt-2">
          Daftar Sekarang
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-500">
        Sudah punya akun?{' '}
        <Link to="/login" className="font-medium text-gold hover:underline">
          Masuk di sini
        </Link>
      </p>
    </AuthLayout>
  )
}
