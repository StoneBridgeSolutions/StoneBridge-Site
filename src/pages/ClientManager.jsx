import EmailCapture from '../components/EmailCapture'

const features = [
  { icon: "", title: "Complete Client Profiles", desc: "Full job history attached to every client." },
  { icon: "", title: "Job Tracking", desc: "Track every job from first call to final invoice." },
  { icon: "", title: "Notes, Photos and Docs", desc: "Everything attached to the right client, always." },
  { icon: "", title: "Automated Reminders", desc: "No more no-shows. Automatic appointment reminders." },
  { icon: "", title: "Mobile-First Design", desc: "Built for your phone, designed to be used on the job." },
]

export default function ClientManager() {
  return (
    <div className="bg-navy pt-20">
      <section className="grain-overlay relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-charcoal to-navy"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block bg-gold/20 border border-gold/30 text-gold text-xs font-bold px-4 py-2 rounded-full font-sans uppercase tracking-wider mb-6">Coming Soon</div>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">All Your Clients. All Your Jobs. No More Chaos.</h1>
          <p className="font-sans text-xl text-white/85 leading-relaxed max-w-2xl mx-auto">Spreadsheets were not built for running a service business. Sticky notes do not follow up. Texts get buried. Client Manager is the organized, mobile-first command center your business has been missing.</p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-white text-center mb-12">What Is Coming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="border border-white/10 bg-white/3 rounded-xl p-6 opacity-80">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-sans font-semibold text-white mb-2">{feature.title}</h3>
                <p className="font-sans text-white/80 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Be First In Line When It Launches.</h2>
          <p className="font-sans text-white/80 mb-8">Enter your email and we will notify you the moment Client Manager is available.</p>
          <EmailCapture placeholder="Your email address" buttonText="Notify Me" />
        </div>
      </section>
    </div>
  )
}
