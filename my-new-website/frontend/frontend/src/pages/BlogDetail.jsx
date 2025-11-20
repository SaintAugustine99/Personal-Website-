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
  padding: 0; 
  background: ${({ theme }) => theme.colors.navBg}; /* Use the glass background color */
  backdrop-filter: blur(15px); /* Stronger blur for legibility */
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px; /* Increased radius for softer look */
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2); /* Deep shadow for depth */
`;

const PostImage = styled.img`
  width: 100%;
  height: 400px; /* Taller header image */
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PostTextWrapper = styled.div`
  padding: 3rem 4rem; /* More breathing room */
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const PostTitle = styled.h1`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
`;

const PostMeta = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 1.5rem;
`;

const PostContent = styled.div`
  color: ${({ theme }) => theme.colors.text}; /* Main text needs high contrast */
  font-size: 1.125rem; /* Slightly larger for readability */
  line-height: 1.8;
  font-weight: 300;

  h2, h3, h4 {
    color: ${({ theme }) => theme.colors.text};
    margin-top: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
  }
  
  p {
    margin-bottom: 1.5rem;
    opacity: 0.9; /* Slight softness to text */
  }
  
  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.teal}; /* Highlight strong text */
  }

  a {
    color: ${({ theme }) => theme.colors.teal};
    text-decoration: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.teal};
    transition: all 0.2s;
    
    &:hover {
      background: ${({ theme }) => theme.colors.teal};
      color: #000;
    }
  }

  /* --- HANDLING INLINE IMAGES --- */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: block; /* Prevents inline spacing issues */
  }

  pre {
    background: ${({ theme }) => theme.colors.darkBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.violet};
    margin: 2rem 0;
    padding-left: 1.5rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.lightBg};
    padding: 1rem 1rem 1rem 1.5rem;
    border-radius: 0 8px 8px 0;
  }
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.3s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateX(-5px);
  }
`;

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

  if (loading) return <p style={{textAlign:'center', marginTop: '4rem'}}>Loading post...</p>;
  if (error) return <p style={{textAlign:'center', marginTop: '4rem'}}>{error}</p>;
  if (!post) return <p style={{textAlign:'center', marginTop: '4rem'}}>Post not found.</p>;

  return (
    <PostContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {post.featured_image && (
        <PostImage src={`${API_URL}${post.featured_image}`} alt={post.title} />
      )}

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