/**
 * components/Card.jsx
 * Container kartu premium dengan border tipis & background putih berlapis.
 */
export default function Card({ children, className = '' }) {
  return (
    <div
      className={`w-full rounded-2xl border border-stone-200 bg-paper p-8 shadow-xl shadow-stone-200/60 animate-fadeIn ${className}`}
    >
      {children}
    </div>
  )
}
