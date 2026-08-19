import { Link } from 'react-router-dom'

export default function PricingCard({
  packageName,
  price,
  yearlyPrice,
  features = [],
  ctaText = 'Get Started',
  ctaLink = '/signup',
  isFeatured = false,
  setupFee = null,
  foundingMemberNote = null,
  billingCycle = 'monthly',
  note = null,
}) {
  return (
    <div className={`relative rounded-2xl p-8 flex flex-col ${
      isFeatured
        ? 'border-2 border-gold bg-white/5 shadow-2xl shadow-gold/10 scale-105'
        : 'border border-white/10 bg-white/3'
    }`}>
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gold text-navy text-xs font-bold px-4 py-1.5 rounded-full font-sans uppercase tracking-wider whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-serif text-xl text-white mb-2">{packageName}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gold font-sans">${billingCycle === 'yearly' ? (yearlyPrice / 12).toFixed(2) : price}</span>
          <span className="text-white/80 font-sans text-sm">/mo</span>
        </div>
        {billingCycle === 'yearly' && yearlyPrice && (
          <p className="text-white/75 font-sans text-xs mt-1">${yearlyPrice}/year billed annually</p>
        )}
        {billingCycle === 'monthly' && yearlyPrice && (
          <p className="text-gold/70 font-sans text-xs mt-1">${yearlyPrice}/year if billed annually</p>
        )}
      </div>

      <ul className="flex flex-col gap-3 mb-6 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-gold mt-0.5 flex-shrink-0"></span>
            <span className="text-white/90 font-sans text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {setupFee && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <p className="text-white/80 font-sans text-xs">One-time setup: <span className="text-light line-through">{setupFee}</span></p>
          {foundingMemberNote && <p className="text-gold font-sans text-xs font-semibold mt-0.5">{foundingMemberNote}</p>}
        </div>
      )}

      <Link
        to={ctaLink}
        className={`block text-center px-6 py-3 rounded font-sans font-semibold text-sm transition-colors ${
          isFeatured
            ? 'bg-gold text-navy hover:bg-yellow-400'
            : 'border border-gold text-gold hover:bg-gold hover:text-navy'
        }`}
      >
        {ctaText}
      </Link>

      {note && <p className="text-center text-white/65 font-sans text-xs mt-3">{note}</p>}
    </div>
  )
}
