/**
 * utils/validation.js
 * Kumpulan fungsi validasi form yang reusable di seluruh aplikasi.
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email) {
  if (!email || !email.trim()) return 'Email wajib diisi'
  if (!EMAIL_REGEX.test(email)) return 'Format email tidak valid'
  return ''
}

export function validatePassword(password) {
  if (!password) return 'Password wajib diisi'
  if (password.length < 8) return 'Password minimal 8 karakter'
  return ''
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Konfirmasi password wajib diisi'
  if (password !== confirmPassword) return 'Password dan konfirmasi password tidak sama'
  return ''
}

export function validateName(name) {
  if (!name || !name.trim()) return 'Nama lengkap wajib diisi'
  if (name.trim().length < 3) return 'Nama minimal 3 karakter'
  return ''
}

export function validateOtp(otp) {
  if (!otp || otp.length !== 6) return 'Kode OTP harus 6 digit'
  if (!/^\d{6}$/.test(otp)) return 'Kode OTP hanya boleh berisi angka'
  return ''
}

// Menghitung "kekuatan" password secara sederhana (0 - 4)
export function getPasswordStrength(password) {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return Math.min(score, 4)
}

export const PASSWORD_STRENGTH_LABELS = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat']
