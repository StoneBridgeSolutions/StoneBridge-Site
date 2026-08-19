import { Link } from 'react-router-dom'

export default function FoundingMemberBanner({ spotsRemaining = 47, ctaLink = '/signup' }) {
  return (
    <div className="bg-gold rounded-2xl p-8 md:p-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-sans text-navy text-xs font-bold uppercase tracking-widest mb-2">Limited Time  Founding Member Offer</p>
        <h2 className="font-serif text-3xl md:text-4xl text-navy mb-4">First 50 Clients Get Their Setup Fee Waived.</h2>
        <p className="font-sans text-navy/80 text-base mb-2 leading-relaxed">
          Voice AI agents normally include a one-time setup fee of $160$195. The first 50 clients who sign up get it completely waived. No catch. We're building our client base and we want to earn your trust before we ask for it.
        </p>
        <p className="font-sans text-navy font-bold text-lg mb-6">[{spotsRemaining}] spots remaining.</p>
        <Link to={ctaLink} className="inline-block bg-navy text-white px-8 py-3.5 rounded font-sans font-semibold text-sm hover:bg-charcoal transition-colors">
          Claim Your Spot
        </Link>
      </div>
    </div>
  )
}
