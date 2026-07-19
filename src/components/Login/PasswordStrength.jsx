import { getPasswordStrength, PASSWORD_STRENGTH_LABELS } from '../../utils/validation'

/**
 * components/PasswordStrength.jsx
 * Indikator visual kekuatan password secara real-time.
 */
export default function PasswordStrength({ password }) {
  if (!password) return null

  const strength = getPasswordStrength(password) // 0 - 4
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-500', 'bg-green-500']

  return (
    <div className="mt-2 animate-fadeIn">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < strength ? colors[strength] : 'bg-ash'
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-smoke">
        Kekuatan password: <span className="text-ink-soft">{PASSWORD_STRENGTH_LABELS[strength]}</span>
      </p>
    </div>
  )
}
