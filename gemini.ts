
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

/**
 * Astro Vision AI - Gemini Synthesis Service
 * Dual-layer API key detection ensures stability across local and cloud environments.
 */

const getApiKey = (): string => {
  try {
    // 1. Check for injected process.env (Vite/Bundler style)
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    // 2. Check for global window variable
    if ((window as any).API_KEY) {
      return (window as any).API_KEY;
    }
    // 3. Fallback to common production env patterns
    const env = (import.meta as any).env;
    if (env && env.VITE_API_KEY) return env.VITE_API_KEY;
  } catch (e) {
    console.warn("API Key detection notice:", e);
  }
  return '';
};

export const generateAstrologyReport = async (
  toolId: string,
  details: { 
    name: string; 
    pronouns?: string;
    dob: string; 
    tob: string; 
    location: string; 
    partnerName?: string; 
    partnerDob?: string;
    partnerTob?: string; 
    partnerLocation?: string;
    kundliData?: any;
    partnerData?: any;
    synastryAspects?: any[];
    luckyData?: { number: number; color: string; stone: string; sign: string };
    moonPhase?: string;
    chineseAnimal?: string;
    aspects?: any[];
    ascendant?: string;
    hasMangalDosha?: boolean;
    marsHouse?: number;
    perspective?: string;
    horoscopeLang?: Language;
    horoscopeTimeframe?: string;
    sadeSatiStatus?: { rashi: string; status: string; phase: string };
    calendarEvent?: { title: string; date: string; type: string };
    userQuestion?: string;
  },
  lang: Language
) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error("Astro Vision AI: API_KEY is missing.");
    return "The cosmic gateway is currently locked. Please ensure the API_KEY is configured in your platform settings.";
  }

  const ai = new GoogleGenAI({ apiKey });
  const targetLang = (toolId === 'daily' && details.horoscopeLang) ? details.horoscopeLang : lang;

  const languageNames: Record<Language, string> = {
    en: 'English',
    te: 'Telugu',
    hi: 'Hindi',
    ta: 'Tamil',
    kn: 'Kannada'
  };

  const contextData = `
    USER: ${details.name} (${details.pronouns || 'N/A'})
    BIRTH: ${details.dob} ${details.tob} at ${details.location}
    DETERMINISTIC METRICS: ${JSON.stringify(details.kundliData)}
    ${details.partnerName ? `PARTNER: ${details.partnerName} (${details.partnerDob}). SYNASTRY: ${JSON.stringify(details.synastryAspects)}` : ''}
    SPECIFIC INQUIRY: ${details.userQuestion || 'N/A'}
  `;

  const prompt = `
    Act as the Astro Vision AI Master Intelligence. 
    Module: ${toolId}
    Language: ${languageNames[targetLang]}
    
    ASTROLOGICAL CONTEXT:
    ${contextData}

    INSTRUCTIONS:
    1. Synthesize the provided metrics into a deep, professional, and spiritual analysis.
    2. Focus on psychological depth and actionable karmic advice.
    3. Use Markdown formatting with H2/H3 headers.
    4. Write EXCLUSIVELY in ${languageNames[targetLang]}.
    5. Maintain a tone of elite professionalism and ancient wisdom.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', 
      contents: prompt,
      config: {
        systemInstruction: `You are Astro Vision AI. You provide world-class, multi-lingual astrological interpretations. You speak ONLY in ${languageNames[targetLang]}.`,
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    
    return response.text || "The celestial signals are weak. Please re-attempt your inquiry.";
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return "Solar flares are currently disrupting the AI synthesis. Please try again in a few minutes.";
  }
};

export const createCosmicChat = () => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey: apiKey || '' });
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are the Astro Vision AI Cosmic Guide. You assist users with wisdom regarding astrology, spirituality, and self-discovery.`,
      temperature: 0.75,
    },
  });
};
