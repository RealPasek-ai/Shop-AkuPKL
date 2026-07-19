/**
 * components/Alert.jsx
 * Alert inline untuk pesan sukses/error/info di dalam form.
 */
export default function Alert({ type = 'error', message }) {
  if (!message) return null

  const styles = {
    error: 'border-red-200 bg-red-50 text-red-700',
    success: 'border-green-200 bg-green-50 text-green-700',
    info: 'border-ink/30 bg-cloud/60 text-ink-soft',
  }

  const icons = {
    error: '⚠',
    success: '✓',
    info: 'ℹ',
  }

  return (
    <div
      role="alert"
      className={`mb-4 flex items-start gap-2.5 border px-4 py-3 text-sm animate-slideDown ${styles[type]}`}
    >
      <span className="mt-0.5 font-bold">{icons[type]}</span>
      <span>{message}</span>
    </div>
  )
}
