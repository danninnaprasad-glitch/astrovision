import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_BLOGS } from '../constants';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = MOCK_BLOGS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-48 text-center space-y-10">
        <h1 className="text-4xl font-cinzel font-bold text-slate-900">Post Not Found</h1>
        <p className="text-slate-600 font-light">The celestial article you are looking for has drifted into another orbit.</p>
        <Link to="/blog" className="inline-block px-12 py-4 bg-emerald-700 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/10">
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 space-y-16">
      <Link to="/blog" className="inline-flex items-center text-emerald-800 hover:text-emerald-900 font-bold text-[10px] uppercase tracking-widest group transition-all">
        <span className="mr-3 group-hover:-translate-x-1 transition-transform">←</span> Back to Chronicles
      </Link>

      <div className="space-y-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-5 text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
            <span className="bg-emerald-600/10 px-4 py-1.5 rounded-full">{post.category}</span>
            <span className="text-slate-400">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-cinzel font-bold leading-tight text-slate-900">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-3 pt-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="aspect-video w-full rounded-[3.5rem] overflow-hidden border border-emerald-900/10 shadow-2xl">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose prose-slate max-w-none leading-relaxed text-slate-800">
          <div className="text-lg space-y-10 whitespace-pre-wrap font-light">
            {post.content}
            
            <p className="pt-12 border-t border-emerald-900/5 text-sm text-slate-400 italic font-light">
              Disclaimer: The insights provided in our articles are for spiritual awareness and general guidance. Always use your discernment when navigating life's journey.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-900/5 p-12 rounded-[4rem] border border-emerald-900/10 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="text-center lg:text-left space-y-2">
          <h3 className="text-xl font-cinzel font-bold text-slate-900">Enjoyed this chronicle?</h3>
          <p className="text-slate-600 text-sm font-light">Stay synchronized with our weekly planetary transits digest.</p>
        </div>
        <div className="flex w-full lg:w-auto gap-4">
          <input 
            type="email" 
            placeholder="Secure Email Access" 
            className="bg-white border border-slate-200 rounded-full px-8 py-4 outline-none focus:ring-4 focus:ring-emerald-600/10 flex-grow text-sm shadow-sm"
          />
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;