import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import { fetchStatusPesanan } from "../../services/pembayaranApi";
import { formatRupiah } from "../../utils/format";

const NAMA_TOKO = "WM.";

const alasanBatal = [
  "Salah memilih metode pembayaran",
  "Ingin mengubah alamat pengiriman",
  "Berubah pikiran",
  "Menemukan harga lebih murah di tempat lain",
  "Lainnya",
];

export default function StatusPembayaran() {
  const navigate = useNavigate();
  const { orderId } = useParams(); // <-- diambil dari URL, ini bagian useParams-nya

  const {
    data: pesanan,
    loading,
    error,
    refetch,
  } = useFetch(() => fetchStatusPesanan(orderId), [orderId]);

  const [statusManual, setStatusManual] = useState(null); // null = ikut hasil fetch (dianggap "berhasil")
  const [mengecekUlang, setMengecekUlang] = useState(false);
  const [showBatal, setShowBatal] = useState(false);
  const [alasanTerpilih, setAlasanTerpilih] = useState("");

  const status =
    statusManual ??
    (pesanan
      ? pesanan.status === "pending"
        ? "pending"
        : pesanan.status === "failed"
        ? "gagal"
        : "berhasil"
      : null);

  const cekUlang = async () => {
    setMengecekUlang(true);
    await refetch();
    setMengecekUlang(false);
  };

  const konfirmasiBatal = () => {
    setStatusManual("gagal");
    setShowBatal(false);
  };

  return (
    <div className="min-h-screen bg-cloud">
      <header className="border-b border-ash/60 bg-white py-4 text-center">
        <h1 className="text-xl font-bold tracking-[0.2em] text-ink">{NAMA_TOKO}</h1>
      </header>

      <div className="mx-auto max-w-md px-6 py-10">
        <Card className="p-6 text-center transition-all duration-300">
          {/* --- Loading state --- */}
          {loading && (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-ash bg-cloud">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-steel border-t-transparent" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-ink">Mengecek status pembayaran...</h2>
              <p className="text-sm text-smoke">Mohon tunggu sebentar.</p>
            </>
          )}

          {/* --- Error state --- */}
          {!loading && error && (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-300 bg-red-50 text-2xl text-red-700">
                ⚠️
              </div>
              <h2 className="mb-2 text-lg font-semibold text-ink">Terjadi kesalahan</h2>
              <p className="mb-6 text-sm text-smoke">{error}</p>
              <button
                type="button"
                onClick={refetch}
                className="w-full bg-ink py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink active:scale-[0.98]"
              >
                Coba lagi
              </button>
            </>
          )}

          {/* --- Loaded state --- */}
          {!loading && !error && pesanan && (
            <>
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border text-2xl transition-all duration-300 ${
                  status === "gagal"
                    ? "border-red-300 bg-red-50 text-red-700"
                    : status === "pending"
                    ? "border-amber-300 bg-amber-50 text-amber-700"
                    : "border-emerald-300 bg-emerald-50 text-emerald-700"
                }`}
              >
                {mengecekUlang ? (
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-steel border-t-transparent" />
                ) : status === "gagal" ? (
                  "✕"
                ) : status === "pending" ? (
                  "⏳"
                ) : (
                  "✅"
                )}
              </div>
              <h2 className="mb-2 text-lg font-semibold text-ink">
                {status === "gagal"
                  ? "Pembayaran dibatalkan"
                  : status === "pending"
                  ? "Menunggu pembayaran"
                  : "Pembayaran berhasil"}
              </h2>
              <p className="mb-6 text-sm text-smoke">
                {status === "gagal"
                  ? "Pembayaranmu telah dibatalkan. Kamu bisa mencoba membayar lagi kapan saja."
                  : status === "pending"
                  ? "Pesananmu sudah dibuat. Selesaikan pembayaran lewat halaman detail pesanan di akunmu."
                  : "Terima kasih! Pesananmu sudah kami terima dan akan segera diproses."}
              </p>

              <div className="mb-6 space-y-2 bg-cloud p-4 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-smoke">Nomor pesanan</span>
                  <span className="font-medium text-ink-soft">#{pesanan.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Subtotal</span>
                  <span className="font-medium text-ink-soft">
                    {formatRupiah(pesanan.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Pengiriman</span>
                  <span className="font-medium text-ink-soft">
                    {formatRupiah(pesanan.ongkir)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-ash pt-2">
                  <span className="text-smoke">Total dibayar</span>
                  <span className="font-medium text-ink-soft">
                    {formatRupiah(pesanan.total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Metode</span>
                  <span className="font-medium text-ink-soft">{pesanan.metode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-smoke">Waktu</span>
                  <span className="font-medium text-ink-soft">{pesanan.waktu}</span>
                </div>
              </div>

              {showBatal ? (
                <div className="mb-4 animate-slidefade space-y-2 border border-ash bg-cloud p-4 text-left">
                  <p className="mb-2 text-sm font-medium text-ink-soft">Kenapa kamu ingin membatalkan pembayaran ini?</p>
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
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={konfirmasiBatal}
                      disabled={!alasanTerpilih}
                      className="flex-1 border border-red-600 bg-red-600 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-red-600 disabled:opacity-50"
                    >
                      Konfirmasi pembatalan
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {status !== "gagal" && (
                    <button
                      type="button"
                      onClick={() => navigate(`/invoice/${pesanan.orderId}`)}
                      className="w-full bg-ink py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink active:scale-[0.98]"
                    >
                      Lihat invoice
                    </button>
                  )}

                  {status === "gagal" && (
                    <button
                      type="button"
                      onClick={() => navigate("/pembayaran/pilih")}
                      className="w-full bg-ink py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink active:scale-[0.98]"
                    >
                      Coba bayar lagi
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-3 w-full border border-ink bg-white py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-white"
                  >
                    ‹ Kembali ke halaman sebelumnya
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mt-4 w-full text-sm font-medium text-smoke underline underline-offset-2 transition hover:text-ink-soft"
                  >
                    Kembali ke beranda
                  </button>

                  {status !== "gagal" && (
                    <button
                      type="button"
                      onClick={() => setShowBatal(true)}
                      className="mt-2 w-full text-xs text-steel underline underline-offset-2 transition hover:text-red-500"
                    >
                      Batalkan pembayaran
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
