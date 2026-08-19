import { useState } from 'react';

export default function EmailCapture({ placeholder = 'Enter your email address', buttonText = 'Notify Me' }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) { setSubmitted(true) }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-3 bg-gold/10 border border-gold/30 rounded-lg px-6 py-4 w-full max-w-lg mx-auto">
        <span className="text-gold text-xl">&#10003;</span>
        <span className="font-sans text-white font-medium">You're on the list! We'll be in touch.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="flex-1 min-w-0 bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold"
      />
      <button type="submit" className="bg-gold text-navy px-6 py-3 rounded font-sans font-semibold text-sm hover:bg-yellow-400 transition-colors whitespace-nowrap w-full sm:w-auto">
        {buttonText}
      </button>
    </form>
  )
}
