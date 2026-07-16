import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

function buatOrderId() {
  const now = new Date();
  const tanggal = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const acak = Math.floor(100 + Math.random() * 900);
  return `${tanggal}-${acak}`;
}

const NAMA_TOKO = "TOKOKU";

const langkahCheckout = ["Cart", "Information", "Shipping", "Payment"];

const metodeBayar = [
  { id: "transfer", label: "Bank transfer", deskripsi: "BCA, Mandiri, BNI, BRI", icon: "🏦" },
  { id: "ewallet", label: "E-wallet", deskripsi: "GoPay, OVO, DANA, ShopeePay", icon: "📱" },
  { id: "kartu", label: "Debit / credit card", deskripsi: "Visa, Mastercard", icon: "💳" },
  { id: "cod", label: "Cash on delivery (COD)", deskripsi: "Pay in cash when the item arrives", icon: "🚚" },
];

const opsiBank = ["BCA", "Mandiri", "BNI", "BRI"];
const opsiEwallet = ["GoPay", "OVO", "DANA", "ShopeePay"];
const opsiKartu = ["Visa", "Mastercard"];

const alasanBatal = [
  "Selected the wrong payment method",
  "Want to change the shipping address",
  "Changed my mind",
  "Found a cheaper price elsewhere",
  "Other",
];

const dummyItems = [
  { id: 1, nama: "Kaos Polos Katun Combed", varian: "Hitam, L", qty: 2, harga: 89000 },
  { id: 2, nama: "Celana Chino Slim Fit", varian: "Krem, 32", qty: 1, harga: 215000 },
];

function formatRupiah(angka) {
  return angka.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
}

export default function PilihPembayaran({ items = dummyItems }) {
  const navigate = useNavigate();
  const [dipilih, setDipilih] = useState("transfer");
  const [opsiTerpilih, setOpsiTerpilih] = useState("");
  const [tampil, setTampil] = useState(false);

  const [nomorRekening, setNomorRekening] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [kartu, setKartu] = useState({ nomor: "", nama: "", kadaluarsa: "", cvv: "" });

  // Konfirmasi pembayaran (muncul setelah klik "Pay now")
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

  const handleProceed = () => {
    const orderId = buatOrderId();
    navigate(`/pembayaran/status/${orderId}`);
  };

  const handleKonfirmasiBatal = () => {
    const orderId = buatOrderId();
    navigate(`/invoice/${orderId}`, { state: { status: "failed", alasan: alasanTerpilih } });
  };

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
        <div className="px-6 py-8 md:px-0 md:py-10">
          <div className="mx-auto max-w-md md:ml-auto md:mr-0">
            <nav className="mb-6 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-stone-400 md:justify-start">
              {langkahCheckout.map((langkah, i) => (
                <span key={langkah} className="flex items-center gap-1.5">
                  <span className={i === 3 ? "font-medium text-stone-900" : ""}>{langkah}</span>
                  {i < langkahCheckout.length - 1 && <span>›</span>}
                </span>
              ))}
            </nav>

            {!showKonfirmasi ? (
              <>
                <h2 className="mb-1 text-lg font-semibold text-stone-900">Choose payment method</h2>
                <p className="mb-6 text-sm text-stone-500">Choose the payment method that's most convenient for you.</p>

                <div className="space-y-2">
                  {metodeBayar.map((m) => (
                    <div key={m.id}>
                      <label
                        className={`flex cursor-pointer items-center justify-between rounded-md border bg-white p-3.5 transition ${
                          dipilih === m.id ? "border-stone-900 ring-1 ring-stone-900" : "border-stone-300"
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
                            className="h-4 w-4 accent-stone-900"
                          />
                          <span className="text-lg">{m.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-stone-800">{m.label}</p>
                            <p className="text-xs text-stone-500">{m.deskripsi}</p>
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
                              className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                                opsiTerpilih === opsi
                                  ? "border-stone-900 bg-stone-900 text-white"
                                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-400"
                              }`}
                            >
                              {opsi}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Input nomor rekening — HANYA muncul untuk transfer bank yang sedang dipilih */}
                      {dipilih === m.id && m.id === "transfer" && opsiTerpilih && (
                        <div className="mt-2 animate-slidefade rounded-md border border-stone-300 bg-white p-3.5 pl-2">
                          <label className="mb-1 block text-xs font-medium text-stone-600">
                            Your {opsiTerpilih} account number
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={nomorRekening}
                            onChange={(e) => setNomorRekening(e.target.value)}
                            placeholder="e.g. 1234567890"
                            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                          />
                        </div>
                      )}

                      {/* Input nomor HP — HANYA muncul untuk e-wallet yang sedang dipilih */}
                      {dipilih === m.id && m.id === "ewallet" && opsiTerpilih && (
                        <div className="mt-2 animate-slidefade rounded-md border border-stone-300 bg-white p-3.5 pl-2">
                          <label className="mb-1 block text-xs font-medium text-stone-600">
                            Phone number registered with {opsiTerpilih}
                          </label>
                          <input
                            type="tel"
                            value={nomorHp}
                            onChange={(e) => setNomorHp(e.target.value)}
                            placeholder="e.g. 08xx-xxxx-xxxx"
                            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                          />
                        </div>
                      )}

                      {/* Input data kartu — HANYA muncul untuk kartu yang sedang dipilih */}
                      {dipilih === m.id && m.id === "kartu" && opsiTerpilih && (
                        <div className="mt-2 animate-slidefade space-y-2 rounded-md border border-stone-300 bg-white p-3.5 pl-2">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-stone-600">Card number</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={19}
                              value={kartu.nomor}
                              onChange={updateKartu("nomor")}
                              placeholder="0000 0000 0000 0000"
                              className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-stone-600">Cardholder name</label>
                            <input
                              type="text"
                              value={kartu.nama}
                              onChange={updateKartu("nama")}
                              placeholder="As shown on the card"
                              className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="mb-1 block text-xs font-medium text-stone-600">Expiry</label>
                              <input
                                type="text"
                                value={kartu.kadaluarsa}
                                onChange={updateKartu("kadaluarsa")}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-medium text-stone-600">CVV</label>
                              <input
                                type="password"
                                value={kartu.cvv}
                                onChange={updateKartu("cvv")}
                                placeholder="•••"
                                maxLength={4}
                                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {dipilih === m.id && m.id === "cod" && (
                        <div className="mt-2 animate-slidefade rounded-md border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-800">
                          Please have exact change ready, couriers don't always carry change.
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-sm font-medium text-stone-700 transition hover:text-stone-900"
                  >
                    <span aria-hidden="true">‹</span> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKonfirmasi(true)}
                    className="rounded-md bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
                  >
                    Pay now
                  </button>
                </div>
              </>
            ) : (
              /* Kartu konfirmasi pembayaran */
              <Card className="animate-slidefade p-5">
                <h2 className="mb-4 text-base font-semibold text-stone-900">Confirm your payment</h2>

                <ul className="mb-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-stone-800">{item.nama}</p>
                        <p className="text-xs text-stone-500">{item.varian} · x{item.qty}</p>
                      </div>
                      <span className="whitespace-nowrap text-stone-700">{formatRupiah(item.harga * item.qty)}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2 border-t border-dashed border-stone-300 pt-3 text-sm">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>{formatRupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span>{formatRupiah(ongkir)}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between border-t border-dashed border-stone-300 pt-3">
                  <span className="font-semibold text-stone-800">Total</span>
                  <span className="font-semibold text-stone-900">{formatRupiah(total)}</span>
                </div>

                {!showBatal ? (
                  <div className="mt-5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowBatal(true)}
                      className="flex-1 rounded-md border border-stone-300 bg-white py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
                    >
                      Cancel payment
                    </button>
                    <button
                      type="button"
                      onClick={handleProceed}
                      className="flex-1 rounded-md bg-stone-900 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
                    >
                      Proceed
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 animate-slidefade space-y-2 rounded-md border border-stone-200 bg-stone-50 p-4">
                    <p className="mb-2 text-sm font-medium text-stone-800">Why are you cancelling this payment?</p>
                    {alasanBatal.map((alasan) => (
                      <label key={alasan} className="flex cursor-pointer items-center gap-2 text-sm text-stone-600">
                        <input
                          type="radio"
                          name="alasanBatal"
                          checked={alasanTerpilih === alasan}
                          onChange={() => setAlasanTerpilih(alasan)}
                          className="h-3.5 w-3.5 accent-stone-900"
                        />
                        {alasan}
                      </label>
                    ))}
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowBatal(false)}
                        className="flex-1 rounded-md border border-stone-300 bg-white py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleKonfirmasiBatal}
                        disabled={!alasanTerpilih}
                        className="flex-1 rounded-md bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                      >
                        Confirm cancellation
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>

        <div className="border-t border-stone-300/60 px-6 py-8 md:border-t-0 md:border-l md:px-0 md:py-10">
          <div className="mx-auto max-w-md md:mr-auto md:ml-0">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-stone-800">{item.nama}</p>
                    <p className="text-xs text-stone-500">{item.varian} · x{item.qty}</p>
                  </div>
                  <span className="text-stone-700">{formatRupiah(item.harga * item.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-stone-300/60 pt-4 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>{formatRupiah(ongkir)}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-stone-300/60 pt-3">
              <span className="text-base font-semibold text-stone-900">Total</span>
              <span className="text-right">
                <span className="mr-1 align-top text-[11px] text-stone-400">IDR</span>
                <span className="text-lg font-semibold text-stone-900">{formatRupiah(total)}</span>
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