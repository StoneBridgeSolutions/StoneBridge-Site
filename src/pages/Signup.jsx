import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agreed: false })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/purchase')
  }

  return (
    <div className="bg-navy min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center font-sans font-bold text-navy text-sm">1</div>
            <span className="font-sans text-white text-sm font-semibold">Create Account</span>
          </div>
          <div className="flex-1 h-px bg-white/20"></div>
          <div className="flex items-center gap-2 opacity-40">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center font-sans text-white text-sm">2</div>
            <span className="font-sans text-white/60 text-sm">Choose Package</span>
          </div>
          <div className="flex-1 h-px bg-white/20"></div>
          <div className="flex items-center gap-2 opacity-40">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center font-sans text-white text-sm">3</div>
            <span className="font-sans text-white/60 text-sm">Business Profile</span>
          </div>
        </div>

        <div className="border border-gold/30 bg-white/3 rounded-2xl p-8">
          <h1 className="font-serif text-3xl text-white mb-2">Create Your Free Account</h1>
          <p className="font-sans text-white/80 text-sm mb-8">No credit card required. Takes 60 seconds.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Full Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" placeholder="Your full name" />
            </div>
            <div>
              <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Email Address</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" placeholder="you@yourbusiness.com" />
            </div>
            <div>
              <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Password</label>
              <input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" placeholder="Create a password" />
            </div>
            <div>
              <label className="font-sans text-white/80 text-xs uppercase tracking-wider mb-2 block">Confirm Password</label>
              <input type="password" required value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 rounded font-sans text-sm focus:outline-none focus:border-gold" placeholder="Confirm your password" />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required checked={form.agreed} onChange={e => setForm({...form, agreed: e.target.checked})} className="mt-1 accent-gold" />
              <span className="font-sans text-white/80 text-sm">I agree to the <a href="#" className="text-gold underline">Terms of Service</a> and <a href="#" className="text-gold underline">Privacy Policy</a></span>
            </label>
            <button type="submit" className="bg-gold text-navy px-6 py-4 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors">
              Create My Account 
            </button>
          </form>

          <p className="font-sans text-white/65 text-sm text-center mt-6">
            Already have an account? <a href="https://portal.stonebridgesolutions.io" className="text-gold hover:underline">Log In </a>
          </p>
        </div>
      </div>
    </div>
  )
}
