import { Phone, FileText, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function Intake() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-navy">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
<h1 className="text-6xl font-serif font-bold text-white mb-6">
              Never Miss a Lead Again
            </h1>

            <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Capture every customer inquiry automatically with AI phone agents and custom web forms that work 24/7.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/signup?package=pro_voice"
                className="bg-gold text-navy px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight size={20} />
              </a>
              <a
                href="/pricing"
                className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold hover:text-navy transition"
              >
                View Pricing
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">99.9%</div>
              <div className="text-gray-400">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">24/7</div>
              <div className="text-gray-400">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gold mb-2">&lt;2min</div>
              <div className="text-gray-400">Setup Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Intake Methods */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Two Powerful Ways to Capture Leads
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Voice AI */}
          <div className="bg-navy-raised rounded-2xl p-8 border-2 border-gold/20 hover:border-gold transition">
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Phone className="text-gold" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Voice AI Phone Agent</h3>
            <p className="text-gray-300 mb-6">
              AI-powered phone agent that answers calls, qualifies leads, and books appointments automatically.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Answers calls instantly, 24/7',
                'Natural conversation flow',
                'Qualifies leads automatically',
                'Syncs to your CRM in real-time',
                'Call transcripts & recordings',
                'Smart routing based on answers'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Web Forms */}
          <div className="bg-navy-raised rounded-2xl p-8 border-2 border-gold/20 hover:border-gold transition">
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FileText className="text-gold" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Custom Web Forms</h3>
            <p className="text-gray-300 mb-6">
              Beautiful, customizable forms that embed anywhere and route leads directly to your CRM.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Visual form builder (no code)',
                'Embed on any website',
                'Custom branding & colors',
                'Smart field mapping to CRM',
                'Real-time analytics',
                'Email notifications'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-navy-mid py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Set Up in Minutes, Not Hours
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Plan', desc: 'Select the package that fits your needs' },
              { step: '2', title: 'Connect CRM', desc: 'Link Jobber, ServiceTitan, or HubSpot' },
              { step: '3', title: 'Customize', desc: 'Configure your agent & forms' },
              { step: '4', title: 'Go Live', desc: 'Start capturing leads immediately' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-gold text-navy w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-gray-300 text-center mb-12">
          Get both Voice AI and Web Forms in every plan
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: 'Starter Voice Intake', price: '$69.99', features: ['100 min/mo', '3 forms', '1 phone line'], link: '/signup?package=starter_voice' },
            { name: 'Intake Pro Voice', price: '$119.99', features: ['200 min/mo', 'Unlimited forms', '2 phone lines'], highlighted: true, link: '/signup?package=pro_voice' },
            { name: 'Intake Powerhouse', price: '$249.99', features: ['500 min/mo', 'Unlimited forms', '5 phone lines'], link: '/signup?package=powerhouse_voice' }
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 text-center ${
                plan.highlighted
                  ? 'bg-gold text-navy'
                  : 'bg-navy-raised text-white border border-gray-700'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-4">{plan.price}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="text-sm">{f}</li>
                ))}
              </ul>
              <a
                href={plan.link}
                className={`block w-full py-2 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? 'bg-navy text-gold hover:bg-navy-raised'
                    : 'bg-gold text-navy hover:bg-yellow-500'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/pricing" className="text-gold hover:text-yellow-500 transition font-medium">
            View full pricing details &rarr;
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-navy via-navy-mid to-navy py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Automate Your Intake?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of businesses capturing more leads with less effort.
          </p>
          <a
            href="/signup?package=pro_voice"
            className="inline-flex items-center gap-2 bg-gold text-navy px-12 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition"
          >
            Start Your Free Trial
            <Zap size={20} />
          </a>
          <p className="text-gray-400 mt-4 text-sm">
            No credit card required &bull; 14-day free trial &bull; Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
