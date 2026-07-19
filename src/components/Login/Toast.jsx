/**
 * components/Toast.jsx
 * Toast notification yang muncul di pojok layar (bukan inline seperti Alert).
 */
export default function ToastContainer({ toasts, dismissToast }) {
  if (!toasts.length) return null

  return (
    <div className="fixed top-5 right-5 z-100 flex w-[90%] max-w-sm flex-col gap-2.5 sm:w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slideDown flex items-center justify-between gap-3 border px-4 py-3 text-sm backdrop-blur-md ${
            toast.type === 'success'
              ? 'border-green-200 bg-green-50/95 text-green-700'
              : toast.type === 'error'
              ? 'border-red-200 bg-red-50/95 text-red-700'
              : 'border-ash bg-white/95 text-ink-soft'
          }`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-steel hover:text-black"
            aria-label="Tutup notifikasi"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
