/**
 * services/authService.js
 * -----------------------------------------------------------------------
 * Seluruh logika bisnis autentikasi ada di sini (bukan di komponen React).
 * Ini membuat komponen tetap bersih dan logika mudah di-testing/reuse.
 * Semua "database" adalah LocalStorage lewat utils/storage.js
 * -----------------------------------------------------------------------
 */

import { storage } from '../utils/storage'
import { simpleHash, verifyHash } from '../utils/hash'
import { createOtpPayload, isOtpExpired } from '../utils/otp'

function generateId() {
  return `usr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function findUserByEmail(email) {
  const users = storage.getUsers()
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export const authService = {
  /**
   * REGISTER
   * Membuat user baru, menyimpan password ter-"hash", lalu men-generate OTP.
   */
  register({ name, email, password }) {
    const existing = findUserByEmail(email)
    if (existing) {
      throw new Error('Email sudah digunakan, silakan gunakan email lain')
    }

    const newUser = {
      id: generateId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: simpleHash(password),
      createdAt: new Date().toISOString(),
      isVerified: false,
    }

    const users = storage.getUsers()
    storage.setUsers([...users, newUser])

    // Generate OTP untuk verifikasi email & simpan target proses saat ini
    const otp = createOtpPayload(newUser.email, 'verify-email')
    storage.setOtp(otp)
    storage.setCurrentUser(newUser.email)

    return { user: newUser, otp }
  },

  /**
   * LOGIN
   * Validasi kredensial, cek status verifikasi, lalu buat session.
   */
  login({ email, password, rememberMe }) {
    const user = findUserByEmail(email)
    if (!user) {
      throw new Error('Email belum terdaftar')
    }
    if (!verifyHash(password, user.passwordHash)) {
      throw new Error('Password yang Anda masukkan salah')
    }
    if (!user.isVerified) {
      // Kirim balik kode khusus supaya UI bisa redirect ke verify-otp
      storage.setCurrentUser(user.email)
      const err = new Error('Akun belum diverifikasi. Silakan verifikasi email Anda terlebih dahulu')
      err.code = 'UNVERIFIED'
      throw err
    }

    const session = {
      userId: user.id,
      email: user.email,
      rememberMe: !!rememberMe,
      loginAt: new Date().toISOString(),
    }
    storage.setSession(session)
    storage.setCurrentUser(user.email)

    return { user, session }
  },

  logout() {
    storage.clearSession()
    storage.clearCurrentUser()
  },

  /**
   * Ambil user yang sedang login dari session aktif (untuk auto-login/protected route)
   */
  getLoggedInUser() {
    const session = storage.getSession()
    if (!session) return null
    const users = storage.getUsers()
    return users.find((u) => u.id === session.userId) || null
  },

  /**
   * GENERATE ULANG OTP (dipakai di verify-otp & forgot-password)
   */
  regenerateOtp(email, purpose = 'verify-email') {
    const user = findUserByEmail(email)
    if (!user) {
      throw new Error('Email tidak ditemukan')
    }
    const otp = createOtpPayload(email, purpose)
    storage.setOtp(otp)
    return otp
  },

  /**
   * VERIFY OTP
   * Memvalidasi kode OTP terhadap payload yang tersimpan.
   * Jika purpose = verify-email -> set isVerified true
   * Jika purpose = reset-password -> hanya validasi, reset dilakukan di step selanjutnya
   */
  verifyOtp({ email, code }) {
    const otpPayload = storage.getOtp()

    if (!otpPayload || otpPayload.email.toLowerCase() !== email.toLowerCase()) {
      throw new Error('Sesi OTP tidak ditemukan, silakan generate OTP baru')
    }
    if (isOtpExpired(otpPayload)) {
      const err = new Error('Kode OTP sudah kadaluarsa, silakan generate OTP baru')
      err.code = 'EXPIRED'
      throw err
    }
    if (otpPayload.code !== code) {
      throw new Error('Kode OTP yang Anda masukkan salah')
    }

    if (otpPayload.purpose === 'verify-email') {
      const users = storage.getUsers()
      const updated = users.map((u) =>
        u.email.toLowerCase() === email.toLowerCase() ? { ...u, isVerified: true } : u
      )
      storage.setUsers(updated)
      storage.clearOtp()
    }

    return { purpose: otpPayload.purpose }
  },

  /**
   * FORGOT PASSWORD
   * Cari user, generate OTP baru dengan purpose reset-password.
   */
  forgotPassword(email) {
    const user = findUserByEmail(email)
    if (!user) {
      throw new Error('Email tidak terdaftar di sistem kami')
    }
    const otp = createOtpPayload(user.email, 'reset-password')
    storage.setOtp(otp)
    storage.setCurrentUser(user.email)
    return otp
  },

  /**
   * RESET PASSWORD
   * Dipanggil setelah OTP reset-password berhasil diverifikasi.
   */
  resetPassword({ email, newPassword }) {
    const users = storage.getUsers()
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!exists) {
      throw new Error('User tidak ditemukan')
    }
    const updated = users.map((u) =>
      u.email.toLowerCase() === email.toLowerCase()
        ? { ...u, passwordHash: simpleHash(newPassword) }
        : u
    )
    storage.setUsers(updated)
    storage.clearOtp()
    storage.clearCurrentUser()
  },
}
