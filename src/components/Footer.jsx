import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="grain-overlay bg-charcoal border-t border-white/10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex flex-col items-start leading-none"><span style={{ display: "flex" }}><span style={{ fontFamily: "Cinzel", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "0.04em", color: "#f4f3f0" }}>STONE</span><span style={{ fontFamily: "Cinzel", fontWeight: 900, fontSize: "1.5rem", letterSpacing: "0.04em", color: "#d4af37" }}>BRIDGE</span></span><span style={{ fontFamily: "Cinzel", fontWeight: 400, fontSize: "0.6rem", letterSpacing: "0.55em", color: "#d1c9b4", marginTop: "1px", display: "block", width: "100%", textAlign: "center" }}>SOLUTIONS</span></span>
              <span className="text-gold text-xs font-bold"></span>
            </div>
            <p className="text-white/75 font-sans text-sm leading-relaxed">Be Everywhere Automatically.</p>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-white mb-4 text-sm uppercase tracking-wider">Products</h4>
            <div className="flex flex-col gap-2">
              <Link to="/marketing" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">Marketing</Link>
              <Link to="/intake" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">Intake</Link>
              <Link to="/client-manager" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">Client Manager</Link>
              <Link to="/retention" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">Retention</Link>
              <Link to="/pricing" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="font-sans font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <div className="flex flex-col gap-2">
              <Link to="/signup" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">Get Started</Link>
              <a href="mailto:support@stonebridgesolutions.io" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">support@stonebridgesolutions.io</a>
              <Link to="/privacy-policy" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">Privacy Policy</Link>
              <a href="#" className="text-white/85 hover:text-gold font-sans text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/70 font-sans text-xs"> 2026 StoneBridge Solutions Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
