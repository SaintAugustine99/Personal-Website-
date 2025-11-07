import React from 'react'
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout'; // Your new 'base.html'
import BlogList from './pages/BlogList';   // Your new 'post_list.html'
// ... import other pages

function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/blog" element={<BlogList />} />
        {/* <Route path="/blog/:slug" element={<BlogDetail />} /> */}
        {/* <Route path="/portfolio" element={<PortfolioList />} /> */}
      </Routes>
    </Layout>
  )
}
export default App