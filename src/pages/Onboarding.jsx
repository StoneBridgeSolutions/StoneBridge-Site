import { useState } from 'react'

export default function Onboarding() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    businessName: '', businessType: '', ein: '', website: '',
    address: '', phone: '', repName: '', repEmail: '', repTitle: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-navy min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-xl text-center">
          <div className="text-6xl mb-6">checkmark</div>
          <h1 className="font-serif text-4xl text-white mb-4">Profile Received!</h1>
          <p className="font-sans text-white/85 text-lg mb-8">
            Your services will be configured and activated within 3 to 5 business days.
            You will receive an email at <span className="text-gold">{form.repEmail || 'your inbox'}</span> when ready to go live.
          </p>
          <a href="https://portal.stonebridgesolutions.io" className="inline-block bg-gold text-navy px-8 py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors">
            Go to Your Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-navy min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-sans font-bold text-navy text-sm">done</div>
            <span className="font-sans text-white text-sm">Account</span>
          </div>
          <div className="flex-1 h-px bg-gold/50"></div>
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-sans font-bold text-navy text-sm">done</div>
            <span className="font-sans text-white text-sm">Package</span>
          </div>
          <div className="flex-1 h-px bg-gold/50"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-sans font-bold text-navy text-sm">3</div>
            <span className="font-sans text-white text-sm font-semibold">Business Profile</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl text-white mb-2">Set Up Your Business</h1>
        <p className="font-sans text-white/80 mb-6">We need this to configure your services. Takes about 3 minutes.</p>

        <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 mb-8">
          <p className="font-sans text-gold text-sm font-semibold">You will not be charged yet.</p>
          <p className="font-sans text-white/85 text-sm mt-1">We review your profile and confirm your setup before your first billing date.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="font-sans font-semibold text-white text-lg mb-5 pb-2 border-b border-white/10">Business Information</h2>
            <div className="space-y-5">
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Business Name (required)</label>
                <input type="text" required value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} placeholder="Your LLC or DBA name" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Business Type (required)</label>
                <select required value={form.businessType} onChange={e => setForm({...form, businessType: e.target.value})} className="w-full bg-navy border border-white/20 text-white px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold">
                  <option value="">Select your business type</option>
                  <option value="Landscaping">Landscaping</option>
                  <option value="Car Detailing">Car Detailing</option>
                  <option value="Cleaning Services">Cleaning Services</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Handyman Services">Handyman Services</option>
                  <option value="Photography">Photography</option>
                  <option value="Pet Services">Pet Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Business EIN / Tax ID (required)</label>
                <input type="text" required value={form.ein} onChange={e => setForm({...form, ein: e.target.value})} placeholder="XX-XXXXXXX" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Website URL</label>
                <input type="url" value={form.website} onChange={e => setForm({...form, website: e.target.value})} placeholder="https://yourbusiness.com" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Physical Address (required)</label>
                <input type="text" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="123 Main St, City, State ZIP" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Business Phone (required)</label>
                <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-sans font-semibold text-white text-lg mb-5 pb-2 border-b border-white/10">Authorized Representative</h2>
            <div className="space-y-5">
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Full Name (required)</label>
                <input type="text" required value={form.repName} onChange={e => setForm({...form, repName: e.target.value})} placeholder="Your full legal name" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Email Address (required)</label>
                <input type="email" required value={form.repEmail} onChange={e => setForm({...form, repEmail: e.target.value})} placeholder="you@yourbusiness.com" className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Title / Role (required)</label>
                <input type="text" required value={form.repTitle} onChange={e => setForm({...form, repTitle: e.target.value})} placeholder="Owner, CEO, etc." className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-gold text-navy py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors">
            Submit My Profile and Activate Account
          </button>
        </form>
      </div>
    </div>
  )
}
