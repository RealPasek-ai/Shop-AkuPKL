import { useRef } from 'react'

/**
 * components/OtpInput.jsx
 * Input OTP 6 digit dengan kotak terpisah, auto-focus ke kotak berikutnya.
 */
export default function OtpInput({ value, onChange, error }) {
  const inputRefs = useRef([])
  const digits = value.split('').concat(Array(6).fill('')).slice(0, 6)

  function handleChange(index, rawVal) {
    const digit = rawVal.replace(/\D/g, '').slice(-1)
    const newDigits = [...digits]
    newDigits[index] = digit
    const newValue = newDigits.join('').slice(0, 6)
    onChange(newValue)

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            className={`h-12 w-full max-w-[3rem] rounded-lg border bg-paper text-center text-lg font-semibold text-ink transition-colors focus:border-gold ${
              error ? 'border-red-400' : 'border-stone-300'
            }`}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-xs text-red-500 animate-slideDown">{error}</p>}
    </div>
  )
}
