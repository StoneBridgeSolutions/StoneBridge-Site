import { Check, Zap, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const intakePlans = [
    {
      name: 'Intake Starter',
      monthlyPrice: 69.99,
      yearlyTotal: 815.88,
      yearlyMonthly: 67.99,
      description: 'Perfect for small businesses getting started with AI phone intake',
      features: [
        '100 minutes monthly (Voice AI)',
        '3 Custom Web Forms',
        '1 Free phone line',
        '1 AI Agent with setup ($195 value)',
        'CRM Integration (Jobber/ServiceTitan)',
        'Email Notifications',
        '7 days free changes',
        'Basic Analytics'
      ],
      cta: 'Start Free Trial',
      ctaLink: '/signup?package=intake_starter',
      highlighted: false
    },
    {
      name: 'Intake Pro',
      monthlyPrice: 119.99,
      yearlyTotal: 1319.89,
      yearlyMonthly: 109.99,
      description: 'Everything you need to automate your entire intake process',
      features: [
        '200 minutes monthly (Voice AI)',
        'Unlimited Custom Web Forms',
        '2 Free phone lines',
        'Up to 2 AI Agents with setup ($175 ea)',
        'All CRM Integrations',
        'Email + SMS Notifications',
        'Advanced Analytics & Reporting',
        'Form A/B Testing',
        '7 days free changes per agent',
        'Priority Support'
      ],
      cta: 'Get Started',
      ctaLink: '/signup?package=intake_pro',
      highlighted: true,
      badge: 'Most Popular',
      savings: '1 free month'
    },
    {
      name: 'Intake Powerhouse',
      monthlyPrice: 249.99,
      yearlyTotal: 2499.90,
      yearlyMonthly: 208.33,
      description: 'Maximum capacity for high-volume businesses',
      features: [
        '500 minutes monthly (Voice AI)',
        'Unlimited Custom Web Forms',
        '5 Free phone lines',
        'Up to 3 AI Agents with setup ($160 ea)',
        'All CRM Integrations',
        'Email + SMS + Webhook Notifications',
        'Custom Branding',
        'Advanced Analytics Dashboard',
        '7 days free changes per agent',
        'Priority Support',
        'Dedicated Account Manager'
      ],
      cta: 'Get Started',
      ctaLink: '/signup?package=intake_powerhouse',
      highlighted: false,
      savings: '2 free months'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-navy py-16 px-4">

      {/* ===== PAGE HEADER ===== */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Choose the right plan for your business. Each service is priced separately so you only pay for what you need.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-navy-raised rounded-lg p-1 border border-gray-700">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-md font-medium text-sm transition ${
              billingCycle === 'monthly' ? 'bg-gold text-navy' : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-md font-medium text-sm transition ${
              billingCycle === 'yearly' ? 'bg-gold text-navy' : 'text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded">
              Save up to 16%
            </span>
          </button>
        </div>
      </div>

      {/* ===== SECTION 1: INTAKE PLANS ===== */}
      <div id="intake" className="max-w-7xl mx-auto mb-20">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-700"></div>
          <div className="text-center">
            <span className="inline-block bg-gold/10 border border-gold/40 text-gold text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
              Intake Plans
            </span>
            <p className="text-gray-400 text-sm mt-1">Voice AI + Web Forms  available now</p>
          </div>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {intakePlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-6 md:p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-navy-raised border-2 border-gold shadow-2xl md:scale-105'
                  : 'bg-navy-mid border border-gray-700'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-gold text-navy px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Zap size={12} />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="mb-4">
                {billingCycle === 'monthly' ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-gold">${plan.monthlyPrice}</span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-gold">${plan.yearlyTotal.toFixed(2)}</span>
                      <span className="text-gray-400">/year</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      ${plan.yearlyMonthly}/mo &mdash; billed annually
                    </div>
                    {plan.savings && (
                      <div className="text-sm text-green-400 mt-1 font-medium">{plan.savings} included</div>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-6">{plan.description}</p>

              {/* CTA */}
              <a
                href={plan.ctaLink}
                className={`block w-full py-3 rounded-lg font-semibold mb-6 transition text-center text-sm ${
                  plan.highlighted
                    ? 'bg-gold text-navy hover:bg-yellow-500'
                    : 'border-2 border-gold text-gold hover:bg-gold hover:text-navy'
                }`}
              >
                {plan.cta}
              </a>

              {/* Features */}
              <div className="space-y-2 flex-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                  What's Included:
                </div>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                    <Check className="text-gold flex-shrink-0 mt-0.5" size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ENTERPRISE ===== */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-navy-mid via-navy-raised to-navy-mid rounded-2xl p-8 md:p-12 border-2 border-gold/30">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Something Custom?</h2>
              <p className="text-lg text-gray-300 mb-6">
                Enterprise solutions for high-volume businesses with unique requirements.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Unlimited minutes & forms',
                  'White-label solutions',
                  'Custom integrations',
                  'Dedicated account manager',
                  'SLA guarantees',
                  'Custom development'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <Check className="text-gold flex-shrink-0" size={16} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy rounded-xl p-6 md:p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Contact Us for Custom Pricing</h3>
              <form className="space-y-3">
                <input type="text" placeholder="Your Name"
                  className="w-full px-4 py-3 bg-navy-mid border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition text-sm" />
                <input type="email" placeholder="Email Address"
                  className="w-full px-4 py-3 bg-navy-mid border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition text-sm" />
                <input type="tel" placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-navy-mid border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition text-sm" />
                <textarea placeholder="Tell us about your needs..." rows={3}
                  className="w-full px-4 py-3 bg-navy-mid border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold transition resize-none text-sm" />
                <button type="submit"
                  className="w-full bg-gold text-navy py-3 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center gap-2 text-sm">
                  Request Quote
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 2: EMAIL MARKETING ===== */}
      <div id="email-marketing" className="max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-700"></div>
          <div className="text-center">
            <span className="inline-block bg-gold/10 border border-gold/40 text-gold text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
              Email Marketing
            </span>
            <p className="text-gray-400 text-sm mt-1">Trigger-based campaigns — works with Mailchimp, Brevo & SendGrid</p>
          </div>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              name: 'Email Starter',
              monthlyPrice: 49,
              yearlyTotal: 529.99,
              yearlyMonthly: 44.17,
              description: 'For businesses getting started with automated email follow-ups',
              features: [
                '1 ESP connection (Mailchimp, Brevo, or SendGrid)',
                '3 active campaigns',
                '4 built-in branded templates',
                '2 trigger events (New Lead + Intake Complete)',
                'Basic analytics dashboard',
                'Email delivery tracking',
              ],
              cta: 'Get Started',
              ctaLink: '/signup?package=email_starter',
              highlighted: false,
            },
            {
              name: 'Email Pro',
              monthlyPrice: 99,
              yearlyTotal: 1069.99,
              yearlyMonthly: 89.17,
              description: 'Full automation coverage for every stage of your client journey',
              features: [
                '2 ESP connections',
                'Unlimited active campaigns',
                'Custom branded templates',
                'All 7 trigger events',
                'Full analytics — opens, clicks, bounces',
                'Smart retry logic (no missed sends)',
                'Priority support',
              ],
              cta: 'Get Started',
              ctaLink: '/signup?package=email_pro',
              highlighted: true,
              badge: 'Most Popular',
              savings: '1 free month',
            },
            {
              name: 'Email Powerhouse',
              monthlyPrice: 179,
              yearlyTotal: 1789.99,
              yearlyMonthly: 149.17,
              description: 'For agencies and high-volume businesses needing full control',
              features: [
                '3 ESP connections',
                'Unlimited campaigns & templates',
                'Custom template design included',
                'All 7 triggers + priority send queue',
                'White-label branding per client',
                'Advanced analytics & audit log',
                'Dedicated account manager',
              ],
              cta: 'Get Started',
              ctaLink: '/signup?package=email_powerhouse',
              highlighted: false,
              savings: '2 free months',
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-6 md:p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-navy-raised border-2 border-gold shadow-2xl md:scale-105'
                  : 'bg-navy-mid border border-gray-700'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-gold text-navy px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Zap size={12} />
                    {plan.badge}
                  </div>
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                {billingCycle === 'monthly' ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-bold text-gold">${plan.monthlyPrice}</span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl md:text-5xl font-bold text-gold">${plan.yearlyTotal.toFixed(2)}</span>
                      <span className="text-gray-400">/year</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">${plan.yearlyMonthly}/mo &mdash; billed annually</div>
                    {plan.savings && <div className="text-sm text-green-400 mt-1 font-medium">{plan.savings} included</div>}
                  </div>
                )}
              </div>
              <p className="text-gray-300 text-sm mb-6">{plan.description}</p>
              <a
                href={plan.ctaLink}
                className={`block w-full py-3 rounded-lg font-semibold mb-6 transition text-center text-sm ${
                  plan.highlighted
                    ? 'bg-gold text-navy hover:bg-yellow-500'
                    : 'border-2 border-gold text-gold hover:bg-gold hover:text-navy'
                }`}
              >
                {plan.cta}
              </a>
              <div className="space-y-2 flex-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">What's Included:</div>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                    <Check className="text-gold flex-shrink-0 mt-0.5" size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/marketing/email-newsletters" className="inline-flex items-center gap-2 text-gold hover:text-yellow-500 transition font-medium text-sm">
            Learn more about Email Marketing Automation <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* ===== SECTION 3: RETENTION  Coming Soon ===== */}
      <div id="retention" className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-700"></div>
          <div className="text-center">
            <span className="inline-block bg-gold/10 border border-gold/40 text-gold text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
              Client Retention
            </span>
            <p className="text-gray-400 text-sm mt-1">Follow-ups, loyalty programs, win-back campaigns</p>
          </div>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>
        <div className="bg-navy-raised rounded-2xl border border-gray-700 p-8 md:p-12 text-center opacity-80">
          <div className="inline-block bg-gold/10 border border-gold/40 text-gold text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Coming Soon
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Retention Plans  Pricing Coming Soon</h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-6 text-sm">
            Keep clients coming back with automated follow-up sequences, loyalty reward programs, and re-engagement campaigns built for service businesses.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {['Automated Follow-ups', 'Loyalty Programs', 'Win-back Campaigns'].map((item, i) => (
              <div key={i} className="bg-navy rounded-lg px-4 py-3 border border-gray-700 text-gray-300 text-sm">
                {item}
              </div>
            ))}
          </div>
          <a href="/retention" className="inline-flex items-center gap-2 text-gold hover:text-yellow-500 transition font-medium text-sm">
            Learn about Client Retention <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* ===== SECTION 4: WEBSITE DEVELOPMENT  Coming Soon ===== */}
      <div id="web-development" className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gray-700"></div>
          <div className="text-center">
            <span className="inline-block bg-gold/10 border border-gold/40 text-gold text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
              Website Development
            </span>
            <p className="text-gray-400 text-sm mt-1">Custom websites, SEO optimization, maintenance packages</p>
          </div>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>
        <div className="bg-navy-raised rounded-2xl border border-gray-700 p-8 md:p-12 text-center opacity-80">
          <div className="inline-block bg-gold/10 border border-gold/40 text-gold text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Coming Soon
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Website Packages  Pricing Coming Soon</h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-6 text-sm">
            Professional websites built to rank on Google  with custom design, SEO optimization, speed tuning, and ongoing maintenance packages.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            {['Custom Design', 'SEO Optimization', 'Maintenance Plans'].map((item, i) => (
              <div key={i} className="bg-navy rounded-lg px-4 py-3 border border-gray-700 text-gray-300 text-sm">
                {item}
              </div>
            ))}
          </div>
          <a href="/web-development" className="inline-flex items-center gap-2 text-gold hover:text-yellow-500 transition font-medium text-sm">
            Learn about Website Development <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* ===== BOTTOM CTA ===== */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-navy-raised rounded-xl p-8 md:p-12 border border-gold/30">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-gray-300 mb-6 text-sm">
            Schedule a free consultation and we'll help you choose the perfect solution.
          </p>
          <button className="bg-gold text-navy px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition text-sm">
            Schedule Free Consultation
          </button>
        </div>
      </div>

    </div>
  );
}
