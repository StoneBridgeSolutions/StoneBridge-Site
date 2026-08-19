import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const voiceOptions = [
  { id: 'starter_voice', name: 'Starter Voice Intake', monthly: 69.99, yearly: 815.88 },
  { id: 'pro_voice', name: 'Intake Pro Voice', monthly: 119.99, yearly: 1319.89 },
  { id: 'powerhouse_voice', name: 'Intake Powerhouse Voice', monthly: 249.99, yearly: 2499.90 },
]

const socialOptions = [
  { id: 'starter_social', name: 'Starter Social Media', monthly: 14.99, yearly: 164.89 },
  { id: 'pro_social', name: 'Pro Scheduler Social Media', monthly: 19.99, yearly: 199.90 },
  { id: 'powerhouse_social', name: 'Automation Powerhouse Social Media', monthly: 39.99, yearly: 399.90 },
]

export default function Purchase() {
  const [billing, setBilling] = useState('monthly')

  const emailOptions = [
    { id: 'email_starter', name: 'Email Starter', monthly: 49, yearly: 529.99 },
    { id: 'email_pro', name: 'Email Pro', monthly: 99, yearly: 1069.99 },
    { id: 'email_powerhouse', name: 'Email Powerhouse', monthly: 179, yearly: 1789.99 },
  ]
  const [voice, setVoice] = useState(null)
  const [social, setSocial] = useState(null)
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()

  const voicePrice = voice ? voiceOptions.find(o => o.id === voice)?.[billing] : 0
  const socialPrice = social ? socialOptions.find(o => o.id === social)?.[billing] : 0
  const subtotal = (voicePrice || 0) + (socialPrice || 0)
  const selectedCount = (voice ? 1 : 0) + (social ? 1 : 0)
  const discountPct = selectedCount >= 2 ? (billing === 'yearly' ? 0.07 : 0.05) : 0
  const discount = subtotal * discountPct
  const total = subtotal - discount

  return (
    <div className="bg-navy min-h-screen pt-20 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-sans font-bold text-navy text-sm"></div>
            <span className="font-sans text-white text-sm">Account Created</span>
          </div>
          <div className="flex-1 h-px bg-gold/50"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-sans font-bold text-navy text-sm">2</div>
            <span className="font-sans text-white text-sm font-semibold">Choose Package</span>
          </div>
          <div className="flex-1 h-px bg-white/20"></div>
          <div className="flex items-center gap-2 opacity-40">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center font-sans text-white text-sm">3</div>
            <span className="font-sans text-white/60 text-sm">Business Profile</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl text-white mb-2">Choose Your Package</h1>
        <p className="font-sans text-white/80 mb-8">Pick what fits your business now. You can always add more later.</p>

        {/* Billing Toggle */}
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => setBilling('monthly')} className={`font-sans text-sm px-5 py-2 rounded-full transition-colors ${billing === 'monthly' ? 'bg-gold text-navy font-bold' : 'text-white/80 border border-white/20'}`}>Monthly</button>
          <button onClick={() => setBilling('yearly')} className={`font-sans text-sm px-5 py-2 rounded-full transition-colors ${billing === 'yearly' ? 'bg-gold text-navy font-bold' : 'text-white/80 border border-white/20'}`}>Yearly</button>
          {billing === 'yearly' && <span className="font-sans text-gold text-xs font-semibold">Save up to 2 months free on yearly plans</span>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Voice */}
            <div>
              <h2 className="font-sans font-semibold text-white mb-4">Voice AI Package <span className="text-white/65 font-normal">(choose one or skip)</span></h2>
              <div className="space-y-3">
                {voiceOptions.map(o => (
                  <label key={o.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${voice === o.id ? 'border-gold bg-gold/5' : 'border-white/10 bg-white/3 hover:border-white/30'}`}>
                    <input type="radio" name="voice" value={o.id} checked={voice === o.id} onChange={() => setVoice(o.id)} className="accent-gold" />
                    <div className="flex-1">
                      <p className="font-sans font-medium text-white text-sm">{o.name}</p>
                    </div>
                    <p className="font-sans text-gold font-bold">${billing === 'monthly' ? o.monthly : (o.yearly / 12).toFixed(2)}<span className="text-white/65 font-normal text-xs">/mo</span></p>
                  </label>
                ))}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${voice === null ? 'border-white/20' : 'border-white/10 hover:border-white/20'}`}>
                  <input type="radio" name="voice" checked={voice === null} onChange={() => setVoice(null)} className="accent-gold" />
                  <p className="font-sans text-white/75 text-sm">Not right now</p>
                </label>
              </div>
            </div>

            {/* Social */}
            <div>
              <h2 className="font-sans font-semibold text-white mb-4">Social Media Package <span className="text-white/65 font-normal">(choose one or skip)</span></h2>
              <div className="space-y-3">
                {socialOptions.map(o => (
                  <label key={o.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${social === o.id ? 'border-gold bg-gold/5' : 'border-white/10 bg-white/3 hover:border-white/30'}`}>
                    <input type="radio" name="social" value={o.id} checked={social === o.id} onChange={() => setSocial(o.id)} className="accent-gold" />
                    <div className="flex-1">
                      <p className="font-sans font-medium text-white text-sm">{o.name}</p>
                    </div>
                    <p className="font-sans text-gold font-bold">${billing === 'monthly' ? o.monthly : (o.yearly / 12).toFixed(2)}<span className="text-white/65 font-normal text-xs">/mo</span></p>
                  </label>
                ))}
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${social === null ? 'border-white/20' : 'border-white/10 hover:border-white/20'}`}>
                  <input type="radio" name="social" checked={social === null} onChange={() => setSocial(null)} className="accent-gold" />
                  <p className="font-sans text-white/75 text-sm">Not right now</p>
                </label>
              </div>
            </div>
          </div>

  
        {/* Email Marketing Package */}
        <div>
          <h2 className="font-sans font-semibold text-white mb-1">Email Marketing Package <span className="text-white/50 font-normal text-sm">(choose one or skip)</span></h2>
          <div className="space-y-3">
            {emailOptions.map(o => (
              <label key={o.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${email === o.id ? 'border-gold bg-gold/5' : 'border-white/10 bg-white/3 hover:border-white/30'}`}>
                <input type="radio" name="email" value={o.id} checked={email === o.id} onChange={() => setEmail(o.id)} className="accent-gold" />
                <div className="flex-1">
                  <p className="font-sans font-medium text-white text-sm">{o.name}</p>
                </div>
                <p className="font-sans text-gold font-bold">${billing === 'monthly' ? o.monthly : (o.yearly / 12).toFixed(2)}<span className="text-white/65 font-normal text-xs">/mo</span></p>
              </label>
            ))}
            <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${email === null ? 'border-white/20' : 'border-white/10 hover:border-white/20'}`}>
              <input type="radio" name="email" checked={email === null} onChange={() => setEmail(null)} className="accent-gold" />
              <p className="font-sans text-white/75 text-sm">Not right now</p>
            </label>
          </div>
        </div>

        {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit border border-white/10 bg-white/5 rounded-2xl p-6">
            <h3 className="font-sans font-semibold text-white mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              {voice && <div className="flex justify-between"><span className="font-sans text-white/80 text-sm">{voiceOptions.find(o=>o.id===voice)?.name}</span><span className="font-sans text-white text-sm">${voicePrice?.toFixed(2)}/mo</span></div>}
              {email && <div className="flex justify-between"><span className="font-sans text-white/80 text-sm">{emailOptions.find(o=>o.id===email)?.name}</span><span className="font-sans text-white text-sm">${emailPrice?.toFixed(2)}/mo</span></div>}
              {social && <div className="flex justify-between"><span className="font-sans text-white/80 text-sm">{socialOptions.find(o=>o.id===social)?.name}</span><span className="font-sans text-white text-sm">${socialPrice?.toFixed(2)}/mo</span></div>}
              {!voice && !social && <p className="font-sans text-white/65 text-sm">No packages selected</p>}
            </div>
            {discountPct > 0 && (
              <div className="flex justify-between border-t border-white/10 pt-3 mb-3">
                <span className="font-sans text-gold text-sm">Bundle Discount ({(discountPct*100).toFixed(0)}%)</span>
                <span className="font-sans text-gold text-sm">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-white/10 pt-4 mb-2">
              <span className="font-sans font-bold text-white">Total</span>
              <span className="font-sans font-bold text-gold text-xl">${total.toFixed(2)}/mo</span>
            </div>
            <p className="font-sans text-white/65 text-xs mb-6">Setup fees collected separately after your profile is complete.</p>
            <button onClick={() => navigate('/onboarding')} className="w-full bg-gold text-navy py-3.5 rounded font-sans font-bold text-sm hover:bg-yellow-400 transition-colors">
              Continue to Business Profile 
            </button>
            <p className="font-sans text-white/65 text-xs text-center mt-4">You won't be charged until after your business profile is reviewed and your service is activated.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
