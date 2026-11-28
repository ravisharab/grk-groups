
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  ArrowUpRight,
  Menu,
  X,
  GraduationCap,
} from 'lucide-react';

import GRKLogo from './GRKLogo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'GRK Fashion', href: '/fashion' },
  { name: 'Interview Prep', href: '/interview' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact Us', href: '/#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === '/';

  function isActive(href: string) {
    if (href.includes('#')) {
      return (
        location.pathname + location.hash === href
      );
    }

    if (href === '/') {
      return isHome && !location.hash;
    }

    return (
      location.pathname === href ||
      location.pathname.startsWith(`${href}/`)
    );
  }

  function getLinkStyle(href: string) {
    if (isActive(href)) {
      return 'bg-gradient-to-r from-amber-200 to-amber-500 text-slate-950';
    }

    if (href === '/fashion') {
      return 'bg-amber-400/10 text-amber-300';
    }

    if (href === '/interview') {
      return 'border border-amber-400/30 bg-amber-400/10 text-amber-300';
    }

    return 'text-white';
  }

  return (
    <header
      className={`absolute inset-x-0 top-0 z-50 ${
        isHome ? '' : 'bg-[#06152f]'
      }`}
    >
      <nav
        className="mx-auto flex max-w-[1600px]
                   items-center justify-between
                   gap-4 px-5 py-6 lg:px-8"
      >

        {/* GRK Logo */}

        <GRKLogo />

        {/* Desktop Navigation */}

        <div
          className="ml-auto hidden items-center gap-1
                     rounded-full border border-white/20
                     bg-white/10 p-2 shadow-xl
                     backdrop-blur-xl xl:flex"
        >

          {navLinks.map(link => {

            const linkClass = `
              flex items-center gap-1.5
              whitespace-nowrap rounded-full
              px-3 py-2.5 text-sm font-semibold
              transition-all duration-300
              hover:bg-amber-300
              hover:text-slate-950
              ${getLinkStyle(link.href)}
            `;

            return link.href.includes('#') ? (

              <a
                key={link.name}
                href={link.href}
                className={linkClass}
              >
                {link.name}
              </a>

            ) : (

              <Link
                key={link.name}
                to={link.href}
                aria-current={
                  isActive(link.href)
                    ? 'page'
                    : undefined
                }
                className={linkClass}
              >

                {link.href === '/interview' && (
                  <GraduationCap size={17} />
                )}

                {link.name}

              </Link>

            );

          })}

        </div>

        {/* Contact Button */}

        <a
          href="/#contact"
          className="hidden shrink-0 items-center
                     gap-2 rounded-full
                     bg-gradient-to-r from-amber-200
                     to-amber-500 px-5 py-3 font-bold
                     text-slate-950 shadow-lg
                     shadow-amber-500/20
                     transition hover:-translate-y-1
                     2xl:flex"
        >

          Let's Talk

          <ArrowUpRight size={18} />

        </a>

        {/* Mobile Menu Button */}

        <button
          type="button"
          aria-label={
            menuOpen ? 'Close menu' : 'Open menu'
          }
          aria-expanded={menuOpen}
          aria-controls="grk-mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto rounded-xl
                     border border-white/30
                     bg-white/10 p-3 text-white
                     xl:hidden"
        >

          {menuOpen ? <X /> : <Menu />}

        </button>

      </nav>

      {/* Mobile Navigation */}

      {menuOpen && (

        <div
          id="grk-mobile-menu"
          className="mx-5 space-y-2 rounded-2xl
                     border border-white/20
                     bg-[#06152f]/95 p-4 shadow-2xl
                     backdrop-blur-xl xl:hidden"
        >

          {navLinks.map(link => {

            const linkClass = `
              flex items-center gap-2
              rounded-xl px-4 py-3
              font-medium transition-all
              hover:bg-white/10
              ${getLinkStyle(link.href)}
            `;

            return link.href.includes('#') ? (

              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={linkClass}
              >

                {link.name}

              </a>

            ) : (

              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={
                  isActive(link.href)
                    ? 'page'
                    : undefined
                }
                className={linkClass}
              >

                {link.href === '/interview' && (
                  <GraduationCap size={20} />
                )}

                {link.name}

              </Link>

            );

          })}

        </div>

      )}

    </header>
  );
}
