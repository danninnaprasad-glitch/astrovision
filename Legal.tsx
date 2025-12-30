import React from 'react';

interface LegalProps {
  type: 'privacy' | 'terms' | 'disclaimer';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      text: `Welcome to Astro Vision AI. Your privacy is a cornerstone of our spiritual mission. This policy outlines how we handle your information.

1. Data Collection: We collect birth data (Date, Time, and Place of Birth) and names solely for the purpose of generating personalized astrological reports. This data is transient and used to query our AI models.
2. AI Processing: By using our tools, you acknowledge that your input data is processed by Google Gemini AI models. This data is treated according to enterprise-grade security standards.
3. Cookies and Analytics: We use minimal cookies to maintain session states and analyze platform performance via anonymized metrics.
4. Data Retention: We do not permanently store your personal birth charts or specific identifying details in a persistent database unless explicitly saved by a registered user.
5. Third-Party Links: Our site may contain links to external partners. We are not responsible for their privacy practices.
6. GDPR & CCPA Compliance: Users have the right to request information about their data usage or ask for the removal of any stored sessions.

For inquiries regarding your data, contact privacy@astrovision.ai.`
    },
    terms: {
      title: 'Terms of Use',
      text: `By accessing Astro Vision AI, you agree to the following legally binding terms:

1. Eligibility: You must be at least 18 years of age to use this platform. Use by minors is only permitted under direct parental supervision.
2. License: We grant you a personal, non-exclusive license to use our AI tools for personal, non-commercial spiritual exploration.
3. User Conduct: You agree not to use our platform for any unlawful purpose, or to attempt to reverse-engineer our AI processing logic.
4. Intellectual Property: All content, including brand logos, tool logic, and generated text, is the property of Astro Vision AI or its licensors.
5. Limitation of Liability: Astro Vision AI is provided "as is." We do not guarantee the accuracy of astrological predictions. We are not liable for any direct or indirect damages resulting from your use of the site or decisions made based on AI reports.
6. Modifications: We reserve the right to update these terms at any time without prior notice.

Continued use of the site constitutes acceptance of these terms.`
    },
    disclaimer: {
      title: 'Spiritual Disclaimer',
      text: `Astrology is an ancient interpretive art, not a hard science. Please read the following carefully:

1. Entertainment Purposes: All reports, horoscopes, and AI interpretations provided by Astro Vision AI are intended for spiritual guidance, self-reflection, and entertainment purposes only.
2. Not Professional Advice: The content on this site does NOT constitute medical, legal, financial, or psychological advice. 
3. No Guarantees: Astrology deals with probabilities and symbolic archetypes. Predictions are not guarantees of future events.
4. Personal Agency: You are the ultimate master of your destiny. Astro Vision AI encourages you to use your own judgment and intuition when making life decisions.
5. AI Limitations: While our Gemini-powered models are highly sophisticated, they can occasionally produce errors or hallucinations. Always cross-reference significant insights with established astrological principles or human experts.
6. Health Warning: If you are experiencing a crisis, please seek help from a qualified medical professional or counselor immediately.`
    }
  };

  const active = content[type];

  return (
    <div className="max-w-4xl mx-auto py-32 px-6">
      <h1 className="text-4xl md:text-5xl font-cinzel font-bold mb-12 text-emerald-800 border-b border-emerald-900/10 pb-8">
        {active.title}
      </h1>
      <div className="prose prose-slate max-w-none leading-relaxed text-slate-800">
        <div className="whitespace-pre-wrap text-lg font-light space-y-8">
          {active.text.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-8">{paragraph}</p>
          ))}
        </div>
        <div className="mt-20 p-8 bg-white rounded-3xl border border-emerald-900/10 shadow-sm">
          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1">Official Status</p>
          <p className="text-xs text-slate-500">Last Updated: January 24, 2025</p>
          <p className="text-xs text-slate-500">Version: 2.1.0-AI-Enhanced</p>
        </div>
      </div>
    </div>
  );
};

export default Legal;