
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import GRKLogo from './GRKLogo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'GRK Fashion', href: '/fashion' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact Us', href: '/#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header
      className={`absolute inset-x-0 top-0 z-50 ${
        isHome ? '' : 'bg-[#06152f]'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center
                   justify-between gap-5 px-5 py-6 lg:px-10"
      >
        {/* Logo links to homepage */}
        <GRKLogo />

        {/* Desktop Navigation */}
        <div
          className="ml-auto hidden items-center gap-1
                     rounded-full border border-white/20
                     bg-white/10 p-2 shadow-xl
                     backdrop-blur-xl lg:flex"
        >
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-4 py-2.5
                         text-sm font-semibold
                         transition-all duration-300
                         hover:bg-amber-300
                         hover:text-slate-950
                         ${
                           link.href === '/fashion'
                             ? 'bg-gradient-to-r from-amber-200 to-amber-500 text-slate-950'
                             : 'text-white'
                         }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact Button */}
        <a
          href="/#contact"
          className="hidden items-center gap-2 rounded-full
                     bg-gradient-to-r from-amber-200
                     to-amber-500 px-5 py-3 font-bold
                     text-slate-950 shadow-lg
                     shadow-amber-500/20
                     transition hover:-translate-y-1 xl:flex"
        >
          Let's Talk
          <ArrowUpRight size={18} />
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="grk-mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto rounded-xl border border-white/30
                     bg-white/10 p-3 text-white lg:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="grk-mobile-menu"
          className="mx-5 rounded-2xl border border-white/20
                     bg-[#06152f]/95 p-4 shadow-2xl
                     backdrop-blur-xl lg:hidden"
        >
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3
                         font-medium transition-all
                         ${
                           link.href === '/fashion'
                             ? 'bg-amber-400 text-slate-950'
                             : 'text-white hover:bg-white/10'
                         }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
