import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { to: '/intake', label: 'Intake' },
    { to: '/marketing', label: 'Marketing' },
    { to: '/retention', label: 'Retention' },
    { to: '/web-development', label: 'Website Dev' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'Our Story' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo  stacked */}
          <Link to="/" className="flex flex-col items-start leading-none select-none">
            <div style={{ display: 'flex' }}>
              <span style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.04em', color: '#f4f3f0' }}>STONE</span>
              <span style={{ fontFamily: 'Cinzel', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.04em', color: '#d4af37' }}>BRIDGE</span>
            </div>
            <span style={{ fontFamily: 'Cinzel', fontWeight: 400, fontSize: '0.6rem', letterSpacing: '0.55em', color: '#d1c9b4', marginTop: '1px', display: 'block', width: '100%', textAlign: 'center' }}>SOLUTIONS</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="font-sans text-white/85 hover:text-gold text-sm font-medium transition-colors">
                {label}
              </Link>
            ))}
            <a href="/login" className="font-sans text-white/85 hover:text-gold text-sm font-medium transition-colors">
              Log In
            </a>
            <Link to="/signup" className="bg-gold text-navy px-5 py-2 rounded font-sans font-bold text-sm hover:bg-yellow-400 transition-colors">
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 pb-6 pt-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="font-sans text-white text-lg font-medium py-2 border-b border-white/10 hover:text-gold transition-colors">
              {label}
            </Link>
          ))}
          <a href="/login" className="font-sans text-white text-lg font-medium py-2 border-b border-white/10 hover:text-gold transition-colors">
            Log In
          </a>
          <Link to="/signup" className="mt-2 bg-gold text-navy px-6 py-3 rounded font-sans font-bold text-base hover:bg-yellow-400 transition-colors text-center">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
