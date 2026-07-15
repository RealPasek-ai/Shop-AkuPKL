/**
 * utils/otp.js
 * Utility untuk generate & mengelola masa berlaku kode OTP simulasi.
 */

export const OTP_DURATION_SECONDS = 120 // 2 menit

// Generate 6 digit angka acak, contoh: "482913"
export function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Bentuk objek OTP lengkap dengan waktu kadaluarsa
export function createOtpPayload(email, purpose = 'verify-email') {
  return {
    email,
    code: generateOtpCode(),
    purpose, // 'verify-email' | 'reset-password'
    expiresAt: Date.now() + OTP_DURATION_SECONDS * 1000,
  }
}

export function isOtpExpired(otpPayload) {
  if (!otpPayload) return true
  return Date.now() > otpPayload.expiresAt
}

// Sisa detik sebelum OTP kadaluarsa (untuk countdown)
export function getRemainingSeconds(otpPayload) {
  if (!otpPayload) return 0
  const remaining = Math.floor((otpPayload.expiresAt - Date.now()) / 1000)
  return remaining > 0 ? remaining : 0
}
