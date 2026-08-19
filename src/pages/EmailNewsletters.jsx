import { Link } from 'react-router-dom'
import { Check, Mail, Zap, BarChart2, Shield, ArrowRight, RefreshCw, Users } from 'lucide-react'

export default function EmailNewsletters() {
  return (
    <div className="bg-navy min-h-screen pt-20">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-charcoal to-navy"></div>
        <div className="grain-overlay absolute inset-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-gold/20 border border-gold/30 text-gold text-xs font-bold px-4 py-2 rounded-full font-sans uppercase tracking-wider mb-6">
            Email Marketing Automation
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            Automated Emails That<br />
            <span className="text-gold">Win & Keep Clients</span>
          </h1>
          <p className="font-sans text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            Connect your existing Mailchimp, Brevo, or SendGrid account. We handle the triggers, templates, and timing — you just close more jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing#email-marketing" className="bg-gold text-navy px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition text-sm">
              See Pricing
            </Link>
            <Link to="/signup" className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:border-gold hover:text-gold transition text-sm">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* ESP LOGOS */}
      <section className="px-6 py-12 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-8">Works with your existing email platform</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {['Mailchimp', 'Brevo', 'SendGrid'].map((esp) => (
              <div key={esp} className="text-white/60 font-bold text-2xl font-sans tracking-tight hover:text-gold transition cursor-default">
                {esp}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl text-white mb-4">Up and Running in Minutes</h2>
            <p className="text-white/65 text-lg max-w-xl mx-auto">No coding. No complex setup. Just connect and go.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Connect Your ESP', desc: 'Link your Mailchimp, Brevo, or SendGrid account with your API key. We encrypt it with AES-256 immediately — we never store plaintext.' },
              { step: '02', title: 'Set Your Triggers', desc: 'Choose which events fire emails — new lead, booked appointment, job complete, no contact in 7 days, and more.' },
              { step: '03', title: 'Emails Send Themselves', desc: 'When a trigger fires, fully branded emails go out automatically. Track opens, clicks, and bounces in your dashboard.' },
            ].map((item) => (
              <div key={item.step} className="relative bg-charcoal/50 border border-white/10 rounded-xl p-8">
                <div className="text-gold/20 font-serif text-6xl font-bold absolute top-4 right-6 select-none">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRIGGER EVENTS */}
      <section className="px-6 py-20 bg-charcoal/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl text-white mb-4">7 Triggers. Infinite Follow-Through.</h2>
            <p className="text-white/65 text-lg max-w-xl mx-auto">Every touchpoint in your client journey — covered automatically.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '👋', trigger: 'New Lead', desc: 'Instant welcome email the moment a lead comes in' },
              { icon: '📋', trigger: 'Intake Complete', desc: 'Confirmation & next steps after form submission' },
              { icon: '📅', trigger: 'Appointment Booked', desc: 'Booking confirmation with all the details' },
              { icon: '⏰', trigger: 'Appointment Reminder', desc: 'Automated reminder before the scheduled appointment' },
              { icon: '📬', trigger: 'No Contact — 7 Days', desc: 'Re-engage leads who have gone quiet' },
              { icon: '🔄', trigger: 'No Contact — 30 Days', desc: 'Win-back campaign for cold leads' },
              { icon: '✅', trigger: 'Job Closed', desc: 'Thank you email + review request on job completion' },
            ].map((item) => (
              <div key={item.trigger} className="flex items-start gap-4 bg-navy/60 border border-white/10 rounded-xl p-5">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{item.trigger}</div>
                  <div className="text-white/55 text-xs leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl text-white mb-4">Built for Service Businesses</h2>
            <p className="text-white/65 text-lg max-w-xl mx-auto">Not another generic email tool. Purpose-built for the way you work.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Shield size={20} />, title: 'Bank-Grade Security', desc: 'Your ESP API keys are encrypted with AES-256-GCM before storage. We never store plaintext credentials.' },
              { icon: <Zap size={20} />, title: 'No Duplicate Sends', desc: 'Built-in idempotency keys ensure every email fires exactly once, even if a trigger fires multiple times.' },
              { icon: <Mail size={20} />, title: 'Your Brand, Your Templates', desc: 'Every email uses your logo, colors, and contact info. 4 ready-to-use templates included — or bring your own.' },
              { icon: <BarChart2 size={20} />, title: 'Real-Time Analytics', desc: 'Track open rates, click rates, bounces, and unsubscribes. Per-campaign and overall dashboards included.' },
              { icon: <RefreshCw size={20} />, title: 'Smart Retry Logic', desc: 'Failed sends automatically retry up to 3 times with exponential backoff. Nothing falls through the cracks.' },
              { icon: <Users size={20} />, title: 'Per-Client Branding', desc: 'Each business gets its own ESP connection and brand config. Perfect for agencies and white-label setups.' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4 bg-charcoal/40 border border-white/10 rounded-xl p-6">
                <div className="text-gold flex-shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <div className="text-white font-semibold mb-2">{f.title}</div>
                  <div className="text-white/60 text-sm leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="px-6 py-20 bg-charcoal/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Simple Add-On Pricing</h2>
          <p className="text-white/65 text-lg mb-12">Add email automation to any Intake plan. Cancel anytime.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                name: 'Email Starter',
                price: '$49',
                desc: 'For businesses getting started with email automation',
                features: ['1 ESP connection', '3 active campaigns', '4 branded templates', '2 trigger events', 'Basic analytics'],
              },
              {
                name: 'Email Pro',
                price: '$99',
                desc: 'For businesses that want full automation coverage',
                features: ['2 ESP connections', 'Unlimited campaigns', 'Custom branded templates', 'All 7 trigger events', 'Full analytics dashboard'],
                highlight: true,
              },
              {
                name: 'Email Powerhouse',
                price: '$179',
                desc: 'For agencies and high-volume service businesses',
                features: ['3 ESP connections', 'Unlimited everything', 'Custom template design', 'All triggers + priority', 'Dedicated account manager'],
              },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-xl p-6 border text-left ${plan.highlight ? 'border-gold bg-navy-raised md:scale-105' : 'border-white/10 bg-navy/60'}`}>
                {plan.highlight && (
                  <div className="text-xs font-bold text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 mb-4 inline-block">Most Popular</div>
                )}
                <div className="text-white font-bold text-lg mb-1">{plan.name}</div>
                <div className="text-gold text-4xl font-bold mb-1">{plan.price}<span className="text-white/50 text-base font-normal">/mo</span></div>
                <p className="text-white/50 text-xs mb-5">{plan.desc}</p>
                <div className="space-y-2">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
                      <Check size={14} className="text-gold flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link to="/pricing#email-marketing" className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition">
            View Full Pricing & Details <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Ready to Automate Your Emails?</h2>
          <p className="text-white/65 text-lg mb-8">Connect your ESP and have your first campaign live today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-gold text-navy px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Start Free Trial
            </Link>
            <Link to="/pricing" className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:border-gold hover:text-gold transition">
              See All Pricing
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
