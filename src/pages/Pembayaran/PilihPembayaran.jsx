import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Card from "../../components/Card";
import { formatRupiah } from "../../utils/format";
import { useCart } from "../../context/CartContext";
import { useBank } from "../../hooks/UserProfile/useBank";
import useUser from "../../hooks/UserProfile/useUser";
import { maskNumber } from "../../utils/UserProfile/Bank";
import { simpanOrder, tambahOrderDashboard } from "../../utils/orderStore";

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

const alasanBatal = [
  "Salah memilih metode pembayaran",
  "Ingin mengubah alamat pengiriman",
  "Berubah pikiran",
  "Menemukan harga lebih murah di tempat lain",
  "Lainnya",
];

export default function PilihPembayaran() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, clear } = useCart();
  const { kartu: savedCards, setKartu: setSavedCards } = useBank();
  const { user } = useUser();
  const customer = location.state?.customer;
  const [dipilih, setDipilih] = useState("transfer");
  const [opsiTerpilih, setOpsiTerpilih] = useState("");
  const [tampil, setTampil] = useState(false);

  // Setelah pembayaran sukses keranjang dikosongkan; ref ini menahan guard
  // "keranjang kosong -> /keranjang" agar user tetap sampai ke halaman status.
  const sudahBayarRef = useRef(false);

  const [nomorRekening, setNomorRekening] = useState("");
  const [rekeningDipakai, setRekeningDipakai] = useState(false);
  // Nomor HP e-wallet diambil dari profil (userData.nohp), tetap bisa diubah di sini.
  const [nomorHp, setNomorHp] = useState(user?.nohp || "");
  const [kartu, setKartu] = useState({ nomor: "", nama: "", kadaluarsa: "", cvv: "" });
  const [jenisKartuBaru, setJenisKartuBaru] = useState("Kartu Kredit / Debit");

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

  // Pisahkan kartu tersimpan: rekening bank (untuk transfer) vs kartu debit/kredit.
  const bankAccounts = savedCards.filter((c) => c.jenis === "Rekening Bank Saya");
  const debitCreditCards = savedCards.filter((c) => c.jenis !== "Rekening Bank Saya");

  // Opsi Kartu Debit/Kredit HANYA dari kartu debit/kredit (bukan rekening bank).
  const opsiKartuTersimpan = debitCreditCards.map((c) =>
    `${c.namaBank || c.jenis || "Kartu"} ${maskNumber(c.nomor)}`.trim()
  );
  const opsiDetail =
    dipilih === "transfer" ? opsiBank : dipilih === "ewallet" ? opsiEwallet : dipilih === "kartu" ? opsiKartuTersimpan : null;

  const updateKartu = (field) => (e) => setKartu((k) => ({ ...k, [field]: e.target.value }));

  // Pilih sub-opsi. Untuk transfer, isi otomatis nomor rekening dari "Rekening
  // Bank Saya" bila bank yang dipilih sudah tersimpan di dashboard.
  const rekeningTerisiOtomatis =
    dipilih === "transfer" && !!bankAccounts.find((c) => c.namaBank === opsiTerpilih);

  const pilihOpsi = (opsi) => {
    setOpsiTerpilih(opsi);
    if (dipilih === "transfer") {
      const akun = bankAccounts.find((c) => c.namaBank === opsi);
      setNomorRekening(akun ? akun.nomor : "");
      setRekeningDipakai(false);
    }
  };

  const DIGIT_BANK = { BCA: 10, BNI: 10, Mandiri: 13, BRI: 15 };

  // Nomor rekening yang diinput langsung di halaman ini. Setelah lengkap, user
  // ditanya apakah mau menyimpannya ke dashboard (Rekening Bank Saya). Kalau
  // nomor persis sudah tersimpan, tidak ditanya lagi (langsung dipakai).
  const handleGunakanRekening = async () => {
    const bank = opsiTerpilih;
    const nomorBersih = nomorRekening.replace(/\D/g, "");
    const perlu = DIGIT_BANK[bank] || 10;

    if (nomorBersih.length !== perlu) {
      return Swal.fire({
        title: "Nomor rekening belum valid",
        text: `Nomor rekening ${bank} harus ${perlu} digit angka.`,
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#111827",
      });
    }

    const sudahAda = bankAccounts.some((c) => c.namaBank === bank && c.nomor === nomorBersih);
    if (!sudahAda) {
      const res = await Swal.fire({
        title: "Simpan rekening ke dashboard?",
        text: "Simpan agar tidak perlu mengetik ulang saat pembayaran berikutnya.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, simpan",
        cancelButtonText: "Tidak, pakai sekali ini",
        confirmButtonColor: "#111827",
        cancelButtonColor: "#6b7280",
      });
      if (res.isConfirmed) {
        setSavedCards((prev) => [
          ...prev,
          { id: Date.now(), jenis: "Rekening Bank Saya", namaBank: bank, nomor: nomorBersih },
        ]);
      }
    }
    setRekeningDipakai(true); // dipakai untuk pembayaran ini
  };

  // Kartu yang diinput langsung di halaman ini bisa berjenis "Kartu Kredit /
  // Debit" atau "OCTO Cash by CIMB Niaga". OCTO hanya butuh nomor + tanggal
  // (tanpa nama & CVV), sesuai form dashboard. Setelah lengkap, user ditanya
  // apakah mau menyimpannya ke dashboard (Bank & Cards).
  const isOctoBaru = jenisKartuBaru === "OCTO Cash by CIMB Niaga";

  const handleGunakanKartuBaru = async () => {
    const nomorBersih = kartu.nomor.replace(/\D/g, "");
    const gagal = (msg) =>
      Swal.fire({ title: "Data kartu belum lengkap", text: msg, icon: "warning", confirmButtonText: "OK", confirmButtonColor: "#111827" });

    if (nomorBersih.length !== 16) return gagal("Nomor kartu harus 16 digit angka.");
    if (!isOctoBaru && !kartu.nama.trim()) return gagal("Nama pada kartu wajib diisi.");
    if (!/^\d{2}\/\d{2}$/.test(kartu.kadaluarsa)) return gagal("Tanggal kedaluwarsa harus berformat BB/TT.");
    if (!isOctoBaru && kartu.cvv.length !== 3) return gagal("CVV harus 3 digit angka.");

    const label = `${jenisKartuBaru} ${maskNumber(nomorBersih)}`;

    const res = await Swal.fire({
      title: "Simpan kartu ke dashboard?",
      text: "Simpan agar tidak perlu mengetik ulang saat pembayaran berikutnya.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, simpan",
      cancelButtonText: "Tidak, pakai sekali ini",
      confirmButtonColor: "#111827",
      cancelButtonColor: "#6b7280",
    });

    if (res.isConfirmed) {
      const baru = isOctoBaru
        ? { id: Date.now(), jenis: "OCTO Cash by CIMB Niaga", nomor: nomorBersih, tgl: kartu.kadaluarsa }
        : { id: Date.now(), jenis: "Kartu Kredit / Debit", nomor: nomorBersih, nama: kartu.nama.trim(), expired: kartu.kadaluarsa, cvv: kartu.cvv };
      setSavedCards((prev) => [...prev, baru]);
    }
    setOpsiTerpilih(label); // pakai kartu ini untuk pembayaran
  };

  const metodeLabel = (() => {
    const m = metodeBayar.find((x) => x.id === dipilih)?.label || "Pembayaran";
    return opsiTerpilih ? `${m} · ${opsiTerpilih}` : m;
  })();

  // Metode dianggap lengkap bila detailnya sudah diisi/dikonfirmasi. Tanpa ini,
  // tombol "Bayar sekarang" nonaktif.
  const metodeValid =
    dipilih === "cod"
      ? true
      : dipilih === "transfer"
      ? rekeningDipakai
      : dipilih === "ewallet"
      ? !!opsiTerpilih && nomorHp.trim().length > 0
      : dipilih === "kartu"
      ? !!opsiTerpilih
      : false;

  function buatPelanggan(c) {
    if (!c) return { nama: "Pelanggan", alamat: "-", telepon: "-" };
    return {
      nama: c.fullName || c.username || "Pelanggan",
      alamat: [c.address, c.detail, c.city, c.province, c.negara].filter(Boolean).join(", ") || "-",
      telepon: c.phone || c.email || "-",
    };
  }

  function simpanPesanan(status, alasan) {
    const now = new Date();
    const orderId = buatOrderId();
    const order = {
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
    };
    simpanOrder(order);
    // Pesanan berhasil dibuat (pending/diproses) -> catat ke daftar dashboard.
    if (status !== "failed") tambahOrderDashboard(order);
    return orderId;
  }

  const handleProceed = () => {
    // Non-COD menunggu pembayaran (pending); COD langsung diproses.
    const isCOD = dipilih === "cod";
    const orderId = simpanPesanan(isCOD ? "diproses" : "pending");
    sudahBayarRef.current = true; // izinkan render saat keranjang kosong (menuju status)
    clear(); // pesanan dibuat -> kosongkan keranjang
    navigate(`/pembayaran/status/${orderId}`);
  };

  const handleKonfirmasiBatal = () => {
    const orderId = simpanPesanan("failed", alasanTerpilih);
    // keranjang dibiarkan agar bisa dicoba lagi
    navigate(`/invoice/${orderId}`, { state: { status: "failed", alasan: alasanTerpilih } });
  };

  // Tanpa isi keranjang tidak ada yang dibayar -> kembali ke keranjang.
  // Kecuali baru saja membayar (keranjang dikosongkan) — biarkan menuju status.
  if (items.length === 0 && !sudahBayarRef.current) return <Navigate to="/keranjang" replace />;

  return (
    <div
      className={`min-h-screen bg-cloud transition-opacity duration-500 ${
        tampil ? "opacity-100" : "opacity-0"
      }`}
    >
      <header className="border-b border-ash/60 bg-white py-4 text-center">
        <h1 className="text-xl font-bold tracking-[0.2em] text-ink">{NAMA_TOKO}</h1>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 md:gap-0">
        <div className="px-6 py-8 md:pl-0 md:pr-12 md:py-10 lg:pr-16">
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
                              setRekeningDipakai(false);
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
                      {dipilih === m.id && opsiDetail && opsiDetail.length > 0 && (
                        <div className="mt-2 grid animate-slidefade grid-cols-2 gap-2 pl-2">
                          {opsiDetail.map((opsi) => (
                            <button
                              key={opsi}
                              type="button"
                              onClick={() => pilihOpsi(opsi)}
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
                            onChange={(e) => {
                              setNomorRekening(e.target.value.replace(/\D/g, ""));
                              setRekeningDipakai(false);
                            }}
                            placeholder="mis. 1234567890"
                            className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                          />
                          {rekeningTerisiOtomatis && (
                            <p className="mt-1 text-[11px] text-emerald-600">
                              Terisi otomatis dari Rekening Bank Saya.
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={handleGunakanRekening}
                            className="mt-2 w-full border border-ink bg-white py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-white"
                          >
                            Gunakan rekening ini
                          </button>
                          {rekeningDipakai && (
                            <p className="mt-1 text-[11px] text-emerald-600">
                              Rekening dipakai: {opsiTerpilih} {maskNumber(nomorRekening)}
                            </p>
                          )}
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
                            onChange={(e) => setNomorHp(e.target.value.replace(/[^\d+]/g, ""))}
                            placeholder="mis. 08xx-xxxx-xxxx"
                            className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                          />
                          {user?.nohp && nomorHp === user.nohp && (
                            <p className="mt-1 text-[11px] text-emerald-600">
                              Diambil dari nomor HP profil — ubah bila berbeda.
                            </p>
                          )}
                        </div>
                      )}

                      {/* Kartu debit/kredit: bisa diinput langsung di sini. Setelah
                          klik "Gunakan kartu ini", user ditanya simpan ke dashboard atau tidak. */}
                      {dipilih === m.id && m.id === "kartu" && (
                        <div className="mt-2 animate-slidefade space-y-2 border border-ash bg-white p-3.5 pl-2">
                          <p className="text-xs font-medium text-smoke">
                            {debitCreditCards.length > 0 ? "Atau masukkan kartu baru" : "Masukkan kartu"}
                          </p>
                          {/* Pilih jenis kartu baru: Kartu Kredit/Debit atau OCTO Cash */}
                          <div className="grid grid-cols-2 gap-2">
                            {["Kartu Kredit / Debit", "OCTO Cash by CIMB Niaga"].map((j) => (
                              <button
                                key={j}
                                type="button"
                                onClick={() => setJenisKartuBaru(j)}
                                className={`border px-2 py-1.5 text-[11px] font-medium leading-tight transition ${
                                  jenisKartuBaru === j
                                    ? "border-ink bg-ink text-white"
                                    : "border-ash bg-white text-ink-soft hover:border-steel"
                                }`}
                              >
                                {j}
                              </button>
                            ))}
                          </div>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={kartu.nomor}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                              setKartu((k) => ({ ...k, nomor: v.match(/.{1,4}/g)?.join(" ") || "" }));
                            }}
                            placeholder="Nomor kartu (16 digit)"
                            className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                          />
                          {!isOctoBaru && (
                            <input
                              type="text"
                              value={kartu.nama}
                              onChange={updateKartu("nama")}
                              placeholder="Nama di kartu"
                              className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                            />
                          )}
                          <div className={isOctoBaru ? "" : "grid grid-cols-2 gap-2"}>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={kartu.kadaluarsa}
                              onChange={(e) => {
                                let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                                setKartu((k) => ({ ...k, kadaluarsa: v }));
                              }}
                              placeholder="BB/TT"
                              className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                            />
                            {!isOctoBaru && (
                              <input
                                type="password"
                                inputMode="numeric"
                                value={kartu.cvv}
                                onChange={(e) => setKartu((k) => ({ ...k, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                                placeholder="CVV"
                                className="w-full border border-ash bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={handleGunakanKartuBaru}
                            className="w-full border border-ink bg-white py-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-ink hover:text-white"
                          >
                            Gunakan kartu ini
                          </button>
                          {opsiTerpilih && (
                            <p className="text-[11px] text-emerald-600">Kartu terpilih: {opsiTerpilih}</p>
                          )}
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
                    disabled={!metodeValid}
                    className=" bg-ink px-6 py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink disabled:hover:text-white"
                  >
                    Bayar sekarang
                  </button>
                </div>
                {!metodeValid && (
                  <p className="mt-2 text-right text-[11px] text-steel">
                    Lengkapi detail metode pembayaran dulu untuk melanjutkan.
                  </p>
                )}
              </>
            ) : (
              /* Kartu konfirmasi pembayaran */
              <Card className="animate-slidefade p-5">
                <h2 className="mb-4 text-base font-semibold text-ink">Konfirmasi pembayaranmu</h2>

                <ul className="mb-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-3 text-sm">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink-soft">{item.nama}</p>
                        <p className="text-xs text-smoke">{item.varian} · x{item.qty}</p>
                      </div>
                      <span className="shrink-0 whitespace-nowrap text-ink-soft">{formatRupiah(item.harga * item.qty)}</span>
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

        <div className="border-t border-ash/60 px-6 py-8 md:border-t-0 md:border-l md:pl-12 md:pr-0 md:py-10 lg:pl-16">
          <div className="mx-auto max-w-md md:mr-auto md:ml-0">
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink-soft">{item.nama}</p>
                    <p className="text-xs text-smoke">{item.varian} · x{item.qty}</p>
                  </div>
                  <span className="shrink-0 text-ink-soft">{formatRupiah(item.harga * item.qty)}</span>
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
