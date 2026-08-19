import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-navy">
      <Navbar />

      {/* SECTION 1  HERO */}
      <section className="relative grain-overlay min-h-[60vh] flex items-center justify-center bg-navy overflow-hidden pt-24 pb-20 px-4 sm:px-6">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6">
            One Person. Five Years. Zero Employees. Still Standing.
          </h1>
          <p className="font-sans font-medium text-white/60 text-lg sm:text-xl leading-relaxed">
            Here&apos;s how that happened &mdash; and why it changed everything.
          </p>
        </div>
      </section>

      {/* SECTION 2  THE STORY */}
      <section className="bg-charcoal py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[740px] mx-auto">

          {/* Founder photo */}
          <div className="flex justify-center mb-12">
            <div className="relative inline-block">
              <img
                src="/images/Carl.jpg"
                alt="Carl  Founder of StoneBridge Solutions"
                className="w-64 h-64 object-cover rounded-lg"
                style={{ border: '2px solid rgba(212, 175, 55, 0.3)' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 rounded-b-lg px-4 py-3"
                style={{ background: 'rgba(10, 17, 31, 0.85)' }}
              >
                <p style={{
                  fontFamily: 'Outfit',
                  color: 'rgba(212, 175, 55, 0.9)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  margin: 0
                }}>
                  Carl &mdash; Founder
                </p>
              </div>
            </div>
          </div>

          {/* Opening pull quote */}
          <p className="font-serif italic text-gold text-2xl sm:text-3xl text-center mb-16 leading-relaxed">
            &ldquo;This didn&apos;t start as a business idea. It started as a survival move.&rdquo;
          </p>

          {/* Body */}
          <div className="space-y-8 font-sans text-white/80 leading-[1.9]" style={{ fontSize: '1.125rem' }}>

            <p>
              For the past five years, Carl has run a 24/7 online business &mdash; mostly from his phone. Not from an office. Not with a team. From wherever he happened to be. A full-time job during the day. A full-time business the rest of the time. Most people would call that impossible. He just called it Tuesday.
            </p>

            <p>
              When COVID hit, the business exploded. Eighteen employees. Constant activity. Revenue pouring in. It felt like the thing had finally arrived.
            </p>

            {/* Dramatic pause  styled differently */}
            <p className="font-serif italic text-white text-2xl sm:text-3xl text-center my-12 leading-relaxed">
              Then the world reopened.
            </p>

            <p>
              Almost overnight, revenue dropped. The model that worked during lockdown stopped working in the open world. Eighteen employees became ten. Then five. Then two. Then just Carl.
            </p>

            {/* Punchy standalone */}
            <p className="font-sans text-white text-xl sm:text-2xl text-center my-10 leading-relaxed">
              Most people would have shut it down.
            </p>

            {/* The turn */}
            <p className="font-serif text-gold text-3xl sm:text-4xl text-center my-12 leading-tight">
              He automated it instead.
            </p>

            <p>
              One by one, he replaced manual processes with systems. Replaced employees with automations. Replaced the chaos with a machine that largely ran itself. A blog that published for two years without him touching it. Social media that posted every day while he lived his life. An operation that looked like a full team &mdash; run by one person, from a phone, between everything else.
            </p>

            <p>
              Today he still takes his weekends. Still goes on vacation. Still has a life outside the business. Not because the work stopped &mdash; because the right work happens automatically.
            </p>

          </div>

          {/* Gold divider */}
          <div className="my-14 flex justify-center">
            <div className="h-px bg-gold" style={{ width: '60px' }}></div>
          </div>

          <div className="space-y-8 font-sans text-white/80 leading-[1.9]" style={{ fontSize: '1.125rem' }}>

            <p>
              That shift &mdash; from drowning in operations to running a business from the palm of his hand &mdash; is exactly what StoneBridge Solutions was built to give every small business owner and self-employed worker who&apos;s doing it all themselves.
            </p>

            <p>
              Carl has started many businesses. Failed some. Learned from all of them. He knows what it takes to get something off the ground alone. He knows what it feels like when the tools are everywhere and you&apos;re being pulled in every direction. He knows the 2am feeling of wondering if it&apos;s all worth it.
            </p>

          </div>

          {/* Final lines */}
          <div className="mt-16 text-center space-y-4">
            <p className="font-serif text-white text-2xl sm:text-3xl leading-tight">
              He&apos;s been every one of you. He knows what it costs.
            </p>
            <p className="font-serif italic text-gold text-xl sm:text-2xl leading-relaxed">
              He built the way out. That&apos;s StoneBridge Solutions.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3  QUIET CTA */}
      <section className="bg-navy section-divide py-20 px-4 sm:px-6 text-center">
        <p className="font-sans text-white/50 text-sm mb-6">
          If any part of that story sounds familiar, you&apos;re in the right place.
        </p>
        <Link
          to="/"
          className="inline-block bg-gold text-navy font-sans font-medium px-8 py-3 rounded hover:bg-yellow-400 transition-colors"
        >
          See How It Works
        </Link>
      </section>

      <Footer />
    </div>
  );
}
