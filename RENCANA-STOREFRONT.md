# Rencana: Menyamakan Alur Shop-AkuPKL dengan React-Store

> Referensi: `C:\Users\Gustu\React-Store` (jalan di `http://localhost:5174`)
> Keputusan: **URL dipertahankan Bahasa Indonesia** (sesuai Navbar yang sudah ada).
> Dokumen ini rencana — belum ada kode fungsional yang ditulis.

---

## 1. Alur target (dari React-Store)

```
Home → Produk / Kategori → Detail Produk → +Keranjang → Keranjang
     → Checkout 🔒 → Pilih Pembayaran 🔒 → Status 🔒 → Invoice 🔒 → Akun/Pesanan
```

Semua halaman publik dibungkus satu `<Layout>` (Navbar + MarqueeBar + Footer).
Ditopang provider global: **Toast · Auth · Wishlist · Cart** (referensi juga punya Currency — opsional).
`ProtectedRoute` menjaga checkout, payment, dan akun.

---

## 2. Peta URL final (konvensi Indonesia)

| Fitur | React-Store | Shop-AkuPKL (rencana) | Halaman | Status |
|---|---|---|---|---|
| Home | `/` | `/home` | `pages/Home.jsx` | ✅ ada |
| Daftar produk | `/products` | `/produk` | `pages/Produk/Produk.jsx` | ❌ buat |
| Kategori | `/category/:name` | `/kategori`, `/kategori/:nama` | `pages/Produk/Kategori.jsx` | ❌ buat |
| Detail produk | `/product/:id` | `/produk/:id` | `pages/Produk/ProdukDetail.jsx` | ❌ buat |
| Pencarian | `/search` | `/pencarian` | `pages/Produk/Pencarian.jsx` | ❌ buat |
| Keranjang | `/cart` | `/keranjang` | `pages/Keranjang.jsx` | ❌ buat |
| Checkout | `/checkout` | `/checkout` | `pages/Pembayaran/Checkout.jsx` | ✅ ada |
| Pilih bayar | `/payment/:orderId` | `/pembayaran/pilih` | `pages/Pembayaran/PilihPembayaran.jsx` | ✅ ada |
| Status bayar | `/payment/status/:orderId` | `/pembayaran/status/:orderId` | `pages/Pembayaran/StatusPembayaran.jsx` | ✅ ada |
| Invoice | `/invoice/:orderId` | `/invoice/:invoiceId` | `pages/Pembayaran/Invoice.jsx` | ✅ ada |
| Wishlist | `/wishlist` | `/Wishlist` | `components/UserProfile/Wishlist.jsx` | ✅ ada |
| Akun | `/account/*` | `/UserProfile`, `/Password`, `/Bank`, `/orders`, `/orders/:id` | `components/UserProfile/*` | ✅ sebagian |

**Catatan `/` :** referensi menjadikan `/` = Home. Saat ini `/` → `/login` (keputusan Opsi A sebelumnya). Kalau mau persis referensi, ubah `/` menjadi Home dan pindahkan titik masuk login. **Perlu keputusan terpisah** — di rencana ini `/` dibiarkan ke login.

---

## 3. Yang sudah tersedia untuk dipakai ulang (hemat kerja)

| Aset | Lokasi | Dipakai untuk |
|---|---|---|
| `useProducts(category?)` | `hooks/Dashboard/useProducts.js` | Produk **dan** Kategori (param opsional sudah ada) |
| `useProductDetail(id)` | `hooks/Dashboard/useProductDetail.js` | Detail produk (kini nganggur) |
| `useCategories()` | `hooks/Dashboard/useCategories.js` | Daftar kategori |
| `useDebounce(value, ms)` | `hooks/Dashboard/useDebounce.js` | Pencarian (kini nganggur) |
| `ProductCard` (link → `/produk/:id`) | `components/common/ProductCard.jsx` | Grid di semua halaman produk |
| `Rating`, `Loader`, `EmptyState`, `SectionTitle` | `components/common/*` | UI umum |
| `fakeStoreApi` (`getAllProducts`, `getProductsByCategory`, `getProductById`) | `api/fakeStoreApi.js` | Sumber data |
| `Layout` (Navbar + MarqueeBar + Footer + `<Outlet/>`) | `components/layout/Layout.jsx` | Kerangka publik |
| `useAuth` + `AuthContext` | `hooks/Login/useAuth.js`, `context/AuthContext.jsx` | Basis `ProtectedRoute` |

> Konsekuensi: seluruh Tier 1 & 2 **tidak butuh data layer baru** — hanya halaman + state cart/wishlist.

---

## 4. TIER 1 — Funnel inti (minimum bisa belanja end-to-end)

### 1.1 `CartContext` (state keranjang)
- **Buat:** `src/context/CartContext.jsx` (+ export `useCart`).
- **Isi:** `items: [{ id, title, price, image, qty }]`, plus `addItem(product)`, `removeItem(id)`, `updateQty(id, qty)`, `clear()`, turunan `totalItems`, `totalPrice`.
- **Persist:** simpan ke `localStorage` (key mis. `akupkl_cart`). Referensi memakai `hooks/useLocalStorage.js` + `lib/storage.js` — boleh tiru sederhana atau inline `useState` + `useEffect`.
- **Pasang:** bungkus di `main.jsx` di dalam `AuthProvider`.
- **Konsultasi:** `React-Store/src/context/CartContext.jsx`.
- **Selesai bila:** item bertahan setelah refresh; badge jumlah di Navbar update.

### 1.2 Halaman Daftar Produk — `/produk`
- **Buat:** `src/pages/Produk/Produk.jsx`.
- **Pakai ulang:** `useProducts()` + grid `ProductCard` + `Loader`/`EmptyState`.
- **Isi minimal:** judul section, grid produk, state loading & error. (Filter/sort opsional.)
- **Konsultasi:** `React-Store/src/pages/public/Products.jsx`.
- **Selesai bila:** `/produk` menampilkan seluruh produk; klik kartu → `/produk/:id`.

### 1.3 Halaman Detail Produk — `/produk/:id`
- **Buat:** `src/pages/Produk/ProdukDetail.jsx`.
- **Pakai ulang:** `useProductDetail(id)` (via `useParams`), `Rating`, `useCart().addItem`.
- **Isi minimal:** gambar, judul, harga, rating, deskripsi, tombol **"Tambah ke Keranjang"** (+ qty), tombol wishlist (Tier 2).
- **Konsultasi:** `React-Store/src/pages/public/ProductDetail.jsx`.
- **Selesai bila:** detail termuat dari API; tombol menambah item ke cart & memunculkan Toast.

### 1.4 Halaman Keranjang — `/keranjang`
- **Buat:** `src/pages/Keranjang.jsx`.
- **Pakai ulang:** `useCart()` (items, updateQty, removeItem, totalPrice).
- **Isi minimal:** daftar item + ubah qty + hapus, ringkasan subtotal, tombol **"Checkout"** → `/checkout`. `EmptyState` bila kosong.
- **Konsultasi:** `React-Store/src/pages/account/Cart.jsx`.
- **Selesai bila:** ubah/hapus item update total; Checkout menuju `/checkout`.

### 1.5 `ProtectedRoute`
- **Buat:** `src/routes/ProtectedRoute.jsx`.
- **Logika:** ambil user dari `useAuth`; bila belum login → `<Navigate to="/login" state={{ from }} replace />`; bila loading → tampilkan `Loading`.
- **Terapkan pada:** `/checkout`, `/pembayaran/pilih`, `/pembayaran/status/:orderId`, `/invoice/:invoiceId`, dan rute akun.
- **Konsultasi:** `React-Store/src/components/ProtectedRoute.jsx`.
- **Selesai bila:** akses `/checkout` tanpa login dialihkan ke `/login`.

### 1.6 Wiring terpusat
- **`src/routes/AppRoutes.jsx`:** tambah di dalam blok `<Route element={<Layout />}>` yang sudah ada:
  `/produk`, `/produk/:id`, `/keranjang` (dan `/pencarian`, `/kategori/:nama` di Tier 2). Bungkus rute pembayaran dengan `<ProtectedRoute>`.
- **`src/main.jsx`:** tambah `CartProvider` (dan `WishlistProvider` di Tier 2).
- **Cek:** tombol Hero "Belanja Sekarang" (`/produk`) & `ProductCard` (`/produk/:id`) tidak lagi 404.

**Definition of done Tier 1:** dari `/home` bisa menelusuri produk → detail → tambah ke keranjang → checkout → bayar → invoice, tanpa 404 dan tanpa error konsol.

---

## 5. TIER 2 — Jelajah

### 2.1 Halaman Kategori — `/kategori/:nama` (+ `/kategori`)
- **Buat:** `src/pages/Produk/Kategori.jsx`.
- **Pakai ulang:** `useProducts(nama)` (param sudah didukung) + `useCategories()` untuk daftar.
- **Catatan:** `CategoryGrid` sudah menaut ke `/kategori/:nama` — tinggal sediakan halamannya.
- **Konsultasi:** `React-Store/src/pages/public/Category.jsx`.

### 2.2 Halaman Pencarian — `/pencarian`
- **Buat:** `src/pages/Produk/Pencarian.jsx`.
- **Pakai ulang:** `useDebounce` (nganggur) + `useProducts()` lalu filter judul; baca query `?q=` via `useSearchParams`.
- **Catatan:** Navbar sudah `navigate('/pencarian?q=...')`.
- **Konsultasi:** `React-Store/src/pages/public/Search.jsx`.

### 2.3 `WishlistContext` global
- **Buat:** `src/context/WishlistContext.jsx` (+ `useWishlist`), persist localStorage.
- **Sambungkan:** tombol wishlist di `ProdukDetail`/`ProductCard`; halaman `Wishlist.jsx` baca dari context.
- **Konsultasi:** `React-Store/src/context/WishlistContext.jsx`.

**Definition of done Tier 2:** kategori & pencarian berfungsi dari Navbar; wishlist bisa ditambah dari mana saja dan konsisten.

---

## 6. TIER 3 — Paritas penuh

- **Akun nested `AccountLayout`** seperti referensi: `/account/dashboard|profile|edit-profile|addresses|orders|orders/:id|orders/:id/track|orders/:id/refund|notifications|reviews`. Halaman baru: Dashboard, EditProfile, Addresses, TrackShipment, Refund, Notifications, Reviews. (Konsultasi `React-Store/src/pages/account/*` + `components/AccountLayout.jsx`.)
- **Halaman statis:** `/privacy`, `/terms` (`Legal`), `BlogArticle` (`/blog/:slug`). Butuh sumber data `data/blog.js`, `data/site.js` gaya referensi.
- **Halaman error:** `/403`, `/500`, `/loading`, `/maintenance` (referensi `pages/error/*`).
- **`CurrencyContext`** (opsional) bila mau toggle mata uang seperti referensi.

---

## 7. Urutan eksekusi disarankan

1. `CartContext` + pasang di `main.jsx` (fondasi funnel).
2. `/produk` → `/produk/:id` → `/keranjang` (rantai belanja).
3. `ProtectedRoute` + bungkus checkout/payment.
4. Uji end-to-end funnel (Tier 1 selesai).
5. `/kategori/:nama`, `/pencarian`, `WishlistContext` (Tier 2).
6. Akun nested + halaman statis + error (Tier 3).

## 8. Estimasi kasar

| Tier | Berkas baru | Bobot |
|---|---|---|
| 1 | ~6 (CartContext, Produk, ProdukDetail, Keranjang, ProtectedRoute, wiring) | Sedang — data layer sudah ada |
| 2 | ~3 (Kategori, Pencarian, WishlistContext) | Kecil–sedang |
| 3 | ~15+ (akun nested, legal, blog, error, currency) | Besar |

## 9. Risiko / catatan

- **Keputusan `/`:** biarkan ke login (sekarang) atau jadikan Home (persis referensi). Belum diputuskan.
- **Data harga:** FakeStore API memakai `$` (USD); halaman pembayaran memakai Rupiah. Perlu sepakati format mata uang bila mau konsisten satu funnel.
- **Auth guard vs data cart:** cart sebaiknya boleh untuk tamu (guest), checkout baru diproteksi — sesuai referensi.
