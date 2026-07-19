import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/Card";
import { formatRupiah } from "../../utils/format";
import { useCart } from "../../context/CartContext";
import { simpanOrder } from "../../utils/orderStore";

function buatOrderId() {
  const now = new Date();
  const tanggal = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const acak = Math.floor(100 + Math.random() * 900);
  return `${tanggal}-${acak}`;
}

const NAMA_TOKO = "WM.";

const langkahCheckout = ["Keranjang", "Informasi", "Pengiriman", "Pembayaran"];

const metodeBayar = [
  { id: "transfer", label: "Transfer Bank", deskripsi: "BCA, Mandiri, BNI, BRI", icon: "🏦" },
  { id: "ewallet", label: "E-wallet", deskripsi: "GoPay, OVO, DANA, ShopeePay", icon: "📱" },
  { id: "kartu", label: "Kartu Debit / Kredit", deskripsi: "Visa, Mastercard", icon: "💳" },
  { id: "cod", label: "Bayar di Tempat (COD)", deskripsi: "Bayar tunai saat barang tiba", icon: "🚚" },
];

const opsiBank = ["BCA", "Mandiri", "BNI", "BRI"];
const opsiEwallet = ["GoPay", "OVO", "DANA", "ShopeePay"];
const opsiKartu = ["Visa", "Mastercard"];

const alasanBatal = [
  "Salah memilih metode pembayaran",
  "Ingin mengubah alamat pengiriman",
  "Berubah pikiran",
  "Menemukan harga lebih murah di tempat lain",
  "Lainnya",
];

const dummyItems = [
  { id: 1, nama: "Kaos Polos Katun Combed", varian: "Hitam, L", qty: 2, harga: 89000 },
  { id: 2, nama: "Celana Chino Slim Fit", varian: "Krem, 32", qty: 1, harga: 215000 },
];

export default function PilihPembayaran() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: cartItems, clear } = useCart();
  const customer = location.state?.customer;
  const items = cartItems.length > 0 ? cartItems : dummyItems;
  const [dipilih, setDipilih] = useState("transfer");
  const [opsiTerpilih, setOpsiTerpilih] = useState("");
  const [tampil, setTampil] = useState(false);

  const [nomorRekening, setNomorRekening] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [kartu, setKartu] = useState({ nomor: "", nama: "", kadaluarsa: "", cvv: "" });

  // Konfirmasi pembayaran (muncul setelah klik "Bayar sekarang")
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [showBatal, setShowBatal] = useState(false);
  const [alasanTerpilih, setAlasanTerpilih] = useState("");

  useEffect(() => {
    setTampil(true);
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.harga * item.qty, 0);
  const ongkir = 15000;
  const total = subtotal + ongkir;

  const opsiDetail =
    dipilih === "transfer" ? opsiBank : dipilih === "ewallet" ? opsiEwallet : dipilih === "kartu" ? opsiKartu : null;

  const updateKartu = (field) => (e) => setKartu((k) => ({ ...k, [field]: e.target.value }));

  const metodeLabel = (() => {
    const m = metodeBayar.find((x) => x.id === dipilih)?.label || "Pembayaran";
    return opsiTerpilih ? `${m} · ${opsiTerpilih}` : m;
  })();

  function buatPelanggan(c) {
    if (!c) return { nama: "Pelanggan", alamat: "-", telepon: "-" };
    return {
      nama: [c.firstName, c.lastName].filter(Boolean).join(" ") || "Pelanggan",
      alamat: [c.address, c.city, c.province, c.postalCode, c.negara].filter(Boolean).join(", ") || "-",
      telepon: c.phone || c.email || "-",
    };
  }

  function simpanPesanan(status, alasan) {
    const now = new Date();
    const orderId = buatOrderId();
    simpanOrder({
      orderId,
      invoiceId: orderId,
      status, // "paid" | "failed"
      items,
      subtotal,
      ongkir,
      total,
      metode: metodeLabel,
      metodeBayar: metodeLabel,
      waktu: now.toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      tanggalTerbit: now.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      pelanggan: buatPelanggan(customer),
      pengiriman: "Reguler · 3-4 hari",
      alasan,
    });
    return orderId;
  }

  const handleProceed = () => {
    const orderId = simpanPesanan("paid");
    clear(); // pembayaran sukses -> kosongkan keranjang
    navigate(`/pembayaran/status/${orderId}`);
  };

  const handleKonfirmasiBatal = () => {
    const orderId = simpanPesanan("failed", alasanTerpilih);
    // keranjang dibiarkan agar bisa dicoba lagi
    navigate(`/invoice/${orderId}`, { state: { status: "failed", alasan: alasanTerpilih } });
  };

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
        <div className="px-6 py-8 md:px-0 md:py-10">
          <div className="mx-auto max-w-md md:ml-auto md:mr-0">
            <nav className="mb-6 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-steel md:justify-start">
              {langkahCheckout.map((langkah, i) => (
                <span key={langkah} className="flex items-center gap-1.5">
                  <span className={i === 3 ? "font-medium text-ink" : ""}>{langkah}</span>
                  {i < langkahCheckout.length - 1 && <span>›</span>}
                </span>
              ))}
            </nav>

            {!showKonfirmasi ? (
              <>
                <h2 className="mb-1 text-lg font-semibold text-ink">Pilih metode pembayaran</h2>
                <p className="mb-6 text-sm text-smoke">Pilih metode pembayaran yang paling nyaman untukmu.</p>

                <div className="space-y-2">
                  {metodeBayar.map((m) => (
                    <div key={m.id}>
                      <label
                        className={`flex cursor-pointer items-center justify-between border bg-white p-3.5 transition ${
                          dipilih === m.id ? "border-ink ring-1 ring-ink" : "border-ash"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="metode"
                            checked={dipilih === m.id}
                            onChange={() => {
                              setDipilih(m.id);
                              setOpsiTerpilih("");
                            }}
                            className="h-4 w-4 accent-ink"
                          />
                          <span className="text-lg">{m.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-ink-soft">{m.label}</p>
                            <p className="text-xs text-smoke">{m.deskripsi}</p>
                          </div>
                        </div>
                      </label>

                      {/* Sub-opsi (nama bank / provider e-wallet / jenis kartu) — hanya untuk method yang sedang dipilih */}
                      {dipilih === m.id && opsiDetail && (
                        <div className="mt-2 grid animate-slidefade grid-cols-2 gap-2 pl-2">
                          {opsiDetail.map((opsi) => (
                            <button
                              key={opsi}
                              type="button"
                              onClick={() => setOpsiTerpilih(opsi)}
                              className={` border px-3 py-2 text-sm font-medium transition ${
                                opsiTerpilih === opsi
                                  ? "border-ink bg-ink text-white"
                                  : "border-ash bg-white text-ink-soft hover:border-steel"
                              }`}
                            >
                              {opsi}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Input nomor rekening — HANYA muncul untuk transfer bank yang sedang dipilih */}
                      {dipilih === m.id && m.id === "transfer" && opsiTerpilih && (
                        <div className="mt-2 animate-slidefade border border-ash bg-white p-3.5 pl-2">
                          <label className="mb-1 block text-xs font-medium text-smoke">
                            Nomor rekening {opsiTerpilih} kamu
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={nomorRekening}
                            onChange={(e) => setNomorRekening(e.target.value)}
                            placeholder="mis. 1234567890"
                            className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                          />
                        </div>
                      )}

                      {/* Input nomor HP — HANYA muncul untuk e-wallet yang sedang dipilih */}
                      {dipilih === m.id && m.id === "ewallet" && opsiTerpilih && (
                        <div className="mt-2 animate-slidefade border border-ash bg-white p-3.5 pl-2">
                          <label className="mb-1 block text-xs font-medium text-smoke">
                            Nomor HP terdaftar di {opsiTerpilih}
                          </label>
                          <input
                            type="tel"
                            value={nomorHp}
                            onChange={(e) => setNomorHp(e.target.value)}
                            placeholder="mis. 08xx-xxxx-xxxx"
                            className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                          />
                        </div>
                      )}

                      {/* Input data kartu — HANYA muncul untuk kartu yang sedang dipilih */}
                      {dipilih === m.id && m.id === "kartu" && opsiTerpilih && (
                        <div className="mt-2 animate-slidefade space-y-2 border border-ash bg-white p-3.5 pl-2">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-smoke">Nomor kartu</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={19}
                              value={kartu.nomor}
                              onChange={updateKartu("nomor")}
                              placeholder="0000 0000 0000 0000"
                              className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-smoke">Nama pemegang kartu</label>
                            <input
                              type="text"
                              value={kartu.nama}
                              onChange={updateKartu("nama")}
                              placeholder="Sesuai yang tertera di kartu"
                              className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="mb-1 block text-xs font-medium text-smoke">Kedaluwarsa</label>
                              <input
                                type="text"
                                value={kartu.kadaluarsa}
                                onChange={updateKartu("kadaluarsa")}
                                placeholder="BB/TT"
                                maxLength={5}
                                className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-medium text-smoke">CVV</label>
                              <input
                                type="password"
                                value={kartu.cvv}
                                onChange={updateKartu("cvv")}
                                placeholder="•••"
                                maxLength={4}
                                className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {dipilih === m.id && m.id === "cod" && (
                        <div className="mt-2 animate-slidefade border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-800">
                          Siapkan uang pas ya, kurir tidak selalu punya kembalian.
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-sm font-medium text-ink-soft transition hover:text-ink"
                  >
                    <span aria-hidden="true">‹</span> Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKonfirmasi(true)}
                    className=" bg-ink px-6 py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink active:scale-[0.98]"
                  >
                    Bayar sekarang
                  </button>
                </div>
              </>
            ) : (
              /* Kartu konfirmasi pembayaran */
              <Card className="animate-slidefade p-5">
                <h2 className="mb-4 text-base font-semibold text-ink">Konfirmasi pembayaranmu</h2>

                <ul className="mb-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-ink-soft">{item.nama}</p>
                        <p className="text-xs text-smoke">{item.varian} · x{item.qty}</p>
                      </div>
                      <span className="whitespace-nowrap text-ink-soft">{formatRupiah(item.harga * item.qty)}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 border-t border-dashed border-ash pt-3 text-sm">
                  <div className="flex justify-between text-smoke">
                    <span>Subtotal</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-smoke">
                    <span>Pengiriman</span>
                    <span>{formatRupiah(ongkir)}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between border-t border-dashed border-ash pt-3">
                  <span className="font-semibold text-ink-soft">Total</span>
                  <span className="font-semibold text-ink">{formatRupiah(total)}</span>
                </div>

                {!showBatal ? (
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowBatal(true)}
                      className="flex-1 border border-ink bg-white py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-white"
                    >
                      Batalkan pembayaran
                    </button>
                    <button
                      type="button"
                      onClick={handleProceed}
                      className="flex-1 bg-ink py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink active:scale-[0.98]"
                    >
                      Lanjutkan
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 animate-slidefade space-y-2 border border-ash bg-cloud p-4">
                    <p className="mb-2 text-sm font-medium text-ink-soft">Kenapa kamu membatalkan pembayaran ini?</p>
                    {alasanBatal.map((alasan) => (
                      <label key={alasan} className="flex cursor-pointer items-center gap-2 text-sm text-smoke">
                        <input
                          type="radio"
                          name="alasanBatal"
                          checked={alasanTerpilih === alasan}
                          onChange={() => setAlasanTerpilih(alasan)}
                          className="h-3.5 w-3.5 accent-ink"
                        />
                        {alasan}
                      </label>
                    ))}
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowBatal(false)}
                        className="flex-1 border border-ink bg-white py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-white"
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        onClick={handleKonfirmasiBatal}
                        disabled={!alasanTerpilih}
                        className="flex-1 border border-red-600 bg-red-600 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-red-600 disabled:opacity-50"
                      >
                        Konfirmasi pembatalan
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>

        <div className="border-t border-ash/60 px-6 py-8 md:border-t-0 md:border-l md:px-0 md:py-10">
          <div className="mx-auto max-w-md md:mr-auto md:ml-0">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-ink-soft">{item.nama}</p>
                    <p className="text-xs text-smoke">{item.varian} · x{item.qty}</p>
                  </div>
                  <span className="text-ink-soft">{formatRupiah(item.harga * item.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-ash/60 pt-4 text-sm">
              <div className="flex justify-between text-smoke">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-smoke">
                <span>Pengiriman</span>
                <span>{formatRupiah(ongkir)}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-ash/60 pt-3">
              <span className="text-base font-semibold text-ink">Total</span>
              <span className="text-right">
                <span className="mr-1 align-top text-[11px] text-steel">IDR</span>
                <span className="text-lg font-semibold text-ink">{formatRupiah(total)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slidefade { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slidefade { animation: slidefade 0.2s ease-out; }
      `}</style>
    </div>
  );
}
