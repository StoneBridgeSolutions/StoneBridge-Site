import { ArrowRight, RefreshCw } from 'lucide-react';

export default function Retention() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-navy flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <RefreshCw className="text-gold" size={40} />
        </div>
        <div className="inline-block bg-gold/10 border border-gold/40 text-gold text-sm font-semibold px-4 py-1 rounded-full mb-6">
          Coming Soon
        </div>
        <h1 className="text-5xl font-serif font-bold text-white mb-6">
          Client Retention Suite
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          Keep your clients coming back with automated follow-ups, loyalty programs, and re-engagement campaigns.
        </p>
        <p className="text-gray-400 mb-10">
          Turn one-time customers into lifetime clients with intelligent retention tools built specifically for service businesses.
        </p>
        <div className="bg-navy-raised rounded-2xl border border-gold/20 p-8 text-left mb-8">
          <h3 className="text-white font-bold text-lg mb-4">What's coming:</h3>
          <ul className="space-y-3 text-gray-300">
            {[
              'Automated follow-up sequences post-service',
              'Loyalty reward programs',
              'Win-back campaigns for lapsed clients',
              'Review & referral request automation',
              'Birthday & anniversary touchpoints',
              'Client satisfaction surveys'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/pricing#retention"
            className="inline-flex items-center justify-center gap-2 bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            View Current Pricing
            <ArrowRight size={18} />
          </a>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-gold text-gold px-8 py-3 rounded-lg font-semibold hover:bg-gold hover:text-navy transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
