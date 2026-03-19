// src/pages/Blog.jsx
// Editorial blog section: stacked list of essays that expand into
// a full-page reading overlay when clicked.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../config/api';
import { useBodyScroll } from '../hooks/useBodyScroll';

const BlogContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const EmptyState = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
  padding: 4rem 0;
  text-align: center;
  letter-spacing: 0.15em;
  text-transform: lowercase;

  .blink {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const SectionTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 5rem);
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 3rem;
  text-align: left;
`;

// Each post in the list
const PostEntry = styled(motion.div)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem 0;
  cursor: pointer;
  transition: padding-left 0.3s ease;

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:hover {
    padding-left: 1rem;
  }
`;

const PostNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  display: block;
  margin-bottom: 0.5rem;
`;

const PostTitle = styled.h2`
  font-size: clamp(1.3rem, 3vw, 2rem);
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;

  ${PostEntry}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const PostMeta = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.6;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const PostExcerpt = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.8rem 0 0 0;
  max-width: 60ch;
  line-height: 1.6;
`;

// --- FULL-PAGE READING OVERLAY ---
const ReadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.mainBg};
  z-index: 200;
  overflow-y: auto;
  padding: 0;
`;

const ReadingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.mainBg};
  z-index: 201;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const BackButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ReadingMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.15em;
`;

const ReadingContent = styled.article`
  max-width: 680px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem 2rem;

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem 4rem 1.5rem;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 1.5rem;
    line-height: 1.05;
  }

  p {
    font-size: 1.15rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    max-width: none;
  }

  blockquote {
    border-left: 2px solid ${({ theme }) => theme.colors.accent};
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  img {
    max-width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.border};
    margin: 2rem 0;
  }
`;

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  // Lock body scroll when a post is open
  useBodyScroll(selectedPost !== null);

  useEffect(() => {
    axios.get(`${API_URL}/api/blog/posts/`)
      .then(response => {
        setPosts(response.data.results || response.data);
        setLoading(false);
      })
      .catch(() => {
        // No fallback essays — section stays empty until real content is added
        setPosts([]);
        setLoading(false);
      });
  }, []);

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && selectedPost) closePost();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedPost]);

  if (loading) return <p style={{ textAlign: 'center', opacity: 0.5 }}>Loading...</p>;

  return (
    <BlogContainer>
      <SectionTitle>Thoughts</SectionTitle>

      {posts.length === 0 && (
        <EmptyState>
          <span className="blink">_</span> transcribing...
        </EmptyState>
      )}

      {posts.map((post, index) => (
        <PostEntry
          key={post.id}
          onClick={() => openPost(post)}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.4 }}
        >
          <PostNumber>Essay #{(index + 1).toString().padStart(3, '0')}</PostNumber>
          <PostTitle>{post.title}</PostTitle>
          <PostMeta>{formatDate(post.created)}</PostMeta>
          <PostExcerpt>{post.excerpt}</PostExcerpt>
        </PostEntry>
      ))}

      {/* Full-page reading overlay */}
      <AnimatePresence>
        {selectedPost && (
          <ReadingOverlay
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ReadingHeader>
              <BackButton onClick={closePost}>← Back to Thoughts</BackButton>
              <ReadingMeta>{formatDate(selectedPost.created)}</ReadingMeta>
            </ReadingHeader>
            <ReadingContent>
              <h1>{selectedPost.title}</h1>
              {selectedPost.content ? (
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              ) : (
                <p>{selectedPost.excerpt}</p>
              )}
            </ReadingContent>
          </ReadingOverlay>
        )}
      </AnimatePresence>
    </BlogContainer>
  );
};

export default Blog;