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
          <span key={i} className={filled ? 'text-black' : 'text-ash'}>
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-smoke">({count})</span>
    </div>
  );
}
