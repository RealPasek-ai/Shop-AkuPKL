/**
 * MarqueeBar
 * Ticker berjalan di bawah navbar — elemen signature yang mengangkat
 * nuansa "drop culture" toko sneaker/streetwear, murni tipografi hitam-putih.
 */
const ITEMS = [
  'GRATIS ONGKIR DI ATAS $75',
  'KOLEKSI TERBARU SETIAP MINGGU',
  '100% ORIGINAL & TERJAMIN',
  'RETUR MUDAH 14 HARI',
];

export default function MarqueeBar() {
  const content = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-b border-black bg-black py-2" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[...content, ...content].map((item, i) => (
          <span key={i} className="eyebrow flex items-center gap-10 text-white">
            {item}
            <span className="text-white">✕</span>
          </span>
        ))}
      </div>
    </div>
  );
}
