import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const NAMA_TOKO = "WM.";

const dummyItems = [
  { id: 1, nama: "Kaos Polos Katun Combed", varian: "Hitam, L", qty: 2, harga: 89000, gambar: "https://placehold.co/64x64/f4f1ea/78716c?text=Kaos" },
  { id: 2, nama: "Celana Chino Slim Fit", varian: "Krem, 32", qty: 1, harga: 215000, gambar: "https://placehold.co/64x64/f4f1ea/78716c?text=Celana" },
];

const langkahCheckout = ["Cart", "Information", "Shipping", "Payment"];

const negaraSEA = [
  "Indonesia",
  "Malaysia",
  "Singapore",
  "Thailand",
  "Vietnam",
  "Philippines",
  "Brunei",
  "Cambodia",
  "Laos",
  "Myanmar",
  "Timor-Leste",
];

const manfaat = [
  { id: 1, icon: "🛡️", label: "Fully authentic" },
  { id: 2, icon: "🏷️", label: "New & unused" },
  { id: 3, icon: "↩️", label: "Easy returns" },
  { id: 4, icon: "🔒", label: "No hidden fees" },
];

function formatRupiah(angka) {
  return angka.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
}

function BadgeVisa() {
  return (
    <span className="flex h-full w-full items-center justify-center rounded-md bg-[#1A1F71] text-base font-black italic tracking-tight text-white">
      VISA
    </span>
  );
}
function BadgeMastercard() {
  return (
    <span className="relative flex h-full w-full items-center justify-center rounded-md bg-stone-100">
      <span className="relative flex items-center">
        <span className="h-6 w-6 rounded-full bg-[#EB001B] opacity-90" />
        <span className="-ml-2.5 h-6 w-6 rounded-full bg-[#F79E1B] opacity-90" />
      </span>
    </span>
  );
}
function BadgePaypal() {
  return (
    <span className="flex h-full w-full items-center justify-center rounded-md bg-[#003087] text-base font-black italic tracking-tight text-white">
      Pay<span className="text-[#009CDE]">Pal</span>
    </span>
  );
}

const expressCheckout = [
  { id: "visa", node: <BadgeVisa /> },
  { id: "paypal", node: <BadgePaypal /> },
  { id: "mastercard", node: <BadgeMastercard /> },
];

export default function Checkout({ items = dummyItems }) {
  const navigate = useNavigate();

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
      : "border-stone-300 focus:border-stone-900 focus:ring-stone-900";

  return (
    <div
      className={`min-h-screen bg-[#F4F1EA] transition-opacity duration-500 ${
        tampil ? "opacity-100" : "opacity-0"
      }`}
    >
      <header className="border-b border-stone-300/60 bg-white py-4 text-center">
        <h1 className="text-xl font-bold tracking-[0.2em] text-stone-900">{NAMA_TOKO}</h1>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 md:gap-12">
        {/* Kolom kiri: form checkout */}
        <div className="px-6 py-8 md:px-0 md:py-10">
          <div className="mx-auto max-w-md md:ml-auto md:mr-0">
            <nav className="mb-6 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-stone-400 md:justify-start">
              {langkahCheckout.map((langkah, i) => (
                <span key={langkah} className="flex items-center gap-1.5">
                  <span className={i === 1 ? "font-medium text-stone-900" : ""}>{langkah}</span>
                  {i < langkahCheckout.length - 1 && <span>›</span>}
                </span>
              ))}
            </nav>

            {/* Express checkout: Visa, PayPal, Mastercard */}
            <p className="mb-3 text-center text-[11px] font-medium tracking-wide text-stone-500">
              Express checkout
            </p>
            <div className="mb-4 grid grid-cols-3 gap-2">
              {expressCheckout.map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  className="h-11 overflow-hidden rounded-md shadow-sm transition active:scale-[0.98]"
                >
                  {btn.node}
                </button>
              ))}
            </div>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-stone-300" />
              <span className="text-[11px] text-stone-400">OR</span>
              <div className="h-px flex-1 bg-stone-300" />
            </div>

            {/* Kontak */}
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-bold tracking-wide text-stone-800">CONTACT</h2>
              <button type="button" className="text-xs font-medium text-stone-700 underline underline-offset-2">
                Sign in
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
              className={`mb-1 w-full rounded-md border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:ring-1 ${errorClass("email")}`}
            />
            {sudahCobaSubmit && form.email.trim() === "" && (
              <p className="mb-1 text-xs text-red-500">Email is required.</p>
            )}
            {sudahCobaSubmit && form.email.trim() !== "" && !validateEmail(form.email) && (
              <p className="mb-1 text-xs text-red-500">Please enter a valid email address.</p>
            )}
            <label className="mb-6 mt-1 flex items-center gap-2 text-xs text-stone-500">
              <input type="checkbox" defaultChecked className="h-3.5 w-3.5 accent-stone-900" />
              Email me with news and offers
            </label>

            {/* Alamat pengiriman */}
            <h2 className="mb-1 text-xs font-bold tracking-wide text-stone-800">SHIPPING ADDRESS</h2>
            <p className="mb-3 text-[11px] text-stone-400">We currently only ship to Southeast Asia.</p>
            <div className="space-y-2">
              <select
                value={form.negara}
                onChange={updateForm("negara")}
                className="w-full appearance-none rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              >
                {negaraSEA.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={updateForm("firstName")}
                  className={`rounded-md border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:ring-1 ${errorClass("firstName")}`}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={updateForm("lastName")}
                  className={`rounded-md border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:ring-1 ${errorClass("lastName")}`}
                />
              </div>

              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={updateForm("address")}
                className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:ring-1 ${errorClass("address")}`}
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={updateForm("city")}
                className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:ring-1 ${errorClass("city")}`}
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Province / State"
                  value={form.province}
                  onChange={updateForm("province")}
                  className={`rounded-md border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:ring-1 ${errorClass("province")}`}
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  value={form.postalCode}
                  onChange={updateForm("postalCode")}
                  className={`rounded-md border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:ring-1 ${errorClass("postalCode")}`}
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
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "") }))}
                inputMode="numeric"
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
              <label className="flex items-center gap-2 pt-1 text-xs text-stone-500">
                <input type="checkbox" className="h-3.5 w-3.5 accent-stone-900" />
                Text me with news and offers
              </label>
            </div>

            {sudahCobaSubmit && !isFormValid && (
              <p className="mt-3 text-xs text-red-500">
                Please fill in all the highlighted fields before continuing to shipping.
              </p>
            )}

            {/* Aksi */}
            <div className="mt-6 flex items-center justify-between">
              {/* 19. navigate(-1) membuat browser kembali satu langkah di history.
                    - Ini berguna untuk tombol "Return to cart".
               */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 text-sm font-medium text-stone-700 transition hover:text-stone-900"
              >
                <span aria-hidden="true">‹</span> Return to cart
              </button>
              {/* 20. Tombol Lanjutkan memanggil handleLanjut untuk validasi dan navigasi. */}
              <button
                type="button"
                onClick={handleLanjut}
                className="rounded-md bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
              >
                Continue to shipping
              </button>
            </div>

            <footer className="mt-10 flex flex-wrap gap-x-4 gap-y-1 border-t border-stone-300/60 pt-4 text-[11px] text-stone-500">
              <a href="#" className="underline underline-offset-2">Refund policy</a>
              <a href="#" className="underline underline-offset-2">Shipping</a>
              <a href="#" className="underline underline-offset-2">Privacy policy</a>
              <a href="#" className="underline underline-offset-2">Terms of service</a>
              <a href="#" className="underline underline-offset-2">Contact</a>
            </footer>
          </div>
        </div>

        {/* Kolom kanan: ringkasan pesanan */}
        <div className="border-t border-stone-300/60 px-6 py-8 md:border-t-0 md:border-l md:px-0 md:py-10">
          <div className="mx-auto max-w-md md:mr-auto md:ml-0">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img src={item.gambar} alt={item.nama} className="h-16 w-16 rounded-md border border-stone-300 object-cover" />
                    <span className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[11px] font-semibold text-white">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-800">{item.nama}</p>
                    <p className="text-xs text-stone-500">{item.varian}</p>
                  </div>
                  <span className="text-sm text-stone-700">{formatRupiah(item.harga * item.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-2">
              <input
                type="text"
                value={kodePromo}
                onChange={(e) => setKodePromo(e.target.value)}
                placeholder="Discount code or gift card"
                className="flex-1 rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
              />
              <button
                type="button"
                disabled={!kodePromo}
                className="rounded-md border border-stone-300 bg-stone-100 px-4 text-sm font-medium text-stone-500 disabled:opacity-60"
              >
                Apply
              </button>
            </div>

            <div className="mt-6 space-y-2 border-t border-stone-300/60 pt-4 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal · {totalItem} item</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  Shipping
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-stone-300 text-[10px]">?</span>
                </span>
                <span className="text-stone-400">Calculated at next step</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-stone-300/60 pt-3">
              <span className="text-base font-semibold text-stone-900">Total</span>
              <span className="text-right">
                <span className="mr-1 align-top text-[11px] text-stone-400">IDR</span>
                <span className="text-lg font-semibold text-stone-900">{formatRupiah(subtotal)}</span>
              </span>
            </div>

            <div className="relative mt-10 px-3 pb-4 pt-6">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-stone-400" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-stone-400" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-stone-400" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-stone-400" />

              <p className="mb-4 text-center text-[11px] font-bold tracking-wide text-stone-700">
                WHY BUY FROM {NAMA_TOKO}
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                {manfaat.map((item) => (
                  <div key={item.id} className="flex flex-col items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-sm">
                      {item.icon}
                    </span>
                    <span className="text-[10px] font-medium leading-tight text-stone-500">{item.label}</span>
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