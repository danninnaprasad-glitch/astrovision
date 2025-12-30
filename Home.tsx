import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS, MOCK_BLOGS } from '../constants';

const Home: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const featuredPosts = MOCK_BLOGS.slice(0, 3);

  return (
    <div className="space-y-64 pb-48 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-24 px-8">
        <div className="container mx-auto max-w-7xl relative z-10 text-center space-y-16">
          <div className="space-y-10 reveal">
            <div className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full border border-emerald-600/20 bg-emerald-600/5 text-[9px] font-bold tracking-[0.4em] text-emerald-800 uppercase mb-4">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>
              <span>Gemini 3 Pro Integration Active</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-cinzel font-bold leading-[1.0] tracking-tight text-slate-900">
              DECODE YOUR <br/>
              <span className="emerald-gradient italic">DESTINY</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-light italic">
              Experience the pinnacle of astronomical calculation synthesized by advanced cognitive architectures.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-10">
              <Link to="/tools" className="emerald-button px-16 py-6 rounded-full font-bold text-xs uppercase tracking-[0.4em] shadow-2xl shadow-emerald-900/20">
                Initialize Insight
              </Link>
              <Link to="/blog" className="px-16 py-6 rounded-full border border-slate-300 hover:bg-white text-slate-800 text-xs font-bold uppercase tracking-[0.4em] transition-all shadow-sm">
                The Chronicles
              </Link>
            </div>
          </div>

          {/* Celestial Decor */}
          <div className="pt-32 opacity-0 animate-[reveal_1.5s_0.5s_forwards]">
             <div className="relative w-full max-w-5xl mx-auto">
                <div className="aspect-[21/9] bg-gradient-to-b from-emerald-100/50 to-transparent rounded-t-[5rem] border-x border-t border-emerald-900/10 p-6">
                  <div className="w-full h-full rounded-t-[4rem] bg-[#FFFBF2] overflow-hidden relative border border-emerald-900/10 shadow-inner">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[80%] h-[80%] rounded-full border-[0.5px] border-emerald-900/20 border-dashed animate-[spin_120s_linear_infinite]"></div>
                        <div className="absolute w-[60%] h-[60%] rounded-full border-[0.5px] border-amber-900/20 animate-[spin_80s_linear_infinite_reverse]"></div>
                        <div className="text-8xl grayscale opacity-20 filter blur-[0.5px]">🪐</div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container mx-auto px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-12">
            <h2 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.6em]">The Frontier</h2>
            <h3 className="text-5xl font-cinzel font-bold text-slate-900 leading-[1.1]">
              A Synthesis of Ancient Wisdom and <span className="text-emerald-800 italic">Advanced Logic.</span>
            </h3>
            <p className="text-lg text-slate-700 leading-loose font-light">
              We eliminate the margins of error found in traditional softwares by leveraging high-precision ephemeris engines paired with deep semantic reasoning. Your cosmic blueprint is no longer a static image, but a dynamic intelligence.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-6">
              <div className="space-y-3">
                <span className="text-2xl font-cinzel text-emerald-800">0.01°</span>
                <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Calculation Precision</p>
              </div>
              <div className="space-y-3">
                <span className="text-2xl font-cinzel text-emerald-800">128K</span>
                <p className="text-[10px] uppercase tracking-widest text-slate-600 font-bold">Interpretive Context</p>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square bg-white rounded-[4rem] shadow-2xl shadow-emerald-900/5 flex items-center justify-center p-20 border border-emerald-900/10 overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-600/5 scale-0 group-hover:scale-100 transition-transform duration-1000 rounded-full"></div>
                <div className="relative space-y-8 text-center">
                   <div className="text-7xl">🔭</div>
                   <h4 className="text-2xl font-cinzel font-bold text-slate-900">High-Fidelity Tracking</h4>
                   <p className="text-sm text-slate-600 font-light leading-relaxed">
                     Real-time telemetry across all 12 houses and planetary dignity assessments.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Tools Showcase */}
      <section className="container mx-auto px-8 max-w-7xl">
        <div className="space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.6em]">Professional Hub</h2>
            <h3 className="text-4xl font-cinzel font-bold text-slate-900">Professional Workbench</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: t.tools?.zodiac, icon: '♈', desc: 'Comprehensive analysis of Sun, Moon, and Ascendant triads.' },
              { title: t.tools?.kundli, icon: '🕍', desc: 'Vedic chart interpretation with deep house-by-house synthesis.' },
              { title: t.tools?.compatibility, icon: '❤️', desc: 'Synastry reports for relationship growth and longevity.' },
              { title: t.tools?.numerology, icon: '🔢', desc: 'Vibrational frequency analysis of your temporal emergence.' }
            ].map((tool, idx) => (
              <Link key={idx} to="/tools" className="bg-white p-12 rounded-[3rem] space-y-8 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all border border-emerald-900/10 group shadow-sm">
                <span className="text-4xl block group-hover:scale-110 transition-transform">{tool.icon}</span>
                <div className="space-y-4">
                  <h4 className="text-xl font-cinzel font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{tool.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insight */}
      <section className="container mx-auto px-8 max-w-7xl">
        <div className="glass-panel rounded-[5rem] p-24 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <h2 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.6em]">Premium Insight</h2>
              <h3 className="text-5xl font-cinzel font-bold text-slate-900 leading-tight">Your Weekly Transits, <span className="emerald-gradient">Deciphered.</span></h3>
              <p className="text-lg text-slate-700 leading-relaxed font-light italic">
                "As Jupiter enters the final degrees of your 10th house, the structural transformations you've initiated since 2024 are reaching a critical saturation point."
              </p>
              <button className="emerald-button px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] shadow-lg">
                Personalized Assessment
              </button>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-96 rounded-full border border-emerald-900/10 flex items-center justify-center p-12 bg-white/50 shadow-inner">
                <div className="w-full h-full rounded-full border-2 border-emerald-600/30 border-dashed animate-[spin_30s_linear_infinite] flex items-center justify-center">
                   <div className="text-9xl opacity-30 filter grayscale">🌕</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chronicles Section */}
      <section className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-emerald-900/10 pb-16">
          <div className="space-y-6">
            <h2 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.6em]">The Library</h2>
            <h3 className="text-4xl font-cinzel font-bold text-slate-900">Cosmic Chronicles</h3>
          </div>
          <Link to="/blog" className="text-[10px] font-bold text-slate-500 hover:text-emerald-800 transition-colors tracking-[0.4em] uppercase border-b border-slate-200 pb-1">Browse Full Repository</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {featuredPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group space-y-10">
              <div className="aspect-[4/5] overflow-hidden rounded-[3.5rem] bg-white border border-emerald-900/10 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] grayscale group-hover:grayscale-0" />
              </div>
              <div className="space-y-5 px-4">
                <div className="flex items-center justify-between text-[8px] font-bold text-emerald-900 uppercase tracking-widest">
                   <span>{post.category}</span>
                   <span>{post.date}</span>
                </div>
                <h4 className="text-2xl font-cinzel font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">{post.title}</h4>
                <p className="text-sm text-slate-600 font-light line-clamp-2 leading-relaxed italic">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-8 pb-32 max-w-5xl text-center">
        <div className="py-40 rounded-[6rem] bg-emerald-900/5 border border-emerald-900/10 space-y-16">
          <div className="space-y-8">
             <h2 className="text-5xl font-cinzel font-bold text-slate-900">STAY SYNCHRONIZED.</h2>
             <p className="text-slate-700 max-w-lg mx-auto font-light text-lg">
               Join 2.5M seekers receiving weekly astrological synthesis and planetary news.
             </p>
          </div>
          <div className="max-w-md mx-auto relative group">
             <input 
                type="email" 
                placeholder="Secure Email Access" 
                className="w-full bg-white border border-slate-200 rounded-full px-12 py-6 text-sm outline-none focus:ring-4 focus:ring-emerald-600/10 shadow-xl transition-all"
             />
             <button className="absolute right-3 top-3 bg-emerald-800 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-900 transition-colors shadow-lg">
               Activate
             </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
