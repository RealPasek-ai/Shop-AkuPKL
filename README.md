# NOIR — Authentication System (Fashion Store)

Modul **Authentication System** frontend-only (tanpa backend) untuk website
Fashion Store bertema sepatu. Dibangun dengan React + Vite + Tailwind CSS +
React Router DOM. Seluruh "database" disimpan di **LocalStorage** browser.

Project ini murni fokus pada sistem login/autentikasi — tidak ada halaman
Home (landing) atau Profile terpisah. Setelah berhasil login, status sesi
aktif ditampilkan langsung di halaman Login sebagai bukti autentikasi
berjalan, lengkap dengan tombol Logout.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser (otomatis diarahkan ke `/login`).

## Fitur

- Register (dengan validasi real-time & indikator kekuatan password)
- Verifikasi Email via OTP simulasi (kode OTP ditampilkan langsung di layar,
  bukan dikirim ke email sungguhan)
- Login + "Ingat Saya" (session persist di LocalStorage)
- Tampilan status sesi aktif setelah login berhasil, lengkap dengan
  konfirmasi Logout via modal
- Lupa Password → Verify OTP → Reset Password
- Auto-login jika session masih aktif (dicek saat aplikasi dimuat)
- Toast notification & alert untuk feedback aksi
- Countdown OTP 2 menit + tombol Generate OTP Baru
- Desain minimalis premium (hitam · putih · krem) dengan aksen gold,
  responsive penuh

## Struktur Folder

```
src/
  components/   Komponen UI reusable (Button, Input, Modal, Toast, dst)
  pages/        Login, Register, ForgotPassword, VerifyOtp, ResetPassword, NotFound
  layouts/      AuthLayout — layout split-screen untuk seluruh halaman auth
  context/      AuthContext & ToastContext (Context API)
  hooks/        useAuth, useToast, useCountdown (custom hooks)
  utils/        storage.js, hash.js, otp.js, validation.js
  services/     authService.js — seluruh logika bisnis auth
  routes/       AppRoutes.jsx — definisi routing terpusat (root "/" -> /login)
```

## Route

| Path | Halaman |
|---|---|
| `/` | Redirect otomatis ke `/login` |
| `/login` | Form login, atau status sesi aktif jika sudah login |
| `/register` | Form pendaftaran |
| `/forgot-password` | Form lupa password |
| `/verify-otp` | Verifikasi OTP (untuk registrasi maupun reset password) |
| `/reset-password` | Form password baru |
| `*` | Halaman 404 |

## ⚠️ Catatan Penting Soal Keamanan

Project ini **murni simulasi frontend** untuk keperluan demo/belajar:

- Password di-"hash" menggunakan Base64 + salt sederhana di `utils/hash.js`.
  Ini **BUKAN** hashing yang aman (bukan bcrypt/argon2). Jangan gunakan
  pendekatan ini di aplikasi production.
- OTP dan seluruh data user tersimpan di LocalStorage browser — siapa pun
  yang punya akses ke browser tersebut bisa melihat/mengubah data ini lewat
  DevTools. Pada aplikasi sungguhan, autentikasi wajib ditangani di backend
  yang aman dengan database sesungguhnya.
- Verifikasi email OTP di sini hanya simulasi (kode ditampilkan langsung di
  UI), karena project ini sengaja tidak memakai backend/API email apa pun.

## LocalStorage Keys

| Key | Isi |
|---|---|
| `fashion_users` | Array seluruh user terdaftar |
| `fashion_current_user` | Email user yang sedang dalam proses (OTP/reset) |
| `fashion_otp` | Payload OTP aktif (kode, tujuan, waktu kadaluarsa) |
| `fashion_session` | Session login aktif (untuk auto-login) |
