
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import AIChatBot from './AIChatBot.tsx';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const location = useLocation();

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.tools, path: '/tools' },
    { name: t.nav.blog, path: '/blog' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' }
  ];

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'kn', name: 'ಕನ್ನಡ' }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className="sticky top-0 z-50 bg-[#FFFBF2]/90 backdrop-blur-md border-b border-emerald-900/5">
        <nav className="container mx-auto px-8 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-5 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-emerald-600/20 p-1 flex items-center justify-center bg-white shadow-xl shadow-emerald-900/5 rotate-3 group-hover:rotate-0 transition-all duration-500">
              <span className="text-lg font-cinzel font-bold text-emerald-700">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-cinzel font-bold tracking-[0.2em] text-slate-900">
                ASTRO <span className="text-emerald-700">VISION</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.5em] text-emerald-800/40 uppercase">Elite Intelligence</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all text-[10px] font-bold uppercase tracking-[0.3em] ${
                  location.pathname === link.path ? 'text-emerald-700 border-b-2 border-emerald-700 pb-1' : 'text-slate-400 hover:text-emerald-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-100 px-6 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-700 cursor-pointer appearance-none text-center shadow-sm min-w-[120px]"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
            </div>
            <Link to="/admin" className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-100 text-slate-400 hover:text-emerald-700 hover:border-emerald-700 transition-all shadow-sm bg-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[#FFFBF2] border-t border-emerald-900/5 py-32 relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
            <div className="space-y-10 col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center space-x-4">
                <span className="text-2xl font-cinzel font-bold text-slate-900 tracking-widest">ASTRO <span className="text-emerald-700">VISION</span></span>
              </Link>
              <p className="text-slate-500 text-sm leading-loose font-light max-w-xs">
                Refining human destiny through the synthesis of celestial observation and advanced cognitive architectures.
              </p>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.4em]">Navigation</h4>
              <ul className="space-y-5 text-xs text-slate-600 font-light">
                <li><Link to="/tools" className="hover:text-emerald-700 transition-colors">{t.nav.tools}</Link></li>
                <li><Link to="/blog" className="hover:text-emerald-700 transition-colors">{t.nav.blog}</Link></li>
                <li><Link to="/about" className="hover:text-emerald-700 transition-colors">{t.nav.about}</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-700 transition-colors">{t.nav.contact}</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.4em]">Legal Sanctum</h4>
              <ul className="space-y-5 text-xs text-slate-600 font-light">
                <li><Link to="/privacy" className="hover:text-emerald-700 transition-colors">Privacy Charter</Link></li>
                <li><Link to="/terms" className="hover:text-emerald-700 transition-colors">Covenants</Link></li>
                <li><Link to="/disclaimer" className="hover:text-emerald-700 transition-colors">Disclaimers</Link></li>
              </ul>
            </div>

            <div className="space-y-10">
              <h4 className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.4em]">Direct Signal</h4>
              <div className="flex space-x-6">
                {['fb', 'ig', 'tw'].map((s) => (
                  <a key={s} href="#" className="w-5 h-5 text-slate-300 hover:text-emerald-700 transition-colors">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      {s === 'fb' && <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>}
                      {s === 'ig' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>}
                      {s === 'tw' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-32 pt-10 border-t border-emerald-900/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-[9px] uppercase tracking-[0.5em] text-slate-300 font-bold">© 2025 Astro Vision Elite. All Rights Reserved.</span>
            <div className="flex items-center space-x-6">
              <span className="text-[8px] uppercase tracking-[0.3em] text-emerald-800/40 font-bold">Bridging Spirit and Silicon</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>

      <AIChatBot />
    </div>
  );
};

export default Layout;
