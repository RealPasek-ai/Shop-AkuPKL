import { useNavigate, useLocation, useParams } from "react-router-dom";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import { fetchInvoice } from "../../services/pembayaranApi";

const NAMA_TOKO = "TOKOKU";

const dummyItems = [
  { id: 1, nama: "Kaos Polos Katun Combed", varian: "Hitam, L", qty: 2, harga: 89000 },
  { id: 2, nama: "Celana Chino Slim Fit", varian: "Krem, 32", qty: 1, harga: 215000 },
];

function formatRupiah(angka) {
  return angka.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
}

export default function Invoice({ items = dummyItems }) {
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

  const subtotal = items.reduce((acc, item) => acc + item.harga * item.qty, 0);
  const ongkir = 15000;
  const total = subtotal + ongkir;

  const status = statusDariCancel === "failed" ? "failed" : "paid";

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      <header className="border-b border-stone-300/60 bg-white py-4 text-center">
        <h1 className="text-xl font-bold tracking-[0.2em] text-stone-900">{NAMA_TOKO}</h1>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <Card className="p-6 sm:p-8">
          {/* --- Loading state --- */}
          {loading && (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-stone-400 border-t-transparent" />
              <p className="text-sm text-stone-500">Loading invoice...</p>
            </div>
          )}

          {/* --- Error state --- */}
          {!loading && error && (
            <div className="flex flex-col items-center py-10 text-center">
              <p className="mb-4 text-sm text-red-600">{error}</p>
              <button
                type="button"
                onClick={refetch}
                className="rounded-md bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* --- Loaded state --- */}
          {!loading && !error && invoice && (
            <>
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-bold tracking-wide text-stone-500">INVOICE</p>
                  <p className="text-lg font-semibold text-stone-900">#{invoice.invoiceId}</p>
                  <p className="mt-1 text-xs text-stone-500">Issued {invoice.tanggalTerbit}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 text-xs font-medium ${
                    status === "failed"
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-emerald-300 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status === "failed" ? "bg-red-500" : "bg-emerald-500"}`} />
                  {status === "failed" ? "Failed" : "Paid"}
                </span>
              </div>

              {status === "failed" && (
                <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  This payment was cancelled{alasan ? ` — reason: "${alasan}"` : ""}. No amount has been charged.
                </div>
              )}

              <div className="mb-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wide text-stone-500">BILLED TO</p>
                  <p className="font-medium text-stone-800">{invoice.pelanggan.nama}</p>
                  <p className="text-stone-500">{invoice.pelanggan.alamat}</p>
                  <p className="text-stone-500">{invoice.pelanggan.telepon}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-bold tracking-wide text-stone-500">PAYMENT METHOD</p>
                  <p className="font-medium text-stone-800">{invoice.metodeBayar}</p>
                  <p className="mb-2 mt-3 text-xs font-bold tracking-wide text-stone-500">SHIPPED VIA</p>
                  <p className="font-medium text-stone-800">{invoice.pengiriman}</p>
                </div>
              </div>

              <div className="mb-4 overflow-hidden rounded-md border border-stone-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs text-stone-500">
                      <th className="px-3 py-2 font-medium">Item</th>
                      <th className="px-3 py-2 text-center font-medium">Qty</th>
                      <th className="px-3 py-2 text-right font-medium">Price</th>
                      <th className="px-3 py-2 text-right font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-stone-100 last:border-0">
                        <td className="px-3 py-3">
                          <p className="font-medium text-stone-800">{item.nama}</p>
                          <p className="text-xs text-stone-500">{item.varian}</p>
                        </td>
                        <td className="px-3 py-3 text-center text-stone-600">{item.qty}</td>
                        <td className="px-3 py-3 text-right text-stone-600">{formatRupiah(item.harga)}</td>
                        <td className="px-3 py-3 text-right font-medium text-stone-800">
                          {formatRupiah(item.harga * item.qty)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ml-auto max-w-xs space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{formatRupiah(ongkir)}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-semibold text-stone-900">
                  <span>Total</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2 border-t border-stone-200 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 rounded-md bg-stone-900 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 rounded-md border border-stone-300 bg-white py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50 active:scale-[0.98]"
                >
                  Print invoice
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-4 w-full text-center text-xs font-medium text-stone-500 underline underline-offset-2 transition hover:text-stone-700"
              >
                Back to home
              </button>

              <p className="mt-6 text-center text-xs text-stone-400">
                Questions about this order? Contact us at support@{NAMA_TOKO.toLowerCase()}.com
              </p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}