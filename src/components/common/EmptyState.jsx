/**
 * EmptyState — ditampilkan saat data kosong atau terjadi error fetch.
 */
export default function EmptyState({
  title = 'Tidak ada data',
  description = 'Coba ubah kata kunci atau periksa kembali nanti.',
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-ash py-24 text-center">
      <p className="heading-display text-3xl">{title}</p>
      <p className="max-w-sm text-sm text-smoke">{description}</p>
      {action}
    </div>
  );
}
