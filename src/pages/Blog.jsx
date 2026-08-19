import { Link } from 'react-router-dom'
import EmailCapture from '../components/EmailCapture'

export default function Blog() {
  return (
    <div className="bg-navy min-h-screen pt-20 flex flex-col">
      <section className="grain-overlay relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-charcoal to-navy"></div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-block bg-gold/20 border border-gold/30 text-gold text-xs font-bold px-4 py-2 rounded-full font-sans uppercase tracking-wider mb-6">Coming Soon</div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Automated Blog Posts</h1>
          <p className="font-sans text-xl text-white/85 leading-relaxed mb-10">Fresh SEO-optimized content on your site. Written and posted for you automatically.</p>
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-md">
              <p className="font-sans text-white/80 text-sm mb-4">Be the first to know when this launches:</p>
              <EmailCapture placeholder="Enter your email address" buttonText="Notify Me" />
            </div>
            <Link to="/marketing" className="font-sans text-white/65 text-sm hover:text-gold transition-colors">Back</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
