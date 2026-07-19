/**
 * Rating — menampilkan rating produk (bintang) dalam gaya monokrom.
 */
export default function Rating({ rate = 0, count = 0, size = 'sm' }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rate));
  const starSize = size === 'lg' ? 'text-lg' : 'text-xs';

  return (
    <div className="flex items-center gap-2">
      <div className={`flex gap-0.5 ${starSize}`} aria-label={`Rating ${rate} dari 5`}>
        {stars.map((filled, i) => (
          <span
            key={i}
            className={filled ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-smoke group-hover:text-white/60">({count})</span>
    </div>
  );
}
