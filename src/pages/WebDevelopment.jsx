import { ArrowRight, Globe, Code } from 'lucide-react';

export default function WebDevelopment() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-navy flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Globe className="text-gold" size={40} />
        </div>
        <div className="inline-block bg-gold/10 border border-gold/40 text-gold text-sm font-semibold px-4 py-1 rounded-full mb-6">
          Coming Soon
        </div>
        <h1 className="text-5xl font-serif font-bold text-white mb-6">
          Website Development
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          Professional websites built to convert &mdash; with SEO optimization and modern design that gets your business found.
        </p>
        <p className="text-gray-400 mb-10">
          From starter sites to full custom builds, we create websites that look great, rank on Google, and turn visitors into customers.
        </p>
        <div className="bg-navy-raised rounded-2xl border border-gold/20 p-8 text-left mb-8">
          <h3 className="text-white font-bold text-lg mb-4">What's coming:</h3>
          <ul className="space-y-3 text-gray-300">
            {[
              'Professional website design & development',
              'Local SEO optimization & Google rankings',
              'Website audits & upgrades',
              'Speed & performance optimization',
              'Mobile-first responsive design',
              'Ongoing maintenance packages'
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
            href="/pricing#web-development"
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
