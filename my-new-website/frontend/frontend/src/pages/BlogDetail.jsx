// src/pages/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const API_URL = "http://127.0.0.1:8000";

const PostContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  // <-- MODIFIED: Remove padding to let image be flush -->
  padding: 0; 
  background: rgba(31, 40, 51, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.lightBg};
  border-radius: 8px;
  overflow: hidden; // <-- NEW: Keep image corners rounded -->
`;

// <-- NEW: Styled component for the main image -->
const PostImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBg};
`;

// <-- NEW: Wrapper for all the text content -->
const PostTextWrapper = styled.div`
  padding: 2rem 3rem 3rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const PostTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const PostMeta = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const PostContent = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  line-height: 1.7;

  // ... (all the h2, p, code styles are unchanged) ...
  h2, h3, h4 {
    color: ${({ theme }) => theme.colors.text};
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1.5rem;
  }
  a {
    color: ${({ theme }) => theme.colors.teal};
    text-decoration: underline;
  }
  pre {
    background: ${({ theme }) => theme.colors.darkBg};
    border: 1px solid ${({ theme }) => theme.colors.lightBg};
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.9rem;
    margin: 1.5rem 0;
  }
  code {
    font-family: 'Fira Code', 'Menlo', 'monospace';
  }
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.teal};
  text-decoration: none;
  display: inline-block;
  margin-bottom: 2rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};


const BlogDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    axios.get(`${API_URL}/api/blog/posts/${slug}/`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching single post:", error);
        setError("Failed to load post.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <PostContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
      {/* // <-- NEW: Add the featured image at the top --> */}
      {post.featured_image && (
        <PostImage src={`${API_URL}${post.featured_image}`} alt={post.title} />
      )}

      {/* // <-- NEW: Wrap all text content in the wrapper --> */}
      <PostTextWrapper>
        <BackLink to="/blog">← Back to Blog</BackLink>
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          {formatDate(post.created)}
        </PostMeta>
        
        <PostContent 
          dangerouslySetInnerHTML={{ __html: post.content_html }} 
        />
      </PostTextWrapper>

    </PostContainer>
  );
};

export default BlogDetail;