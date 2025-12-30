
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

const Contact: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const c = t.contact;

  return (
    <div className="max-w-6xl mx-auto py-32 px-6">
      <div className="text-center mb-24 space-y-8 reveal">
        <h2 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.6em]">{c.subtitle}</h2>
        <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-slate-900 leading-tight">
          {c.title.split(' ').map((word, i) => 
            i === 1 ? <span key={i} className="emerald-gradient italic">{word} </span> : word + ' '
          )}
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto font-light text-lg italic leading-relaxed">
          {c.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        {/* Contact Form - Connected to Formspree ID: xrbrgvbw */}
        <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-emerald-900/10 shadow-2xl shadow-emerald-900/5 reveal transition-transform duration-700 hover:translate-y-[-5px]">
          <form action="https://formspree.io/f/xrbrgvbw" method="POST" className="space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">{c.nameLabel}</label>
              <input 
                required 
                name="name" 
                type="text" 
                className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-sm transition-all placeholder:text-slate-300" 
                placeholder={c.namePlaceholder} 
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">{c.emailLabel}</label>
              <input 
                required 
                name="email" 
                type="email" 
                className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-sm transition-all placeholder:text-slate-300" 
                placeholder={c.emailPlaceholder} 
              />
            </div>
            
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">{c.messageLabel}</label>
              <textarea 
                required 
                name="message" 
                rows={5} 
                className="w-full bg-[#FFFBF2] border border-slate-200 rounded-[2.5rem] px-10 py-8 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-sm transition-all placeholder:text-slate-300 font-light leading-relaxed" 
                placeholder={c.messagePlaceholder}
              ></textarea>
            </div>
            
            <button type="submit" className="emerald-button w-full py-7 rounded-full font-bold text-[10px] uppercase tracking-[0.5em] shadow-2xl shadow-emerald-900/20 transition-all hover:scale-[1.02]">
              {c.button}
            </button>
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-20 reveal [animation-delay:0.3s]">
          <div className="space-y-12">
            <h2 className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.4em] border-b border-emerald-900/5 pb-4">{c.officeTitle}</h2>
            
            <div className="space-y-10">
              <div className="flex items-start space-x-8 group">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-600/10 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">📍</div>
                <div className="pt-2">
                  <h4 className="font-cinzel font-bold text-slate-900 text-sm mb-2 uppercase tracking-widest">{c.officeAddr}</h4>
                  <p className="font-light text-slate-500 leading-relaxed text-sm">{c.officeAddrDetail}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-8 group">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-600/10 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">✉️</div>
                <div className="pt-2">
                  <h4 className="font-cinzel font-bold text-slate-900 text-sm mb-2 uppercase tracking-widest">Digital Signal</h4>
                  <p className="font-light text-emerald-800/60 leading-relaxed text-sm">hello@astrovision.ai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pt-10">
             <div className="w-full h-48 rounded-[3rem] border border-emerald-900/10 bg-emerald-900/5 flex items-center justify-center overflow-hidden shadow-inner group">
                <div className="absolute inset-0 bg-emerald-600/5 scale-0 group-hover:scale-100 transition-transform duration-1000"></div>
                <div className="relative w-24 h-24 border border-dashed border-emerald-600/20 rounded-full animate-[spin_40s_linear_infinite] flex items-center justify-center">
                   <div className="text-4xl grayscale opacity-30">📡</div>
                </div>
                <div className="ml-8 z-10">
                   <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1">Celestial Server</p>
                   <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-medium">Synced: Gemini 3 Pro</p>
                </div>
             </div>
          </div>

          <div className="space-y-10">
            <h3 className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-[0.4em] border-b border-emerald-900/5 pb-4">{c.socialTitle}</h3>
            <div className="flex flex-wrap gap-5">
              {[
                { name: 'Facebook', color: 'hover:bg-blue-600' },
                { name: 'Instagram', color: 'hover:bg-pink-600' },
                { name: 'Twitter X', color: 'hover:bg-slate-900' }
              ].map(s => (
                <a key={s.name} href="#" className={`flex items-center space-x-4 px-10 py-5 bg-white rounded-full border border-slate-200 ${s.color} hover:text-white transition-all shadow-sm group`}>
                   <span className="font-bold text-[9px] uppercase tracking-[0.2em] text-slate-500 group-hover:text-white">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
