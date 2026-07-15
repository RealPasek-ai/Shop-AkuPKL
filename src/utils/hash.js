/**
 * utils/hash.js
 * -----------------------------------------------------------------------
 * !! PENTING - BACA INI !!
 * Fungsi di bawah ini HANYA SIMULASI untuk kebutuhan demo frontend-only.
 * Ini BUKAN algoritma hashing yang aman (bukan bcrypt/argon2/scrypt).
 * Karena project ini tidak memiliki backend, "hashing" di sini hanya
 * memakai Base64 encoding + salt sederhana agar password tidak tersimpan
 * sebagai plain text mentah di LocalStorage.
 *
 * Pada aplikasi production sungguhan, hashing password WAJIB dilakukan
 * di server menggunakan algoritma seperti bcrypt/argon2, LENGKAP dengan
 * salt unik per user dan disimpan di database yang aman — BUKAN di
 * LocalStorage browser client.
 * -----------------------------------------------------------------------
 */

const SIMULATED_SALT = 'noir-fashion-store-salt'

// "Hash" sederhana: gabungkan salt + password lalu encode Base64
export function simpleHash(plainText) {
  const salted = `${SIMULATED_SALT}:${plainText}:${SIMULATED_SALT}`
  return btoa(unescape(encodeURIComponent(salted)))
}

// Verifikasi password dengan membandingkan hasil hash
export function verifyHash(plainText, hashedValue) {
  return simpleHash(plainText) === hashedValue
}
