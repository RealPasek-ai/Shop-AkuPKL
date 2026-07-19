import { useNavigate, useLocation, useParams } from "react-router-dom";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import { fetchInvoice } from "../../services/pembayaranApi";
import { formatRupiah } from "../../utils/format";

const NAMA_TOKO = "WM.";

const dummyItems = [
  { id: 1, nama: "Kaos Polos Katun Combed", varian: "Hitam, L", qty: 2, harga: 89000 },
  { id: 2, nama: "Celana Chino Slim Fit", varian: "Krem, 32", qty: 1, harga: 215000 },
];

export default function Invoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { invoiceId } = useParams(); // <-- diambil dari URL

  const statusDariCancel = location.state?.status; // "failed" kalau datang dari alur cancel payment
  const alasan = location.state?.alasan;

  const {
    data: invoice,
    loading,
    error,
    refetch,
  } = useFetch(() => fetchInvoice(invoiceId), [invoiceId]);

  // Sumber dari order nyata (fetch); fallback ke contoh untuk orderId lama.
  const items = invoice?.items || dummyItems;
  const subtotal = invoice?.subtotal ?? items.reduce((acc, item) => acc + item.harga * item.qty, 0);
  const ongkir = invoice?.ongkir ?? 15000;
  const total = invoice?.total ?? subtotal + ongkir;

  const status = invoice?.status || statusDariCancel || "paid";

  return (
    <div className="min-h-screen bg-cloud">
      <header className="border-b border-ash/60 bg-white py-4 text-center">
        <h1 className="text-xl font-bold tracking-[0.2em] text-ink">{NAMA_TOKO}</h1>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <Card className="p-6 sm:p-8">
          {/* --- Loading state --- */}
          {loading && (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-steel border-t-transparent" />
              <p className="text-sm text-smoke">Memuat invoice...</p>
            </div>
          )}

          {/* --- Error state --- */}
          {!loading && error && (
            <div className="flex flex-col items-center py-10 text-center">
              <p className="mb-4 text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={refetch}
                className=" bg-ink px-5 py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink"
              >
                Coba lagi
              </button>
            </div>
          )}

          {/* --- Loaded state --- */}
          {!loading && !error && invoice && (
            <>
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-ash pb-6 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-bold tracking-wide text-smoke">INVOICE</p>
                  <p className="text-lg font-semibold text-ink">#{invoice.invoiceId}</p>
                  <p className="mt-1 text-xs text-smoke">Terbit {invoice.tanggalTerbit}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs font-medium ${
                    status === "failed"
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-emerald-300 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status === "failed" ? "bg-red-500" : "bg-emerald-500"}`} />
                  {status === "failed" ? "Gagal" : "Lunas"}
                </span>
              </div>

              {status === "failed" && (
                <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  Pembayaran ini dibatalkan{alasan ? ` — alasan: "${alasan}"` : ""}. Tidak ada dana yang ditagih.
                </div>
              )}

              <div className="mb-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wide text-smoke">DITAGIHKAN KE</p>
                  <p className="font-medium text-ink-soft">{invoice.pelanggan.nama}</p>
                  <p className="text-smoke">{invoice.pelanggan.alamat}</p>
                  <p className="text-smoke">{invoice.pelanggan.telepon}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wide text-smoke">METODE PEMBAYARAN</p>
                  <p className="font-medium text-ink-soft">{invoice.metodeBayar}</p>
                  <p className="mb-2 mt-3 text-xs font-bold tracking-wide text-smoke">DIKIRIM VIA</p>
                  <p className="font-medium text-ink-soft">{invoice.pengiriman}</p>
                </div>
              </div>

              <div className="mb-4 overflow-hidden border border-ash">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ash bg-cloud text-left text-xs text-smoke">
                      <th className="px-3 py-2 font-medium">Item</th>
                      <th className="px-3 py-2 text-center font-medium">Qty</th>
                      <th className="px-3 py-2 text-right font-medium">Harga</th>
                      <th className="px-3 py-2 text-right font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-cloud last:border-0">
                        <td className="px-3 py-3">
                          <p className="font-medium text-ink-soft">{item.nama}</p>
                          <p className="text-xs text-smoke">{item.varian}</p>
                        </td>
                        <td className="px-3 py-3 text-center text-smoke">{item.qty}</td>
                        <td className="px-3 py-3 text-right text-smoke">{formatRupiah(item.harga)}</td>
                        <td className="px-3 py-3 text-right font-medium text-ink-soft">
                          {formatRupiah(item.harga * item.qty)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ml-auto max-w-xs space-y-2 text-sm">
                <div className="flex justify-between text-smoke">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-smoke">
                  <span>Pengiriman</span>
                  <span>{formatRupiah(ongkir)}</span>
                </div>
                <div className="flex justify-between border-t border-ash pt-2 text-base font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2 border-t border-ash pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 bg-ink py-2.5 border border-ink text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-ink active:scale-[0.98]"
                >
                  Unduh PDF
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 border border-ink bg-white py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-white active:scale-[0.98]"
                >
                  Cetak invoice
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-4 w-full text-center text-xs font-medium text-smoke underline underline-offset-2 transition hover:text-ink-soft"
              >
                Kembali ke beranda
              </button>

              <p className="mt-6 text-center text-xs text-steel">
                Ada pertanyaan tentang pesanan ini? Hubungi kami di support@{NAMA_TOKO.toLowerCase().replace(/[^a-z0-9]/g, "")}.com
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
