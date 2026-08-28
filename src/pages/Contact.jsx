import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen bg-navy">
      <section className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4">Contact Us</h1>
            <p className="text-white/75 font-sans text-lg leading-relaxed">
              Questions about a service, your account, or working together? Reach out &mdash; a real person reads every message.
            </p>
          </div>

          <div className="bg-charcoal rounded-lg border border-white/10 p-8 sm:p-10 space-y-8">

            <div>
              <h2 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-2">Email</h2>
              <a
                href="mailto:contact@stonebridgesolutions.io"
                className="text-gold font-sans text-lg hover:underline"
              >
                contact@stonebridgesolutions.io
              </a>
              <p className="text-white/70 font-sans text-sm mt-2">
                We typically respond within one business day.
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-2">Business</h2>
              <p className="text-white/85 font-sans leading-relaxed">
                StoneBridge Solutions Inc.<br />
                Website design for small businesses and self-employed professionals, plus managed marketing, intake, and retention systems.
              </p>
              <p className="text-white/85 font-sans leading-relaxed mt-4">
                6225 TownCenter Drive, Suite #867<br />
                Clemmons, NC 27012
              </p>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <h2 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-2">New Here?</h2>
              <p className="text-white/85 font-sans leading-relaxed mb-4">
                If you&apos;re looking to get started with StoneBridge, the fastest path is our signup flow &mdash; you can also read more about who we are first.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/signup"
                  className="inline-block bg-gold text-navy font-sans font-medium px-6 py-3 rounded hover:bg-yellow-400 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/about"
                  className="inline-block border border-white/20 text-white font-sans font-medium px-6 py-3 rounded hover:border-gold hover:text-gold transition-colors"
                >
                  Our Story
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
