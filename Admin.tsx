
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_BLOGS } from '../constants';
import { BlogPost } from '../types';

const Admin: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('blogs');
  
  // Data State
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
  const [blogSearch, setBlogSearch] = useState('');
  
  const [contact, setContact] = useState({
    email: 'hello@astrovision.ai',
    phone: '+91 9000 000 000',
    address: '123 Astral Lane, Starry Heights, Mumbai, India',
    formspreeId: 'xrbrgvbw'
  });
  const [social, setSocial] = useState({
    facebook: 'fb.com/astroai',
    instagram: 'ig.com/astroai',
    twitter: 'twitter.com/astroai',
    youtube: 'yt.com/astroai'
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost> | null>(null);
  const [tagInput, setTagInput] = useState('');

  // Success Notification State
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-save effect: Triggers on every state change in the editor
  useEffect(() => {
    if (isModalOpen && currentBlog && (currentBlog.title || currentBlog.content || currentBlog.excerpt)) {
      localStorage.setItem('astro_blog_editor_draft', JSON.stringify(currentBlog));
    }
  }, [currentBlog, isModalOpen]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'Astro-Vision 2025') {
      setIsAuthorized(true);
    } else {
      alert('Invalid Passcode');
    }
  };

  // Blog Functions
  const openBlogModal = (blog?: BlogPost) => {
    const savedDraft = localStorage.getItem('astro_blog_editor_draft');
    
    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft) as Partial<BlogPost>;
      // Check if the draft belongs to the same post (or if both are new)
      const isMatchingDraft = (blog && parsedDraft.id === blog.id) || (!blog && parsedDraft.id && !blogs.find(b => b.id === parsedDraft.id));

      if (isMatchingDraft) {
        if (window.confirm('An unsaved draft was found. Would you like to restore it?')) {
          setCurrentBlog(parsedDraft);
          setIsModalOpen(true);
          return;
        } else {
          // If they decline, we clear the draft to prevent recurring prompts for this specific session
          localStorage.removeItem('astro_blog_editor_draft');
        }
      }
    }

    setCurrentBlog(blog ? { ...blog } : {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      slug: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Zodiac',
      excerpt: '',
      content: '',
      tags: [],
      image: 'https://picsum.photos/800/400'
    });
    setIsModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBlog) return;

    const blogToSave = currentBlog as BlogPost;

    if (blogs.find(b => b.id === blogToSave.id)) {
      setBlogs(blogs.map(b => b.id === blogToSave.id ? blogToSave : b));
      showNotification('Article updated successfully!');
    } else {
      setBlogs([blogToSave, ...blogs]);
      showNotification('New article published!');
    }
    
    // Clear draft on successful save
    localStorage.removeItem('astro_blog_editor_draft');
    setIsModalOpen(false);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      setBlogs(blogs.filter(b => b.id !== id));
      showNotification('Article removed from the library.');
    }
  };

  const handleDiscardDraft = () => {
    if (window.confirm('Discard all unsaved changes? This will clear your current draft permanently.')) {
      localStorage.removeItem('astro_blog_editor_draft');
      setIsModalOpen(false);
      setCurrentBlog(null);
    }
  };

  const addTag = () => {
    if (!tagInput.trim() || !currentBlog) return;
    const newTags = [...(currentBlog.tags || []), tagInput.trim()];
    setCurrentBlog({ ...currentBlog, tags: Array.from(new Set(newTags)) });
    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    if (!currentBlog) return;
    setCurrentBlog({
      ...currentBlog,
      tags: currentBlog.tags?.filter(t => t !== tagToRemove)
    });
  };

  // Filtered Blogs for Admin View
  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => 
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase())
    );
  }, [blogs, blogSearch]);

  const handleSaveContact = () => {
    showNotification('Contact information updated!');
  };

  const handleSaveSocial = () => {
    showNotification('Social media links updated!');
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto py-48 px-6">
        <div className="bg-white p-12 rounded-[3.5rem] border border-emerald-900/10 shadow-2xl space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-cinzel font-bold text-emerald-800">Admin Sanctuary</h2>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Authorized Access Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-8">
            <input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-8 py-5 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-sm"
            />
            <button type="submit" className="emerald-button w-full py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg">
              Authorize Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-24 px-8 space-y-12 relative">
      {notification && (
        <div className="fixed bottom-12 right-12 bg-emerald-800 text-white px-10 py-5 rounded-full shadow-2xl z-[200] font-bold text-xs uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4">
          ✨ {notification}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between border-b border-emerald-900/10 pb-16 gap-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-cinzel font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm font-light italic">Universal Oversight Module</p>
        </div>
        <button onClick={() => setIsAuthorized(false)} className="px-10 py-4 bg-white hover:bg-emerald-50 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200 transition-all text-slate-500 hover:text-emerald-800 shadow-sm">Logout</button>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-6">
        {['blogs', 'contact', 'social'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap shadow-sm border ${
              activeTab === tab ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-white text-slate-400 hover:text-slate-900 border-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[4rem] border border-emerald-900/5 p-16 min-h-[600px] shadow-sm">
        {activeTab === 'blogs' && (
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="relative w-full sm:w-[450px]">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={blogSearch}
                  onChange={e => setBlogSearch(e.target.value)}
                  className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-12 py-5 text-xs text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/10 placeholder:text-slate-300"
                />
              </div>
              <button onClick={() => openBlogModal()} className="emerald-button px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">+ New Article</button>
            </div>
            
            <div className="overflow-x-auto rounded-[2.5rem] border border-emerald-900/10">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-900">
                    <th className="py-7 px-10 font-bold uppercase tracking-[0.3em]">Title</th>
                    <th className="py-7 px-10 font-bold uppercase tracking-[0.3em]">Date</th>
                    <th className="py-7 px-10 font-bold uppercase tracking-[0.3em]">Category</th>
                    <th className="py-7 px-10 font-bold uppercase tracking-[0.3em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50">
                  {filteredBlogs.map(post => (
                    <tr key={post.id} className="hover:bg-emerald-50/20 transition-colors">
                      <td className="py-7 px-10 font-medium text-slate-900">{post.title}</td>
                      <td className="py-7 px-10 text-slate-500">{post.date}</td>
                      <td className="py-7 px-10">
                        <span className="text-emerald-800 font-bold uppercase tracking-widest text-[10px] px-3 py-1 bg-emerald-50 rounded-full">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-7 px-10">
                        <div className="flex items-center space-x-8">
                          <button onClick={() => openBlogModal(post)} className="text-slate-400 hover:text-emerald-800 font-bold uppercase tracking-widest transition-all">Edit</button>
                          <button onClick={() => handleDeleteBlog(post.id)} className="text-red-300 hover:text-red-600 font-bold uppercase tracking-widest transition-all">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-2xl space-y-16 animate-in fade-in slide-in-from-left-4">
            <h3 className="text-3xl font-cinzel font-bold text-slate-900">Contact Info Editor</h3>
            <div className="grid grid-cols-1 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Support Email</label>
                <input type="email" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-sm" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Phone Number</label>
                <input type="text" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-sm" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Formspree ID</label>
                <input type="text" value={contact.formspreeId} onChange={(e) => setContact({...contact, formspreeId: e.target.value})} className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-sm" placeholder="e.g. xrbrgvbw" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Physical Address</label>
                <textarea rows={3} value={contact.address} onChange={(e) => setContact({...contact, address: e.target.value})} className="w-full bg-[#FFFBF2] border border-slate-200 rounded-[2.5rem] px-10 py-8 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 font-light shadow-sm"></textarea>
              </div>
              <button onClick={handleSaveContact} className="emerald-button px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs self-start shadow-xl shadow-emerald-900/10">Update Records</button>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
           <div className="max-w-2xl space-y-16 animate-in fade-in slide-in-from-left-4">
           <h3 className="text-3xl font-cinzel font-bold text-slate-900">Social Media Profiles</h3>
           <div className="grid grid-cols-1 gap-10">
             {Object.entries(social).map(([key, value]) => (
               <div key={key} className="space-y-4">
                 <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">{key}</label>
                 <input type="text" className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 outline-none focus:ring-4 focus:ring-emerald-600/10 text-slate-900 shadow-sm" value={value} onChange={(e) => setSocial({...social, [key]: e.target.value})} />
               </div>
             ))}
             <button onClick={handleSaveSocial} className="emerald-button px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs self-start shadow-xl shadow-emerald-900/10">Sync Links</button>
           </div>
         </div>
        )}
      </div>

      {isModalOpen && currentBlog && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-md z-[300] flex items-center justify-center p-8 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-[5rem] border border-emerald-900/10 shadow-3xl my-12 animate-in zoom-in-95 duration-500">
            <form onSubmit={handleSaveBlog} className="p-20 space-y-16">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-10">
                <div className="space-y-1">
                  <h3 className="text-3xl font-cinzel font-bold text-slate-900">
                    {blogs.find(b => b.id === currentBlog.id) ? 'Refine Article' : 'Initiate New Record'}
                  </h3>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
                    Draft Auto-Saved to local storage
                  </p>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 text-4xl transition-colors font-light">&times;</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Title</label>
                    <input required type="text" className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/10" value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Slug (URL)</label>
                    <input required type="text" className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/10" value={currentBlog.slug} onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Date</label>
                      <input required type="date" className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-8 py-5 text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/10" value={currentBlog.date} onChange={e => setCurrentBlog({...currentBlog, date: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Category</label>
                      <select className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-8 py-5 text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/10 appearance-none text-center cursor-pointer" value={currentBlog.category} onChange={e => setCurrentBlog({...currentBlog, category: e.target.value})}>
                        <option value="Zodiac">Zodiac</option>
                        <option value="Technology">Technology</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Planetary">Planetary</option>
                        <option value="Numerology">Numerology</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Featured Image URL</label>
                    <input type="text" className="w-full bg-[#FFFBF2] border border-slate-200 rounded-full px-10 py-5 text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/10" value={currentBlog.image} onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5">Excerpt</label>
                    <textarea required rows={3} className="w-full bg-[#FFFBF2] border border-slate-200 rounded-[3rem] px-10 py-8 text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/10 font-light" value={currentBlog.excerpt} onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} placeholder="Summary..."></textarea>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-5 block">Content (Markdown)</label>
                <textarea required rows={12} className="w-full bg-[#FFFBF2] border border-slate-200 rounded-[4rem] px-12 py-10 text-slate-900 outline-none focus:ring-4 focus:ring-emerald-600/10 font-light leading-relaxed scrollbar-hide" value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} placeholder="The cosmos unfolds..."></textarea>
              </div>

              <div className="flex items-center justify-end space-x-8 pt-12 border-t border-emerald-900/10">
                <button type="button" onClick={handleDiscardDraft} className="px-12 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-red-500 transition-colors">Discard Draft</button>
                <button type="submit" className="emerald-button px-16 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl">Publish Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
