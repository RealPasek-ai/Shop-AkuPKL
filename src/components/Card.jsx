/**
 * components/Card.jsx
 * Container kartu editorial: border tajam tanpa sudut membulat & tanpa shadow,
 * konsisten dengan bahasa visual Home (flat + bordered).
 */
export default function Card({ children, className = '' }) {
  return (
    <div
      className={`w-full border border-ash bg-white p-8 animate-fadeIn ${className}`}
    >
      {children}
    </div>
  )
}
