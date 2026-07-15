/**
 * utils/storage.js
 * -----------------------------------------------------------------------
 * Sentralisasi seluruh akses LocalStorage agar key tidak berantakan
 * dan mudah di-maintain. Semua modul lain WAJIB mengakses LocalStorage
 * lewat file ini, bukan langsung memanggil localStorage.getItem/setItem.
 * -----------------------------------------------------------------------
 */

export const STORAGE_KEYS = {
  USERS: 'fashion_users',
  CURRENT_USER: 'fashion_current_user',
  OTP: 'fashion_otp',
  SESSION: 'fashion_session',
}

// Ambil data JSON dari localStorage dengan aman (fallback jika rusak/kosong)
function getItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch (error) {
    console.error(`Gagal membaca localStorage key "${key}"`, error)
    return fallback
  }
}

// Simpan data JSON ke localStorage dengan aman
function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Gagal menulis localStorage key "${key}"`, error)
  }
}

function removeItem(key) {
  localStorage.removeItem(key)
}

export const storage = {
  // ---------- Users ----------
  getUsers: () => getItem(STORAGE_KEYS.USERS, []),
  setUsers: (users) => setItem(STORAGE_KEYS.USERS, users),

  // ---------- Current user pointer (email yang sedang diproses OTP dll) ----------
  getCurrentUser: () => getItem(STORAGE_KEYS.CURRENT_USER, null),
  setCurrentUser: (email) => setItem(STORAGE_KEYS.CURRENT_USER, email),
  clearCurrentUser: () => removeItem(STORAGE_KEYS.CURRENT_USER),

  // ---------- OTP ----------
  getOtp: () => getItem(STORAGE_KEYS.OTP, null),
  setOtp: (otpData) => setItem(STORAGE_KEYS.OTP, otpData),
  clearOtp: () => removeItem(STORAGE_KEYS.OTP),

  // ---------- Session (login) ----------
  getSession: () => getItem(STORAGE_KEYS.SESSION, null),
  setSession: (sessionData) => setItem(STORAGE_KEYS.SESSION, sessionData),
  clearSession: () => removeItem(STORAGE_KEYS.SESSION),
}
