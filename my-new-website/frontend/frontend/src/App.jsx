import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx';
import Portfolio from './pages/Portfolio.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        {/* <Route path="blog/:slug" element={<BlogDetail />} /> */}
        <Route path="portfolio" element={<Portfolio />} /> {/* <-- ADDED */}
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;