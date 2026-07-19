import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../utils/format";
import { useCart } from "../../context/CartContext";
const NAMA_TOKO = "WM.";

const dummyItems = [
  { id: 1, nama: "Kaos Polos Katun Combed", varian: "Hitam, L", qty: 2, harga: 89000, gambar: "https://placehold.co/64x64/f4f1ea/78716c?text=Kaos" },
  { id: 2, nama: "Celana Chino Slim Fit", varian: "Krem, 32", qty: 1, harga: 215000, gambar: "https://placehold.co/64x64/f4f1ea/78716c?text=Celana" },
];

const langkahCheckout = ["Keranjang", "Informasi", "Pengiriman", "Pembayaran"];

const negaraSEA = [
  "Indonesia",
  "Malaysia",
  "Singapura",
  "Thailand",
  "Vietnam",
  "Filipina",
  "Brunei",
  "Kamboja",
  "Laos",
  "Myanmar",
  "Timor-Leste",
];

const manfaat = [
  { id: 1, icon: "🛡️", label: "100% Original" },
  { id: 2, icon: "🏷️", label: "Baru & Belum Dipakai" },
  { id: 3, icon: "↩️", label: "Retur Mudah" },
  { id: 4, icon: "🔒", label: "Tanpa Biaya Tersembunyi" },
];

function BadgeVisa() {
  return (
    <span className="flex h-full w-full items-center justify-center bg-[#1A1F71] text-base font-black italic tracking-tight text-white">
      VISA
    </span>
  );
}
function BadgeMastercard() {
  return (
    <span className="relative flex h-full w-full items-center justify-center bg-cloud">
      <span className="relative flex items-center">
        <span className="h-6 w-6 rounded-full bg-[#EB001B] opacity-90" />
        <span className="-ml-2.5 h-6 w-6 rounded-full bg-[#F79E1B] opacity-90" />
      </span>
    </span>
  );
}
function BadgePaypal() {
  return (
    <span className="flex h-full w-full items-center justify-center bg-[#003087] text-base font-black italic tracking-tight text-white">
      Pay<span className="text-[#009CDE]">Pal</span>
    </span>
  );
}

const expressCheckout = [
  { id: "visa", node: <BadgeVisa /> },
  { id: "paypal", node: <BadgePaypal /> },
  { id: "mastercard", node: <BadgeMastercard /> },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items: cartItems } = useCart();
  // Pakai isi keranjang nyata; jika kosong (mis. dibuka langsung), pakai contoh.
  const items = cartItems.length > 0 ? cartItems : dummyItems;

  const [kodePromo, setKodePromo] = useState("");

  const [tampil, setTampil] = useState(false);

  const [form, setForm] = useState({
    email: "",
    negara: "Indonesia",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
  });
  const [sudahCobaSubmit, setSudahCobaSubmit] = useState(false);

  useEffect(() => {
    setTampil(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.harga * item.qty, 0);
  const totalItem = items.reduce((acc, item) => acc + item.qty, 0);

  const updateForm = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const wajibDiisi = ["email", "negara", "firstName", "lastName", "address", "city", "province", "postalCode"];
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isFormValid = wajibDiisi.every((f) => form[f].trim() !== "") && validateEmail(form.email);

  const handleLanjut = () => {
    setSudahCobaSubmit(true);
    if (isFormValid) navigate("/pembayaran/pilih", { state: { customer: form } });
  };

  const errorClass = (field) =>
    sudahCobaSubmit && form[field].trim() === ""
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-ash focus:border-ink focus:ring-ink";

  return (
    <div
      className={`min-h-screen bg-cloud transition-opacity duration-500 ${
        tampil ? "opacity-100" : "opacity-0"
      }`}
    >
      <header className="border-b border-ash/60 bg-white py-4 text-center">
        <h1 className="text-xl font-bold tracking-[0.2em] text-ink">{NAMA_TOKO}</h1>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 md:gap-12">
        {/* Kolom kiri: form checkout */}
        <div className="px-6 py-8 md:px-0 md:py-10">
          <div className="mx-auto max-w-md md:ml-auto md:mr-0">
            <nav className="mb-6 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-steel md:justify-start">
              {langkahCheckout.map((langkah, i) => (
                <span key={langkah} className="flex items-center gap-1.5">
                  <span className={i === 1 ? "font-medium text-ink" : ""}>{langkah}</span>
                  {i < langkahCheckout.length - 1 && <span>›</span>}
                </span>
              ))}
            </nav>

            {/* Express checkout: Visa, PayPal, Mastercard */}
            <p className="mb-3 text-center text-[11px] font-medium tracking-wide text-smoke">
              Pembayaran ekspres
            </p>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {expressCheckout.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  className="h-11 overflow-hidden transition active:scale-[0.98]"
                >
                  {btn.node}
                </button>
              ))}
            </div>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-ash" />
              <span className="text-[11px] text-steel">ATAU</span>
              <div className="h-px flex-1 bg-ash" />
            </div>

            {/* Kontak */}
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-wide text-ink-soft">KONTAK</h2>
              <button type="button" className="text-xs font-medium text-ink-soft underline underline-offset-2">
                Masuk
              </button>
            </div>
            {/* 16. Controlled input untuk email:
                  - value berasal dari state form.email
                  - onChange memperbarui state saat pengguna mengetik
               */}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={`mb-1 w-full border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:ring-1 ${errorClass("email")}`}
            />
            {sudahCobaSubmit && form.email.trim() === "" && (
              <p className="mb-1 text-xs text-red-500">Email wajib diisi.</p>
            )}
            {sudahCobaSubmit && form.email.trim() !== "" && !validateEmail(form.email) && (
              <p className="mb-1 text-xs text-red-500">Masukkan alamat email yang valid.</p>
            )}
            <label className="mb-6 mt-1 flex items-center gap-2 text-xs text-smoke">
              <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-ink" />
              Kirimi saya kabar & penawaran via email
            </label>

            {/* Alamat pengiriman */}
            <h2 className="mb-1 text-xs font-bold tracking-wide text-ink-soft">ALAMAT PENGIRIMAN</h2>
            <p className="mb-3 text-[11px] text-steel">Saat ini kami hanya mengirim ke Asia Tenggara.</p>
            <div className="space-y-2">
              <select
                value={form.negara}
                onChange={updateForm("negara")}
                className="w-full appearance-none border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
              >
                {negaraSEA.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Nama depan"
                  value={form.firstName}
                  onChange={updateForm("firstName")}
                  className={` border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:ring-1 ${errorClass("firstName")}`}
                />
                <input
                  type="text"
                  placeholder="Nama belakang"
                  value={form.lastName}
                  onChange={updateForm("lastName")}
                  className={` border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:ring-1 ${errorClass("lastName")}`}
                />
              </div>

              <input
                type="text"
                placeholder="Alamat"
                value={form.address}
                onChange={updateForm("address")}
                className={`w-full border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:ring-1 ${errorClass("address")}`}
              />
              <input
                type="text"
                placeholder="Apartemen, unit, dll. (opsional)"
                className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:border-ink focus:ring-1 focus:ring-ink"
              />
              <input
                type="text"
                placeholder="Kota"
                value={form.city}
                onChange={updateForm("city")}
                className={`w-full border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:ring-1 ${errorClass("city")}`}
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Provinsi"
                  value={form.province}
                  onChange={updateForm("province")}
                  className={` border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:ring-1 ${errorClass("province")}`}
                />
                <input
                  type="text"
                  placeholder="Kode pos"
                  value={form.postalCode}
                  onChange={updateForm("postalCode")}
                  className={` border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:ring-1 ${errorClass("postalCode")}`}
                />
              </div>

              {/* 17. Input nomor telepon hanya menerima angka.
                    non-digit akan dihapus dengan replace(/\D/g, "")
               */}
              {/* 17. Input telepon hanya menerima angka:
                    - replace(/\D/g, "") menghapus semua karakter non-angka.
                    - Hal ini memastikan nomor telepon tersimpan sebagai angka saja.
               */}
              <input
                type="tel"
                placeholder="Telepon (opsional)"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "") }))}
                inputMode="numeric"
                className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:border-ink focus:ring-1 focus:ring-ink"
              />
              <label className="flex items-center gap-2 pt-1 text-xs text-smoke">
                <input type="checkbox" className="h-3.5 w-3.5 accent-ink" />
                Kirimi saya kabar & penawaran via SMS
              </label>
            </div>

            {sudahCobaSubmit && !isFormValid && (
              <p className="mt-3 text-xs text-red-500">
                Lengkapi semua kolom yang ditandai sebelum lanjut ke pengiriman.
              </p>
            )}

            {/* Aksi */}
            <div className="mt-6 flex items-center justify-between">
              {/* 19. navigate(-1) membuat browser kembali satu langkah di history.
                    - Ini berguna untuk tombol "Kembali ke keranjang".
               */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-sm font-medium text-ink-soft transition hover:text-ink"
              >
                <span aria-hidden="true">‹</span> Kembali ke keranjang
              </button>
              {/* 20. Tombol Lanjutkan memanggil handleLanjut untuk validasi dan navigasi. */}
              <button
                type="button"
                onClick={handleLanjut}
                className=" bg-ink px-6 py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink active:scale-[0.98]"
              >
                Lanjut ke pengiriman
              </button>
            </div>

            <footer className="mt-10 flex flex-wrap gap-x-4 gap-y-1 border-t border-ash/60 pt-4 text-[11px] text-smoke">
              <a href="#" className="underline underline-offset-2">Kebijakan Pengembalian</a>
              <a href="#" className="underline underline-offset-2">Pengiriman</a>
              <a href="#" className="underline underline-offset-2">Kebijakan Privasi</a>
              <a href="#" className="underline underline-offset-2">Syarat Layanan</a>
              <a href="#" className="underline underline-offset-2">Kontak</a>
            </footer>
          </div>
        </div>

        {/* Kolom kanan: ringkasan pesanan */}
        <div className="border-t border-ash/60 px-6 py-8 md:border-t-0 md:border-l md:px-0 md:py-10">
          <div className="mx-auto max-w-md md:mr-auto md:ml-0">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img src={item.gambar} alt={item.nama} className="h-16 w-16 border border-ash object-cover" />
                    <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-white">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink-soft">{item.nama}</p>
                    <p className="text-xs text-smoke">{item.varian}</p>
                  </div>
                  <span className="text-sm text-ink-soft">{formatRupiah(item.harga * item.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-2">
              <input
                type="text"
                value={kodePromo}
                onChange={(e) => setKodePromo(e.target.value)}
                placeholder="Kode diskon atau kartu hadiah"
                className="flex-1 border border-ash bg-white px-3 py-2.5 text-sm outline-none placeholder:text-steel focus:border-ink focus:ring-1 focus:ring-ink"
              />
              <button
                type="button"
                disabled={!kodePromo}
                className=" border border-ash bg-cloud px-4 text-sm font-medium text-smoke disabled:opacity-60"
              >
                Terapkan
              </button>
            </div>

            <div className="mt-6 space-y-2 border-t border-ash/60 pt-4 text-sm">
              <div className="flex justify-between text-smoke">
                <span>Subtotal · {totalItem} item</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-smoke">
                <span className="flex items-center gap-1">
                  Pengiriman
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-ash text-[10px]">?</span>
                </span>
                <span className="text-steel">Dihitung di langkah berikutnya</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-ash/60 pt-3">
              <span className="text-base font-semibold text-ink">Total</span>
              <span className="text-right">
                <span className="mr-1 align-top text-[11px] text-steel">IDR</span>
                <span className="text-lg font-semibold text-ink">{formatRupiah(subtotal)}</span>
              </span>
            </div>

            <div className="relative mt-10 px-3 pb-4 pt-6">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-steel" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-steel" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-steel" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-steel" />

              <p className="mb-4 text-center text-[11px] font-bold tracking-wide text-ink-soft">
                KENAPA BELANJA DI {NAMA_TOKO}
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                {manfaat.map((item) => (
                  <div key={item.id} className="flex flex-col items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm">
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-medium leading-tight text-smoke">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
