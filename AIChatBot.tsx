import React, { useState, useEffect, useRef } from 'react';
import { createCosmicChat } from '../services/gemini';
import { GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Greetings, seeker. I am your Cosmic Guide. How can the stars assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session on mount
    chatRef.current = createCosmicChat();
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessage({ message: userMessage });
      const response = result as GenerateContentResponse;
      const aiText = response.text || "The cosmos is silent. Please try again later.";
      
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "A solar flare disrupted our connection. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100] font-inter">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
          isOpen ? 'bg-[#0F1115] rotate-90 border border-white/10' : 'bg-[#10B981] hover:scale-110 shadow-[#10B981]/20'
        }`}
      >
        {isOpen ? (
          <span className="text-white text-2xl">×</span>
        ) : (
          <span className="text-[#05070A] text-2xl">✨</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[380px] h-[550px] bg-[#0F1115]/95 backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-500">
          {/* Header */}
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-lg text-[#05070A] shadow-lg shadow-[#10B981]/20">✨</div>
              <div>
                <h3 className="text-sm font-cinzel font-bold text-white tracking-widest">Cosmic Guide</h3>
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></span>
                  <span className="text-[9px] text-[#10B981] uppercase tracking-[0.2em] font-bold">Synchronized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar scrollbar-hide">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
              >
                <div
                  className={`max-w-[85%] p-5 rounded-3xl text-xs leading-relaxed font-light ${
                    msg.role === 'user'
                      ? 'bg-[#10B981] text-[#05070A] rounded-tr-none font-bold'
                      : 'bg-white/5 text-white/60 rounded-tl-none border border-white/5 italic'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 p-4 rounded-3xl rounded-tl-none flex space-x-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-8 bg-white/5 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Interface with the void..."
                className="w-full bg-[#05070A] border border-white/10 rounded-full px-8 py-4 pr-14 text-xs font-light focus:border-[#10B981]/50 outline-none transition-all text-white placeholder:text-white/10"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[#10B981] hover:bg-[#10B981]/10 transition-all disabled:opacity-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;