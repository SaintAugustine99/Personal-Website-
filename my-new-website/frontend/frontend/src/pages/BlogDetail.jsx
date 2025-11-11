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
  padding: 2rem;
  background: rgba(31, 40, 51, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.lightBg};
  border-radius: 8px;
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

// This component will style the HTML we get from Django
const PostContent = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  line-height: 1.7;

  h2, h3, h4 {
    color: ${({ theme }) => theme.colors.text};
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }

  p {
    color: ${({ theme }) => theme.colors.textSecondary}; // Fixed typo here
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
  const { slug } = useParams(); // Gets the 'slug' from the URL

  useEffect(() => {
    // Fetch the single post using its slug
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
  }, [slug]); // Re-run this effect if the slug changes

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <PostContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackLink to="/blog">← Back to Blog</BackLink>
      <PostTitle>{post.title}</PostTitle>
      <PostMeta>
        {formatDate(post.created)}
      </PostMeta>
      
      {/* This is the magic part: it renders the HTML from your backend */}
      <PostContent 
        dangerouslySetInnerHTML={{ __html: post.content_html }} 
      />

    </PostContainer>
  );
};

export default BlogDetail;