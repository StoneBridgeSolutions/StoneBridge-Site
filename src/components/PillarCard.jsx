import { Link } from 'react-router-dom'
import ComingSoonBadge from './ComingSoonBadge'

export default function PillarCard({ icon, headline, body, tag, ctaText, ctaLink, comingSoon = false }) {
  return (
    <div className={`relative rounded-2xl p-8 border flex flex-col ${
      comingSoon ? 'border-white/10 bg-white/3 opacity-70' : 'border-white/10 bg-white/5 hover:border-gold/30 transition-colors'
    }`}>
      {comingSoon && (
        <div className="absolute top-6 right-6">
          <ComingSoonBadge />
        </div>
      )}
      {tag && !comingSoon && (
        <span className="inline-block bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full font-sans uppercase tracking-wider mb-4 self-start">
          {tag}
        </span>
      )}
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-serif text-2xl text-white mb-3">{headline}</h3>
      <p className="font-sans text-white/85 text-sm leading-relaxed mb-6 flex-1">{body}</p>
      {comingSoon ? (
        <Link to="#email-capture" className="inline-block border border-white/20 text-white/80 px-5 py-2.5 rounded font-sans text-sm text-center">
          {ctaText}
        </Link>
      ) : (
        <Link to={ctaLink} className="inline-block border border-gold text-gold px-5 py-2.5 rounded font-sans font-semibold text-sm hover:bg-gold hover:text-navy transition-colors self-start">
          {ctaText}
        </Link>
      )}
    </div>
  )
}
