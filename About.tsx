import React from 'react';

const About: React.FC = () => {
  const faqs = [
    { 
      q: "How does AI astrology work?", 
      a: "We integrate precise astronomical algorithms with advanced Large Language Models (LLMs). While our mathematical engine calculates planetary coordinates to within 0.01 degrees of accuracy, the AI acts as the master interpreter, synthesizing complex relationships into human-readable narratives." 
    },
    { 
      q: "Is this as accurate as a human astrologer?", 
      a: "Astro Vision AI eliminates human bias and calculation error. While a human astrologer provides emotional empathy, our AI considers thousands of simultaneous aspects, planetary dignities, and historical transits that even the most seasoned expert might overlook in a single session." 
    },
    { 
      q: "Are my birth details private?", 
      a: "Absolutely. We adhere to a 'Privacy by Design' philosophy. Your birth data is processed in real-time to generate your report and is not stored in any permanent database. Your cosmic blueprint remains your own." 
    },
    { 
      q: "Why use AI instead of traditional software?", 
      a: "Traditional software gives you static 'cookbook' definitions. AI understands context. It can see how a debilitated Mars in the 4th house interacts with a high-vibration Jupiter in the 10th, providing a synthesis rather than a list of disconnected sentences." 
    },
    { 
      q: "Can I use this for medical advice?", 
      a: "No. While astrology can indicate energetic tendencies within the body (Medical Astrology), it is strictly for spiritual awareness. Always consult a licensed medical professional for health concerns." 
    },
    {
      q: "Does it support both Vedic and Western systems?",
      a: "Yes. Our engine is dual-capable. You can toggle between Western Tropical (focused on psychological archetypes) and Vedic Sidereal (focused on karmic destiny and Nakshatras) within our specialized tools."
    }
  ];

  const values = [
    { title: "Empowerment", desc: "We provide maps, not mandates. Our goal is to give you the data needed to exercise your own free will more effectively." },
    { title: "Precision", desc: "Cosmic insights are only as good as the math behind them. We use Swiss Ephemeris-grade calculations for every report." },
    { title: "Inclusivity", desc: "By supporting 5 major languages, we ensure that ancestral wisdom is accessible to everyone, regardless of their linguistic background." },
    { title: "Integrity", desc: "We are transparent about the role of AI. We don't hide the technology; we celebrate it as a bridge to the divine." }
  ];

  return (
    <div className="max-w-5xl mx-auto py-32 px-6 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 animate-in fade-in duration-1000">
        <div className="inline-block px-5 py-2 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-emerald-800 text-[10px] font-bold uppercase tracking-widest">
          Established 2025
        </div>
        <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-slate-900 leading-tight">
          The Synthesis of <br/>
          <span className="emerald-gradient italic">Ancient & Artificial</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
          Astro Vision AI was born from a singular question: What happens when we apply the processing power of the 21st century to the 5,000-year-old observational data of the Vedic seers?
        </p>
      </section>

      {/* The Story / Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl font-cinzel font-bold text-slate-900">The Astro-Tech Frontier</h2>
          <p className="text-slate-700 leading-relaxed font-light">
            For millennia, astrology was reserved for royalty and the elite because of the staggering complexity of the calculations involved. A single birth chart required hours of manual labor with astronomical tables.
          </p>
          <p className="text-slate-700 leading-relaxed font-light">
            Today, we stand at the threshold of a new era. Astro Vision AI uses <strong>Gemini 3 Pro</strong> architectures to perform these calculations in milliseconds and, more importantly, to interpret them with the nuance of a master linguist.
          </p>
          <div className="pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FFFBF2] bg-white flex items-center justify-center text-xs font-bold text-emerald-700 shadow-sm">
                  {['✨', '🪐', '🌌', '🔭'][i-1]}
                </div>
              ))}
              <div className="pl-6 text-sm text-slate-400 flex items-center italic">
                Trusted by 2.5M+ seekers worldwide
              </div>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/10 to-transparent rounded-[3rem] blur-2xl group-hover:opacity-100 transition-opacity opacity-50"></div>
          <div className="relative glass-panel p-10 rounded-[2.5rem] overflow-hidden border border-emerald-900/10 shadow-xl">
            <div className="space-y-6">
              <div className="h-1.5 w-16 bg-emerald-600 rounded-full"></div>
              <h3 className="text-2xl font-cinzel font-medium text-slate-900">Our Methodology</h3>
              <p className="text-sm text-slate-600 leading-relaxed italic font-light">
                "Our proprietary engine first pulls real-time ephemeris data to establish the 'Heavenly Snapshot.' We then pass this geometric data through a custom-tuned AI layer."
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                  <div className="text-emerald-800 font-bold text-xl mb-1">0.01°</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Precision</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                  <div className="text-emerald-800 font-bold text-xl mb-1">128k</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Context</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-16">
        <div className="text-center">
          <h2 className="text-3xl font-cinzel font-bold text-slate-900">Our Core Values</h2>
          <p className="text-slate-500 mt-2 italic text-sm">The pillars that sustain our celestial vision.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-10 bg-white border border-emerald-900/10 rounded-[2rem] hover:shadow-xl hover:-translate-y-1 transition-all group shadow-sm">
              <div className="text-3xl mb-5 text-emerald-800 grayscale group-hover:grayscale-0 transition-all">◈</div>
              <h4 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.2em] mb-4">{v.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-light">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-16 bg-white p-12 md:p-20 rounded-[4rem] shadow-sm border border-emerald-900/5">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-cinzel font-bold text-slate-900">Seeker's FAQ</h2>
          <p className="text-slate-500 font-light">Common inquiries regarding our cosmic technology.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {faqs.map((faq, idx) => (
            <div key={idx} className="group p-6 hover:bg-emerald-50/30 rounded-3xl transition-all">
              <h4 className="font-bold text-slate-800 mb-4 flex items-start">
                <span className="mr-4 text-emerald-800 font-cinzel text-lg">Q.</span> {faq.q}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-light border-l border-emerald-100 pl-8 ml-3.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;