/**
 * Loader — indikator pemuatan data, dipakai di semua halaman yang fetch API.
 */
export default function Loader({ label = 'Memuat...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-ash border-t-black" />
      <p className="eyebrow text-smoke">{label}</p>
    </div>
  );
}
