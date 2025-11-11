// src/App.jsx
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
// You will need to create BlogDetail.jsx and Portfolio.jsx pages
// import BlogDetail from './pages/BlogDetail'; 
// import Portfolio from './pages/Portfolio';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        {/* <Route path="blog/:slug" element={<BlogDetail />} /> */}
        {/* <Route path="portfolio" element={<Portfolio />} /> */}
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;