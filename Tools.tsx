
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types.ts';
import { TRANSLATIONS, ZODIAC_DATA, CHINESE_ZODIAC, VEDIC_RASHI_DATA, TOOL_CATEGORIES } from '../constants.tsx';
import { generateAstrologyReport } from '../services/gemini.ts';

const Tools: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    pronouns: '',
    dob: '', 
    tob: '',
    location: '',
    partnerName: '',
    partnerDob: '',
    partnerTob: '',
    partnerLocation: ''
  });

  const [horoscopeLang, setHoroscopeLang] = useState<Language>(lang);
  const [horoscopePerspective, setHoroscopePerspective] = useState<string>('Western');
  const [horoscopeTimeframe, setHoroscopeTimeframe] = useState<string>('Daily');

  const [dobParts, setDobParts] = useState({ day: '', month: '', year: '' });
  const [partnerDobParts, setPartnerDobParts] = useState({ day: '', month: '', year: '' });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [calculatedMetrics, setCalculatedMetrics] = useState<any>(null);
  const [partnerMetrics, setPartnerMetrics] = useState<any>(null);
  const [synastryAspects, setSynastryAspects] = useState<any[]>([]);

  // Feedback State
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [sentiment, setSentiment] = useState<'up' | 'down' | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');

  const [cosmicWeather, setCosmicWeather] = useState<string | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsWeatherLoading(true);
      try {
        const weather = await generateAstrologyReport('cosmic_weather', {
          name: 'Guest',
          dob: new Date().toISOString().split('T')[0],
          tob: '12:00',
          location: 'Global'
        }, lang);
        setCosmicWeather(weather);
      } catch (err) {
        console.error("Failed to fetch cosmic weather:", err);
      } finally {
        setIsWeatherLoading(false);
      }
    };
    fetchWeather();
  }, [lang]);

  useEffect(() => {
    if (dobParts.day && dobParts.month && dobParts.year) {
      const formattedDob = `${dobParts.year}-${dobParts.month.padStart(2, '0')}-${dobParts.day.padStart(2, '0')}`;
      setFormData(prev => ({ ...prev, dob: formattedDob }));
    }
  }, [dobParts]);

  useEffect(() => {
    if (partnerDobParts.day && partnerDobParts.month && partnerDobParts.year) {
      const formattedDob = `${partnerDobParts.year}-${partnerDobParts.month.padStart(2, '0')}-${partnerDobParts.day.padStart(2, '0')}`;
      setFormData(prev => ({ ...prev, partnerDob: formattedDob }));
    }
  }, [partnerDobParts]);

  useEffect(() => {
    setHoroscopeLang(lang);
  }, [lang]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { val: '1', label: 'Jan' }, { val: '2', label: 'Feb' }, { val: '3', label: 'Mar' },
    { val: '4', label: 'Apr' }, { val: '5', label: 'May' }, { val: '6', label: 'Jun' },
    { val: '7', label: 'Jul' }, { val: '8', label: 'Aug' }, { val: '9', label: 'Sep' },
    { val: '10', label: 'Oct' }, { val: '11', label: 'Nov' }, { val: '12', label: 'Dec' }
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  // --- CALCULATION ENGINE ---
  const calculateWesternSign = (m: number, d: number) => {
    const val = m * 100 + d;
    for (const sign of ZODIAC_DATA) {
      const [sm, sd] = sign.start.split('-').map(Number);
      const [em, ed] = sign.end.split('-').map(Number);
      const startVal = sm * 100 + sd;
      const endVal = em * 100 + ed;
      if (sign.name === 'Capricorn') {
        if (val >= 1222 || val <= 119) return sign;
      } else {
        if (val >= startVal && val <= endVal) return sign;
      }
    }
    return ZODIAC_DATA[0];
  };

  const calculateLifePath = (dob: string) => {
    if (!dob) return 0;
    const digits = dob.replace(/-/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  };

  const calculateNameNumerology = (name: string) => {
    const table: Record<string, number> = { 
      a:1, b:2, c:3, d:4, e:5, f:8, g:3, h:5, i:1, j:1, k:2, l:3, m:4, n:5, o:7, p:8, q:1, r:2, s:3, t:4, u:6, v:6, w:6, x:5, y:1, z:7
    };
    const digits = name.toLowerCase().replace(/[^a-z]/g, '').split('').map(char => table[char] || 0);
    let sum = digits.reduce((a, b) => a + b, 0);
    if (sum === 0) return 0;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum;
  };

  const calculateChineseSign = (year: number) => {
    return CHINESE_ZODIAC[(year - 4) % 12];
  };

  const calculateMoonPhase = (date: Date) => {
    const knownNewMoon = new Date('2024-01-11T11:57:00');
    const diff = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const cycle = 29.53059;
    const pos = diff % cycle;
    if (pos < 1.84) return "New Moon";
    if (pos < 5.53) return "Waxing Crescent";
    if (pos < 9.22) return "First Quarter";
    if (pos < 12.91) return "Waxing Gibbous";
    if (pos < 16.61) return "Full Moon";
    if (pos < 20.30) return "Waning Gibbous";
    if (pos < 23.99) return "Last Quarter";
    if (pos < 27.68) return "Waning Crescent";
    return "New Moon";
  };

  const calculateAscendant = (sunSign: string, tob: string) => {
    if (!tob) return "Unknown";
    const [hours, minutes] = tob.split(':').map(Number);
    const timeInHours = hours + (minutes / 60);
    let hoursSinceSunrise = timeInHours - 6; 
    if (hoursSinceSunrise < 0) hoursSinceSunrise += 24;
    const signIndexShift = Math.floor(hoursSinceSunrise / 2);
    const sunSignIndex = ZODIAC_DATA.findIndex(z => z.name === sunSign);
    const ascendantIndex = (sunSignIndex + signIndexShift) % 12;
    return ZODIAC_DATA[ascendantIndex].name;
  };

  const calculateMarsPlacement = (dob: string, tob: string) => {
    const seed = new Date(dob).getTime() + parseInt(tob.replace(':', ''));
    const house = (seed % 12) + 1;
    const doshaHouses = [1, 2, 4, 7, 8, 12];
    return { house, isMangalik: doshaHouses.includes(house) };
  };

  const generateComplexAspects = (dob: string, tob: string) => {
    const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
    const aspectTypes = [
      { name: 'Conjunction', angle: 0, type: 'Major', harmony: 'Neutral', symbol: '☌', meaning: 'Energy Fusion' },
      { name: 'Opposition', angle: 180, type: 'Major', harmony: 'Challenging', symbol: '☍', meaning: 'Direct Tension' },
      { name: 'Trine', angle: 120, type: 'Major', harmony: 'Harmonious', symbol: '△', meaning: 'Easy Flow' },
      { name: 'Square', angle: 90, type: 'Major', harmony: 'Challenging', symbol: '□', meaning: 'Internal Friction' },
      { name: 'Sextile', angle: 60, type: 'Major', harmony: 'Harmonious', symbol: '⚹', meaning: 'Opportunities' }
    ];

    const seed = new Date(dob).getTime() + (tob ? parseInt(tob.replace(':', '')) : 0);
    const aspectsFound: any[] = [];
    let index = seed;
    for (let i = 0; i < 12; i++) {
      const p1 = planets[(index + i) % planets.length];
      const p2 = planets[(index + i + 1) % planets.length];
      const aspect = aspectTypes[(index + i) % aspectTypes.length];
      if (p1 !== p2) {
        aspectsFound.push({ p1, p2, aspect: aspect.name, type: aspect.type, harmony: aspect.harmony, symbol: aspect.symbol, meaning: aspect.meaning });
      }
      index = Math.floor(index / 2);
    }
    return aspectsFound;
  };

  const calculateSynastry = (userSeed: number, partnerSeed: number) => {
    const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
    const aspectTypes = [
      { name: 'Conjunction', symbol: '☌', harmony: 'Neutral', impact: 'High' },
      { name: 'Opposition', symbol: '☍', harmony: 'Challenging', impact: 'High' },
      { name: 'Trine', symbol: '△', harmony: 'Harmonious', impact: 'High' },
      { name: 'Square', symbol: '□', harmony: 'Challenging', impact: 'Medium' },
      { name: 'Sextile', symbol: '⚹', harmony: 'Harmonious', impact: 'Medium' }
    ];
    
    const synastry: any[] = [];
    let combined = userSeed + partnerSeed;
    for (let i = 0; i < 6; i++) {
      const p1 = planets[(combined + i) % planets.length];
      const p2 = planets[(combined + i + 2) % planets.length];
      const aspect = aspectTypes[(combined + i) % aspectTypes.length];
      synastry.push({ userPlanet: p1, partnerPlanet: p2, aspect: aspect.name, symbol: aspect.symbol, harmony: aspect.harmony, impact: aspect.impact });
      combined = Math.floor(combined / 3);
    }
    return synastry;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dob || !formData.tob || !formData.location || !selectedTool) {
        alert("Birth data is essential for accurate cosmic rendering.");
        return;
    }

    setLoading(true);
    setResult(null);
    setFeedbackSent(false);

    // 1. Calculate User Metrics
    const birthDate = new Date(formData.dob);
    const sun = calculateWesternSign(birthDate.getMonth() + 1, birthDate.getDate());
    const userMetrics = {
      sunSign: sun.name,
      ascendant: calculateAscendant(sun.name, formData.tob),
      moonPhase: calculateMoonPhase(birthDate),
      lifePath: calculateLifePath(formData.dob),
      nameVibration: calculateNameNumerology(formData.name),
      element: sun.element,
      aspects: generateComplexAspects(formData.dob, formData.tob)
    };
    setCalculatedMetrics(userMetrics);

    // 2. Calculate Partner Metrics (if applicable)
    let pMetrics = null;
    let sAspects = [];
    if (selectedTool === 'compatibility' && formData.partnerDob) {
      const pBirthDate = new Date(formData.partnerDob);
      const pSun = calculateWesternSign(pBirthDate.getMonth() + 1, pBirthDate.getDate());
      pMetrics = {
        sunSign: pSun.name,
        ascendant: calculateAscendant(pSun.name, formData.partnerTob),
        moonPhase: calculateMoonPhase(pBirthDate),
        lifePath: calculateLifePath(formData.partnerDob),
        nameVibration: calculateNameNumerology(formData.partnerName),
        element: pSun.element
      };
      setPartnerMetrics(pMetrics);
      
      const userSeed = birthDate.getTime() + parseInt(formData.tob.replace(':', ''));
      const partnerSeed = pBirthDate.getTime() + parseInt(formData.partnerTob.replace(':', ''));
      sAspects = calculateSynastry(userSeed, partnerSeed);
      setSynastryAspects(sAspects);
    }

    try {
      const report = await generateAstrologyReport(selectedTool, {
        ...formData,
        userQuestion,
        horoscopeLang,
        perspective: horoscopePerspective,
        horoscopeTimeframe,
        ascendant: userMetrics.ascendant,
        moonPhase: userMetrics.moonPhase,
        kundliData: userMetrics,
        partnerData: pMetrics,
        synastryAspects: sAspects
      }, lang);
      setResult(report);
    } catch (err) {
      setResult("The planetary alignment encountered a temporary error.");
    } finally {
      setLoading(false);
    }
  };

  const getToolIcon = (id: string) => {
    const cat = TOOL_CATEGORIES.find(c => c.tools.includes(id));
    return cat ? cat.icon : '✨';
  };

  const getToolDescription = (tid: string) => {
    return t.toolDescriptions?.[tid as keyof typeof t.toolDescriptions] || 
           TRANSLATIONS.en.toolDescriptions[tid as keyof typeof TRANSLATIONS.en.toolDescriptions] || 
           "Professional astrological module.";
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 space-y-24">
      {/* Hero Header */}
      <div className="text-center space-y-6">
        <h2 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.5em] reveal">Professional Hub</h2>
        <h1 className="text-5xl md:text-7xl font-cinzel font-medium text-slate-900 leading-tight reveal">Professional Workbench</h1>
      </div>

      {!selectedTool ? (
        <div className="space-y-16 reveal">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={t.labels.searchTools}
              className="w-full bg-white border border-emerald-900/10 rounded-full px-14 py-6 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-xl"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
          </div>

          <div className="space-y-24">
            {TOOL_CATEGORIES.map(cat => (
              <div key={cat.id} className="space-y-10">
                <div className="flex items-center space-x-4 border-b border-emerald-900/5 pb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-[0.3em]">{t.categories[cat.id as keyof typeof t.categories]}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.tools.filter(tid => !searchQuery || t.tools[tid as keyof typeof t.tools].toLowerCase().includes(searchQuery.toLowerCase())).map(tid => (
                    <button
                      key={tid}
                      onClick={() => setSelectedTool(tid)}
                      className="group bg-white p-10 rounded-[2.5rem] border border-emerald-900/10 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all text-left flex flex-col justify-between h-full"
                    >
                      <div className="space-y-5">
                        <span className="text-3xl block grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all">{getToolIcon(tid)}</span>
                        <h4 className="text-xl font-cinzel font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{t.tools[tid as keyof typeof t.tools]}</h4>
                        <p className="text-[11px] text-slate-500 font-light leading-relaxed group-hover:text-slate-700 transition-colors">
                          {getToolDescription(tid)}
                        </p>
                      </div>
                      <span className="mt-8 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700/40 group-hover:text-emerald-700">Open Module →</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-20 animate-in fade-in duration-700">
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setSelectedTool(null); setResult(null); setCalculatedMetrics(null); setPartnerMetrics(null); setSynastryAspects([]); }}
              className="text-emerald-800 hover:text-emerald-950 text-[10px] font-bold uppercase tracking-widest flex items-center group"
            >
              <span className="mr-3 group-hover:-translate-x-1 transition-transform">←</span> {t.labels.backToHub}
            </button>
            <h3 className="text-xl font-cinzel font-bold text-slate-900">{t.tools[selectedTool as keyof typeof t.tools]}</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Input Form Column */}
            <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-emerald-900/10 shadow-2xl space-y-12 h-fit sticky top-28">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">{t.labels.name}</label>
                    <input required className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none text-slate-900 shadow-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">{t.labels.dob}</label>
                    <div className="flex gap-2">
                       <select required className="w-1/3 bg-[#FFFBF2] border border-slate-200 rounded-full px-4 py-5 outline-none text-xs" value={dobParts.day} onChange={e => setDobParts({ ...dobParts, day: e.target.value })}>
                         <option value="">DD</option>{days.map(d => <option key={d} value={String(d)}>{d}</option>)}
                       </select>
                       <select required className="w-1/3 bg-[#FFFBF2] border border-slate-200 rounded-full px-4 py-5 outline-none text-xs" value={dobParts.month} onChange={e => setDobParts({ ...dobParts, month: e.target.value })}>
                         <option value="">MM</option>{months.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                       </select>
                       <select required className="w-1/3 bg-[#FFFBF2] border border-slate-200 rounded-full px-4 py-5 outline-none text-xs" value={dobParts.year} onChange={e => setDobParts({ ...dobParts, year: e.target.value })}>
                         <option value="">YYYY</option>{years.map(y => <option key={y} value={String(y)}>{y}</option>)}
                       </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">{t.labels.tob}</label>
                    <input required type="time" className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none text-slate-900 shadow-sm" value={formData.tob} onChange={e => setFormData({ ...formData, tob: e.target.value })} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">{t.labels.loc}</label>
                    <input required className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none text-slate-900 shadow-sm" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                  </div>
                </div>

                {selectedTool === 'compatibility' && (
                  <div className="pt-10 border-t border-emerald-900/5 space-y-10 animate-in fade-in">
                    <h3 className="text-sm font-cinzel font-bold text-emerald-800 uppercase tracking-widest">Partner Alignment Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Partner Name</label>
                        <input className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none" value={formData.partnerName} onChange={e => setFormData({ ...formData, partnerName: e.target.value })} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Birth Date (Partner)</label>
                        <div className="flex gap-2">
                          <select className="w-1/3 bg-[#FFFBF2] border border-slate-200 rounded-full px-4 py-5 outline-none text-xs" value={partnerDobParts.day} onChange={e => setPartnerDobParts({ ...partnerDobParts, day: e.target.value })}>
                            <option value="">DD</option>{days.map(d => <option key={d} value={String(d)}>{d}</option>)}
                          </select>
                          <select className="w-1/3 bg-[#FFFBF2] border border-slate-200 rounded-full px-4 py-5 outline-none text-xs" value={partnerDobParts.month} onChange={e => setPartnerDobParts({ ...partnerDobParts, month: e.target.value })}>
                            <option value="">MM</option>{months.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                          </select>
                          <select className="w-1/3 bg-[#FFFBF2] border border-slate-200 rounded-full px-4 py-5 outline-none text-xs" value={partnerDobParts.year} onChange={e => setPartnerDobParts({ ...partnerDobParts, year: e.target.value })}>
                            <option value="">YYYY</option>{years.map(y => <option key={y} value={String(y)}>{y}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Birth Time (Partner)</label>
                       <input type="time" className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none" value={formData.partnerTob} onChange={e => setFormData({ ...formData, partnerTob: e.target.value })} />
                    </div>
                  </div>
                )}

                <button disabled={loading} type="submit" className="emerald-button w-full py-7 rounded-full font-bold text-[10px] uppercase tracking-[0.5em] shadow-2xl disabled:opacity-50">
                  {loading ? "Initializing..." : "Calculate Synergy"}
                </button>
              </form>
            </div>

            {/* Results Column */}
            <div className="bg-emerald-900/5 p-12 md:p-16 rounded-[4.5rem] border border-emerald-900/10 min-h-[600px] flex flex-col relative overflow-hidden shadow-inner h-fit">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
              
              {result ? (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                   {selectedTool === 'compatibility' && calculatedMetrics && partnerMetrics && (
                       <div className="space-y-12">
                          <div className="flex items-center justify-center space-x-12">
                             <div className="text-center space-y-4">
                                <div className="w-24 h-24 rounded-full border-2 border-emerald-600/20 flex items-center justify-center text-4xl bg-white shadow-lg animate-pulse">{calculatedMetrics.element === 'Fire' ? '🔥' : calculatedMetrics.element === 'Water' ? '💧' : calculatedMetrics.element === 'Air' ? '💨' : '🌱'}</div>
                                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">{formData.name}</p>
                                <p className="text-xs font-cinzel text-slate-900">{calculatedMetrics.sunSign}</p>
                             </div>
                             <div className="text-4xl text-emerald-800/20 font-cinzel">×</div>
                             <div className="text-center space-y-4">
                                <div className="w-24 h-24 rounded-full border-2 border-emerald-600/20 flex items-center justify-center text-4xl bg-white shadow-lg animate-pulse">{partnerMetrics.element === 'Fire' ? '🔥' : partnerMetrics.element === 'Water' ? '💧' : partnerMetrics.element === 'Air' ? '💨' : '🌱'}</div>
                                <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">{formData.partnerName}</p>
                                <p className="text-xs font-cinzel text-slate-900">{partnerMetrics.sunSign}</p>
                             </div>
                          </div>

                          <div className="bg-white p-10 rounded-[3rem] border border-emerald-900/10 shadow-xl space-y-8">
                             <div className="flex items-center justify-between border-b border-emerald-900/5 pb-4">
                                <h4 className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.3em]">Inter-Chart Connections</h4>
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Synastry Matrix 1.0</span>
                             </div>
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {synastryAspects.map((asp: any, idx: number) => (
                                  <div key={idx} className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-900/5 space-y-2 group hover:bg-emerald-50 transition-all">
                                     <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-emerald-800">{asp.symbol}</span>
                                        <span className={`text-[8px] font-bold uppercase tracking-widest ${asp.harmony === 'Harmonious' ? 'text-emerald-500' : 'text-amber-500'}`}>{asp.harmony}</span>
                                     </div>
                                     <div className="space-y-0.5">
                                        <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{asp.userPlanet} <> {asp.partnerPlanet}</p>
                                        <p className="text-xs font-cinzel font-bold text-slate-900 leading-tight">{asp.aspect}</p>
                                     </div>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                   )}

                   <div className="prose prose-emerald max-w-none text-left w-full pt-12 border-t border-emerald-900/5">
                      <div className="text-slate-700 leading-relaxed font-light whitespace-pre-wrap text-lg animate-in slide-in-from-bottom-4 duration-1000">
                        {result}
                      </div>
                   </div>
                </div>
              ) : (
                <div className="m-auto text-center space-y-10">
                  <div className="w-40 h-40 rounded-full border border-emerald-900/10 m-auto flex items-center justify-center bg-white/50 shadow-inner relative">
                    <div className="absolute inset-2 rounded-full border border-dashed border-emerald-600/20 animate-[spin_60s_linear_infinite]"></div>
                    <span className="text-6xl grayscale opacity-20 filter animate-pulse relative z-10">🌌</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-slate-500 font-cinzel font-bold text-sm tracking-widest uppercase">{t.labels.systemStandby}</p>
                    <p className="text-slate-400 italic font-light max-w-xs mx-auto text-xs leading-relaxed">{t.labels.initializeDataDesc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
