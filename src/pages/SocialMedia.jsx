import { useState } from 'react'
import { Link } from 'react-router-dom'
import PricingCard from '../components/PricingCard'
import FoundingMemberBanner from '../components/FoundingMemberBanner'

const socialPlans = [
  {
    packageName: 'Starter Social Media Package',
    price: '14.99',
    yearlyPrice: '164.89',
    features: [
      'Connect up to 4 accounts (Facebook, Instagram, X, LinkedIn)',
      'Up to 40 posts per month',
      'Post from one place',
      'Basic scheduling',
    ],
    ctaText: 'Start with Starter',
    note: 'Perfect for getting consistent.',
  },
  {
    packageName: 'Pro Scheduler Social Media Package',
    price: '19.99',
    yearlyPrice: '199.90',
    features: [
      'Connect up to 4 accounts',
      'Unlimited posts',
      'Full calendar scheduling',
      'All from one place',
    ],
    ctaText: 'Go Pro',
    isFeatured: true,
    note: 'Best for businesses ready to post daily.',
  },
  {
    packageName: 'Automation Powerhouse Social Media Package',
    price: '39.99',
    yearlyPrice: '399.90',
    features: [
      'Unlimited posts',
      'Set it once  posts rotate automatically week to week*',
      'All from one place',
      '*Requires building a post library to rotate through',
    ],
    ctaText: 'Get Powerhouse',
    note: 'The true set-it-and-forget-it plan.',
  },
]

const faqs = [
  { q: 'What platforms do you post to?', a: 'Facebook, Instagram, X (Twitter), and LinkedIn. Additional platforms are coming soon.' },
  { q: 'Do I have to write my own content?', a: "You can. Or you can load a library of posts and let the system rotate through them automatically. We're also building content creation tools  stay tuned." },
  { q: 'Can I schedule posts in advance?', a: 'Yes  on the Pro Scheduler and Powerhouse plans. The calendar view lets you see and adjust everything before it goes live.' },
  { q: 'Can I cancel anytime?', a: 'Yes. No contracts, no cancellation fees. Cancel from your dashboard anytime.' },
  { q: 'What if I want to post something right now?', a: 'You can always post immediately in addition to your scheduled content.' },
]

export default function SocialMedia() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  return (
    <div className="bg-navy pt-20">
      {/* Hero */}
      <section className="grain-overlay relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-charcoal to-navy"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">Post Every Day Without Touching Your Phone.</h1>
          <p className="font-sans text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-10">Your last post was how long ago? Your competitors are showing up every single day. Now you will too  automatically, from one place, across every platform.</p>
          <Link to="/signup" className="inline-block bg-gold text-navy px-8 py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors">
            Start Posting Automatically
          </Link>
        </div>
      </section>

      {/* Pain Block */}
      <section className="bg-charcoal py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-white mb-8 text-center">Social Media Dies When You Get Busy.</h2>
          <div className="font-sans text-white/85 text-lg leading-relaxed space-y-4">
            <p>It's not a willpower problem. When you're on a job, you're not thinking about Instagram. When you get home, you're tired. Posting consistently feels impossible  because for a one-person business, it IS impossible to do manually.</p>
            <p>So you post occasionally. Then you get busy. Then weeks go by. Then you feel guilty. Then you do a burst of posts. Then the cycle repeats.</p>
            <p>That's not a social media strategy. That's treading water.</p>
            <p className="text-white font-semibold text-xl">StoneBridge ends the cycle.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-sans text-gold text-xs font-bold uppercase tracking-widest text-center mb-4">Setup takes under 10 minutes</p>
          <h2 className="font-serif text-4xl text-white text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Connect Your Accounts', body: "Link your Facebook, Instagram, LinkedIn, and X in one click. We never post anything you haven't approved." },
              { step: '02', title: 'Load Your Content', body: 'Upload posts in advance, or set up a rotation of content that automatically cycles through week to week.' },
              { step: '03', title: 'We Handle the Rest', body: 'Posts go out on schedule. Every day. While you work. You get notified when they go live.' },
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
          <h2 className="font-serif text-4xl text-white text-center mb-4">Simple, Transparent Pricing</h2>
          <div className="flex items-center justify-center gap-4 mb-16">
            <button onClick={() => setBillingCycle('monthly')} className={`font-sans text-sm px-5 py-2 rounded-full transition-colors ${billingCycle === 'monthly' ? 'bg-gold text-navy font-bold' : 'text-white/80 border border-white/20'}`}>Monthly</button>
            <button onClick={() => setBillingCycle('yearly')} className={`font-sans text-sm px-5 py-2 rounded-full transition-colors ${billingCycle === 'yearly' ? 'bg-gold text-navy font-bold' : 'text-white/80 border border-white/20'}`}>Yearly</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {socialPlans.map((plan, i) => (
              <PricingCard key={i} {...plan} billingCycle={billingCycle} ctaLink="/signup" />
            ))}
          </div>
          <div className="mt-10 bg-gold/10 border border-gold/30 rounded-xl p-6 text-center">
            <p className="font-sans text-gold text-sm font-semibold">Combine Social Media with a Voice AI package and save 5% on your total. Bundle discounts increase with each package added. <Link to="/pricing" className="underline">See full pricing </Link></p>
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
          <h2 className="font-serif text-4xl text-white mb-4">Your Competitors Are Posting Right Now.</h2>
          <p className="font-sans text-white/80 mb-8">Start showing up every day  without adding a single task to your plate.</p>
          <Link to="/signup" className="inline-block bg-gold text-navy px-10 py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors mb-4">Start Posting Automatically</Link>
          <p className="font-sans text-white/65 text-sm">No credit card required to create your account.</p>
        </div>
      </section>
    </div>
  )
}
