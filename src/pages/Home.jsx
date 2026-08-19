import { Link } from 'react-router-dom'
import PillarCard from '../components/PillarCard'
import FoundingMemberBanner from '../components/FoundingMemberBanner'
import EmailCapture from '../components/EmailCapture'

export default function Home() {
  return (
    <div className="bg-navy">
      {/* Hero */}
      <section className="grain-overlay relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-charcoal to-navy opacity-90"></div>
        <div className="absolute top-1/4 right-0 w-96 h-1 bg-gradient-to-r from-transparent to-gold opacity-30 rotate-12"></div>
        <div className="absolute bottom-1/3 left-0 w-64 h-1 bg-gradient-to-r from-gold to-transparent opacity-20 -rotate-6"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-4xl">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl text-white leading-none mb-8 reveal">
              Be Everywhere<br />
              <span className="text-gold">Automatically.</span>
            </h1>
            <p className="font-sans text-base sm:text-xl text-white/85 max-w-2xl leading-relaxed mb-12">
              You built your business with your hands. Right now, while you're on the job  leads are slipping through, calls are going unanswered, and your social media is a ghost town. That ends today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="bg-gold text-navy px-8 py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors">
                Get Started  It's Free
              </Link>
              <a href="#pillars" className="border border-white/30 text-white px-8 py-4 rounded font-sans font-semibold text-base hover:border-gold hover:text-gold transition-colors">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-navy-mid section-divide py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-gold text-xs font-bold uppercase tracking-widest mb-4">The Real Cost of Doing It All Yourself</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
            While You Were Working, Your Competitor Just Posted. Again.
          </h2>
          <div className="font-sans text-white/85 text-lg leading-relaxed space-y-6 text-left max-w-3xl mx-auto w-full">
            <p>You're the owner. You're also the crew. When you're elbow-deep in a job, you're not answering phones. You're not posting on Instagram. You're not following up with last week's leads. You're doing what you were built to do  and meanwhile, your online presence goes completely dark.</p>
            <p>It's not a discipline problem. It's a capacity problem. One person cannot be in two places at once.</p>
            <p className="text-white font-semibold text-xl">We fixed that.</p>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section id="pillars" className="bg-navy-raised section-divide py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Your Entire Business. Running Automatically.</h2>
            <p className="font-sans text-body text-lg max-w-2xl mx-auto">From the first time someone sees your name online to the moment they refer their friends  StoneBridge handles every step.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <PillarCard icon="" headline="Be Seen" body="Post on every platform. Send emails. Show up online even when your hands are full." tag="COMING SOON" ctaText="Learn More" ctaLink="/marketing" comingSoon={true} />
            <PillarCard icon="" headline="Never Miss a Lead" body="Your AI receptionist answers every call, qualifies every lead, and books every appointment. 24/7. No sick days." tag="LIVE" ctaText="Explore Intake" ctaLink="/intake" />
            <PillarCard icon="" headline="Client Retention" body="Keep clients coming back with automated follow-ups, loyalty programs, and re-engagement campaigns." ctaText="Learn More" ctaLink="/retention" comingSoon={true} />
            <PillarCard icon="" headline="Website Development" body="Professional websites with SEO optimization, custom design, and ongoing maintenance that gets you found." ctaText="Learn More" ctaLink="/web-development" comingSoon={true} />
          </div>
        </div>
      </section>

      {/* Why StoneBridge Solutions */}
      <section className="bg-navy-mid section-divide py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-10 text-center">We Are Invested In Your Growth.</h2>
          <div className="font-sans text-white/85 text-lg leading-relaxed space-y-6">
            <p>Most software companies hand you a login and call it done. They collect your subscription and move on.</p>
            <p>That's not what StoneBridge Solutions is.</p>
            
            <p>When your phone rings more, your schedule fills up, and your clients start referring their friends — that's when we know we've done our job right. We build systems worth being proud of.</p>
            <p className="text-white font-semibold text-xl">That's not a promise. That's the standard.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-navy-raised section-divide py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-white mb-4">Built for the Self-Employed</h2>
            <p className="font-sans text-body text-lg">Landscapers. Car detailers. Cleaners. Consultants. Handymen. Photographers. If you are the business, this was made for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { quote: "Before StoneBridge Solutions, I was losing calls every single day. Now my phone rings with qualified leads and I didn't lift a finger to set it up.", name: "Marcus T.", trade: "Landscaping, Winston-Salem NC" },
              { quote: "I used to spend my Sundays trying to write Instagram posts. Now it just happens automatically and my engagement has never been better.", name: "DeShawn R.", trade: "Car Detailing, Charlotte NC" },
              { quote: "The AI receptionist paid for itself in the first week. One job I wouldn't have gotten otherwise covered three months of the service.", name: "Priya M.", trade: "Independent Consultant" },
            ].map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, j) => <span key={j} className="text-gold text-sm"></span>)}</div>
                <p className="font-sans text-body text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="font-sans font-semibold text-white text-sm">{t.name}</p>
                  <p className="font-sans text-body/70 text-xs">{t.trade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Member */}
      <section className="bg-navy-mid section-divide py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <FoundingMemberBanner spotsRemaining={47} />
        </div>
      </section>

      {/* Email Capture */}
      <section id="notify" className="bg-navy-raised section-divide py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-3xl text-white mb-4">Stay in the Loop</h3>
          <p className="font-sans text-body mb-8">New tools launching soon. Be first to know.</p>
          <EmailCapture placeholder="Enter your email address" buttonText="Notify Me" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy section-divide py-16 sm:py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Stop Working IN Your Business. Start Letting It Work For You.</h2>
          <Link to="/signup" className="inline-block bg-gold text-navy px-10 py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors mb-4">
            Get Started  It's Free
          </Link>
          <p className="font-sans text-body/60 text-sm">No credit card required to create an account.</p>
        </div>
      </section>
    </div>
  )
}
