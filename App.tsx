
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Language } from './types.ts';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Tools from './pages/Tools.tsx';
import Blog from './pages/Blog.tsx';
import BlogPostDetail from './pages/BlogPostDetail.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Admin from './pages/Admin.tsx';
import Legal from './pages/Legal.tsx';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  return (
    <HashRouter>
      <Layout lang={lang} setLang={setLang}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/tools" element={<Tools lang={lang} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact lang={lang} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/disclaimer" element={<Legal type="disclaimer" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
