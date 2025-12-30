
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BLOGS } from '../constants';

const Blog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  
  const categories = ['All', 'Zodiac', 'Technology', 'Meditation', 'Planetary'];
  
  const filteredPosts = MOCK_BLOGS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || post.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 space-y-24">
      <div className="text-center space-y-6">
        <h2 className="text-[10px] font-bold text-[#10B981] uppercase tracking-[0.5em]">The Library</h2>
        <h1 className="text-5xl md:text-7xl font-cinzel font-medium leading-tight text-slate-800">Astro Vision Chronicles</h1>
        <p className="text-slate-400 max-w-xl mx-auto font-light italic text-lg leading-relaxed">Synthesized insights for the modern seeker.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-b border-slate-100 pb-12">
        <div className="relative w-full md:w-[450px]">
          <input
            type="text"
            placeholder="Search the chronicles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-full px-12 py-5 focus:border-[#10B981]/40 outline-none text-slate-800 font-light text-sm transition-all shadow-sm"
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300">🔍</span>
        </div>
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                category === cat ? 'bg-[#10B981] text-white shadow-md' : 'bg-white text-slate-400 border border-slate-100 hover:text-slate-600 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {filteredPosts.map(post => (
          <article key={post.id} className="group flex flex-col space-y-10">
            <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 aspect-[4/5] shadow-sm">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s]" />
            </Link>
            <div className="space-y-6 flex-grow">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em]">
                <span className="text-[#10B981]">{post.category}</span>
                <span className="text-slate-300">{post.date}</span>
              </div>
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-cinzel font-medium leading-snug text-slate-800 group-hover:text-[#10B981] transition-colors">{post.title}</h2>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-3 italic">
                {post.excerpt}
              </p>
              <div className="pt-4">
                {/* Fixed truncation and closed Link component */}
                <Link to={`/blog/${post.slug}`} className="text-[10px] font-bold text-slate-400 group-hover:text-[#10B981] transition-all tracking-[0.3em] uppercase border-b border-slate-100 pb-2">Read Chronicle</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

// Added missing default export
export default Blog;
