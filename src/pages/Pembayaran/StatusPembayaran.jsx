import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import useFetch from "../../hooks/useFetch";
import { fetchStatusPesanan } from "../../services/pembayaranApi";

const NAMA_TOKO = "TOKOKU";

const alasanBatal = [
  "Selected the wrong payment method",
  "Want to change the shipping address",
  "Changed my mind",
  "Found a cheaper price elsewhere",
  "Other",
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

  const status = statusManual ?? (pesanan ? "berhasil" : null);

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
    <div className="min-h-screen bg-[#F4F1EA]">
      <header className="border-b border-stone-300/60 bg-white py-4 text-center">
        <h1 className="text-xl font-bold tracking-[0.2em] text-stone-900">{NAMA_TOKO}</h1>
      </header>

      <div className="mx-auto max-w-md px-6 py-10">
        <Card className="p-6 text-center transition-all duration-300">
          {/* --- Loading state --- */}
          {loading && (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-stone-300 bg-stone-50">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-stone-400 border-t-transparent" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-stone-900">Checking payment status...</h2>
              <p className="text-sm text-stone-500">Please wait a moment.</p>
            </>
          )}

          {/* --- Error state --- */}
          {!loading && error && (
            <>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-300 bg-red-50 text-2xl text-red-700">
                ⚠️
              </div>
              <h2 className="mb-2 text-lg font-semibold text-stone-900">Something went wrong</h2>
              <p className="mb-6 text-sm text-stone-500">{error}</p>
              <button
                type="button"
                onClick={refetch}
                className="w-full rounded-md bg-stone-900 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
              >
                Try again
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
                    : "border-emerald-300 bg-emerald-50 text-emerald-700"
                }`}
              >
                {mengecekUlang ? (
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-stone-400 border-t-transparent" />
                ) : status === "gagal" ? (
                  "✕"
                ) : (
                  "✅"
                )}
              </div>
              <h2 className="mb-2 text-lg font-semibold text-stone-900">
                {status === "gagal" ? "Payment cancelled" : "Payment successful"}
              </h2>
              <p className="mb-6 text-sm text-stone-500">
                {status === "gagal"
                  ? "Your payment has been cancelled. You can try paying again anytime."
                  : "Thank you! We've received your order and it will be processed shortly."}
              </p>

              <div className="mb-6 space-y-2 rounded-md bg-stone-50 p-4 text-left text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Order number</span>
                  <span className="font-medium text-stone-800">#{pesanan.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-medium text-stone-800">
                    {pesanan.subtotal.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Shipping</span>
                  <span className="font-medium text-stone-800">
                    {pesanan.ongkir.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-2">
                  <span className="text-stone-500">Total paid</span>
                  <span className="font-medium text-stone-800">
                    {pesanan.total.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Method</span>
                  <span className="font-medium text-stone-800">{pesanan.metode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Time</span>
                  <span className="font-medium text-stone-800">{pesanan.waktu}</span>
                </div>
              </div>

              {showBatal ? (
                <div className="mb-4 animate-slidefade space-y-2 rounded-md border border-stone-200 bg-stone-50 p-4 text-left">
                  <p className="mb-2 text-sm font-medium text-stone-800">Why do you want to cancel this payment?</p>
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
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={konfirmasiBatal}
                      disabled={!alasanTerpilih}
                      className="flex-1 rounded-md bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                      Confirm cancellation
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {status !== "gagal" && (
                    <button
                      type="button"
                      onClick={() => navigate(`/invoice/${pesanan.orderId}`)}
                      className="w-full rounded-md bg-stone-900 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
                    >
                      View invoice
                    </button>
                  )}

                  {status === "gagal" && (
                    <button
                      type="button"
                      onClick={() => navigate("/pembayaran/pilih")}
                      className="w-full rounded-md bg-stone-900 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 active:scale-[0.98]"
                    >
                      Try paying again
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mt-3 w-full rounded-md border border-stone-300 bg-white py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                  >
                    ‹ Back to previous page
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="mt-4 w-full text-sm font-medium text-stone-500 underline underline-offset-2 transition hover:text-stone-700"
                  >
                    Back to home
                  </button>

                  {status !== "gagal" && (
                    <button
                      type="button"
                      onClick={() => setShowBatal(true)}
                      className="mt-2 w-full text-xs text-stone-400 underline underline-offset-2 transition hover:text-red-500"
                    >
                      Cancel payment
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