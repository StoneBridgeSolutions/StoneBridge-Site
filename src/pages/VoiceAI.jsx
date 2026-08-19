import { useState } from 'react'
import { Link } from 'react-router-dom'
import PricingCard from '../components/PricingCard'
import FoundingMemberBanner from '../components/FoundingMemberBanner'

const voicePlans = [
  {
    packageName: 'Starter Voice Intake Package',
    price: '69.99',
    yearlyPrice: '815.88',
    features: [
      '100 minutes/month (use or lose)',
      '1 free phone line (choose your area code)',
      '1 AI agent  built and configured for you',
      '7 days of free change requests after launch',
      'Extra minutes from $0.53/min',
      'Additional lines: $4.99/month',
      'Port your number: $9.99 one-time',
    ],
    ctaText: 'Get Started',
    setupFee: '$195',
    foundingMemberNote: 'WAIVED for first 50 clients  Founding Member offer',
    note: 'Best for solo operators with steady inbound calls.',
  },
  {
    packageName: 'Intake Pro Voice Package',
    price: '119.99',
    yearlyPrice: '1319.89',
    features: [
      '200 minutes/month (use or lose)',
      '2 free phone lines',
      'Up to 2 AI agents  built and configured for you',
      '7 days of free change requests per agent',
      'Extra minutes from $0.49/min',
      'Additional lines beyond 2: $4.99/month',
      'Port your number: $9.99 one-time per number',
    ],
    ctaText: 'Go Pro',
    isFeatured: true,
    setupFee: '$175/agent',
    foundingMemberNote: 'WAIVED for first 50 clients  Founding Member offer',
    note: 'Best for businesses with multiple service lines or locations.',
  },
  {
    packageName: 'Intake Powerhouse Voice Package',
    price: '249.99',
    yearlyPrice: '2499.90',
    features: [
      '500 minutes/month',
      '5 free phone lines',
      'Up to 3 AI agents',
      '7 days of free change requests per agent',
      'Extra minutes from $0.42/min',
      'Additional lines beyond 5: $3.99/month',
      'Port your number: $9.99 one-time per number',
    ],
    ctaText: 'Get Powerhouse',
    setupFee: '$160/agent',
    foundingMemberNote: 'WAIVED for first 50 clients  Founding Member offer',
    note: 'Best for high-volume operations or teams managing multiple businesses.',
  },
]

const faqs = [
  { q: "What if the AI can't answer a question?", a: "It's trained on your business  your services, pricing ranges, service area, and FAQs. If something falls outside its knowledge, it takes the caller's information and tells them you'll follow up personally. No caller gets hung up on." },
  { q: 'Can I customize what the AI says?', a: 'Yes. You review and approve the script before it goes live. After launch, you get 7 days of free change requests. Changes can be submitted anytime as an add-on after that.' },
  { q: 'What happens if I go over my minutes?', a: "Calls continue uninterrupted. Overage minutes are billed at your plan's rate at the end of the billing cycle." },
  { q: 'Can I use my existing business number?', a: 'Yes. Number porting is available for a one-time $9.99 fee per number.' },
  { q: 'How long does setup take?', a: '35 business days from the time you complete your business profile after signup.' },
  { q: 'What if I want to pause my service?', a: 'You can pause or cancel from your dashboard at any time. No contracts or penalties.' },
]

export default function VoiceAI() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  return (
    <div className="bg-navy pt-20">
      {/* Hero */}
      <section className="grain-overlay relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-charcoal to-navy"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">Your Business Just Got a 24/7 AI Receptionist.</h1>
          <p className="font-sans text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-10">It answers every call. Qualifies every lead. Books appointments. Takes detailed notes. And never, ever sends a caller to voicemail.</p>
          <Link to="/signup" className="inline-block bg-gold text-navy px-8 py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors">Get My AI Receptionist</Link>
        </div>
      </section>

      {/* The Math */}
      <section className="bg-charcoal py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-white text-center mb-12">What Does a Missed Call Actually Cost You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-white/10 bg-white/5 rounded-2xl p-8">
              <h3 className="font-sans font-bold text-white/75 uppercase text-xs tracking-wider mb-6">The Old Way</h3>
              <ul className="space-y-4">
                {['Miss a call while on the job', 'Caller leaves no voicemail or calls your competitor', 'Average job value: $200$800', 'How many calls did you miss this week?'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="text-red-400 mt-0.5"></span><span className="font-sans text-white/85 text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="border border-gold/30 bg-gold/5 rounded-2xl p-8">
              <h3 className="font-sans font-bold text-gold uppercase text-xs tracking-wider mb-6">With StoneBridge Voice AI</h3>
              <ul className="space-y-4">
                {['Every call answered in under 2 rings', 'Lead qualified, details captured, appointment offered', 'Cost: Starting at $69.99/month', 'Pays for itself with one job.'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="text-gold mt-0.5"></span><span className="font-sans text-white/85 text-sm">{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-gold/10 border border-gold/30 rounded-xl p-6 text-center">
            <p className="font-sans text-gold font-semibold">An employee answering your phones costs $1,600+/month  plus taxes, benefits, and management. Your AI receptionist starts at $69.99. No benefits required.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-gold text-xs font-bold uppercase tracking-widest text-center mb-4">We configure everything. You just take the calls that matter.</p>
          <h2 className="font-serif text-4xl text-white text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'We Build Your Agent', body: 'We set up your AI receptionist with your business name, services, pricing ranges, and booking flow. You review it and approve it before it goes live. Setup takes 35 business days.' },
              { step: '02', title: 'It Answers Everything', body: 'Your AI handles every inbound call  greeting callers by your business name, answering common questions, qualifying the lead, and offering to book an appointment.' },
              { step: '03', title: 'You Get the Lead', body: 'Every qualified call lands in your dashboard with full notes  name, number, what they need, when they want service. You follow up or we route it directly to your calendar.' },
            ].map(s => (
              <div key={s.step} className="border border-white/10 bg-white/5 rounded-2xl p-8">
                <p className="font-sans text-gold font-bold text-3xl mb-4">{s.step}</p>
                <h3 className="font-serif text-xl text-white mb-3">{s.title}</h3>
                <p className="font-sans text-white/85 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-white text-center mb-4">Choose Your Voice AI Plan</h2>
          <div className="flex items-center justify-center gap-4 mb-16">
            <button onClick={() => setBillingCycle('monthly')} className={`font-sans text-sm px-5 py-2 rounded-full transition-colors ${billingCycle === 'monthly' ? 'bg-gold text-navy font-bold' : 'text-white/80 border border-white/20'}`}>Monthly</button>
            <button onClick={() => setBillingCycle('yearly')} className={`font-sans text-sm px-5 py-2 rounded-full transition-colors ${billingCycle === 'yearly' ? 'bg-gold text-navy font-bold' : 'text-white/80 border border-white/20'}`}>Yearly</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {voicePlans.map((plan, i) => (
              <PricingCard key={i} {...plan} billingCycle={billingCycle} ctaLink="/signup" />
            ))}
          </div>
          <p className="text-center text-white/65 font-sans text-xs mt-8">Minutes are use-or-lose each billing cycle. Unused minutes do not roll over. Change requests pause your 7-day window and resume after the change is completed.</p>
          <div className="mt-6 bg-gold/10 border border-gold/30 rounded-xl p-6 text-center">
            <p className="font-sans text-gold text-sm font-semibold">Add a Social Media package and save 5% on your combined total. The more you bundle, the more you save. <Link to="/pricing" className="underline">See full pricing</Link></p>
          </div>
        </div>
      </section>

      {/* Founding Member */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <FoundingMemberBanner spotsRemaining={47} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-charcoal py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 bg-white/5 rounded-xl p-6">
                <h3 className="font-sans font-semibold text-white mb-3">{faq.q}</h3>
                <p className="font-sans text-white/85 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-white mb-6">Your Phone Should Never Go to Voicemail Again.</h2>
          <Link to="/signup" className="inline-block bg-gold text-navy px-10 py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors mb-4">Get My AI Receptionist</Link>
          <p className="font-sans text-white/65 text-sm">No credit card required to create your account.</p>
        </div>
      </section>
    </div>
  )
}
