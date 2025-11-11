import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from '../components/common';

// API URL from your original file (add blog url from backend)
const API_URL = "http://127.0.0.1:8000";

const BlogContainer = styled(motion.div)`
  h1 {
    font-size: 3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.violet};
    text-shadow: ${({ theme }) => theme.glowViolet};
    margin-bottom: 3rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PostCard = styled(Card)`
  display: flex;
  flex-direction: column;
  
  a {
    text-decoration: none;
  }
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;

  ${PostCard}:hover & {
    color: ${({ theme }) => theme.colors.teal};
  }
`;

const PostMeta = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-grow: 1;
`;

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/blog/posts/`)
      .then(response => {
        setPosts(response.data.results || response.data); // Handle pagination if present
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blog posts:", error);
        setError("Failed to load posts. Please try again later.");
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) return <p>Loading constellation data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <BlogContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1>From the Void</h1>
      <BlogGrid>
        {posts.map(post => (
          <PostCard key={post.id} variants={itemVariants}>
            <Link to={`/blog/${post.slug}`}>
              <PostTitle>{post.title}</PostTitle>
              <PostMeta>
                {formatDate(post.created)}
              </PostMeta>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
            </Link>
          </PostCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default Blog;