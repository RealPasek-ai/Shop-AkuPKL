/**
 * components/Modal.jsx
 * Modal generik reusable, dipakai a.l. untuk konfirmasi logout.
 */
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      {/* Content */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-stone-200 bg-paper p-6 shadow-2xl animate-slideDown">
        {title && <h3 className="mb-3 text-lg font-semibold text-ink">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
