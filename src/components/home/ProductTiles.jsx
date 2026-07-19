import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/Dashboard/useProducts'
import useDragScroll from '../../hooks/useDragScroll'

/**
 * components/home/ProductTiles.jsx
 * Baris tile produk horizontal yang bisa digeser (mouse drag di desktop, touch
 * di mobile) tanpa tombol Next/Prev. Gaya editorial WM.: mono, tajam, border.
 */
export default function ProductTiles() {
  const { products } = useProducts()
  const rowRef = useDragScroll()
  const tiles = products.slice(0, 8)

  if (tiles.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
      <div
        ref={rowRef}
        className="scrollbar-none flex cursor-grab select-none gap-4 overflow-x-auto pb-2 active:cursor-grabbing"
      >
        {tiles.map((p) => (
          <Link
            key={p.id}
            to={`/produk/${p.id}`}
            className="group flex w-64 shrink-0 items-center justify-between gap-3 border border-ash bg-cloud p-5 transition-colors hover:border-black"
          >
            <div className="min-w-0">
              <p className="heading-display line-clamp-2 text-sm uppercase leading-tight text-ink">{p.title}</p>
              <span className="eyebrow mt-2 inline-block border-b border-black pb-0.5 text-smoke transition-colors group-hover:text-black">
                Belanja →
              </span>
            </div>
            <img
              src={p.image}
              alt=""
              loading="lazy"
              draggable={false}
              className="h-16 w-16 shrink-0 object-contain"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
