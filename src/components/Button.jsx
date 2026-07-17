/**
 * components/Button.jsx
 * Tombol reusable dengan varian, loading state, dan disable saat submit.
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  fullWidth = true,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold text-sm px-5 py-3 transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary: 'bg-ink text-paper hover:bg-ink-soft active:scale-[0.98]',
    secondary: 'bg-white text-black border border-stone-300 hover:border-ink/50 hover:bg-white-soft active:scale-[0.98]',
    ghost: 'bg-transparent text-stone-500 hover:text-black',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {isLoading && (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {isLoading ? 'Memproses...' : children}
    </button>
  )
}
