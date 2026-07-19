/**
 * components/Loading.jsx
 * Spinner loading full-page, dipakai saat AuthContext cek auto-login.
 */
export default function Loading({ label = 'Memuat...' }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-white">
      <svg className="h-8 w-8 animate-spin text-black" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-15" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <p className="text-sm text-smoke">{label}</p>
    </div>
  )
}
