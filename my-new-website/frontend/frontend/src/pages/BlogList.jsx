import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation

// This is the "base URL" for your Django API
// For production, this will be your live URL
const API_URL = "http://127.0.0.1:8000"; 

// This component fakes the 'likes' just as you described
const LikeButton = ({ initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  // We'll fake a random number of likes, or you can pass 'id' and use localStorage
  const randomInitialLikes = Math.floor(Math.random() * 100) + 5;

  useEffect(() => {
    setLikes(randomInitialLikes);
  }, []);

  return (
    <button onClick={() => setLikes(likes + 1)} className="like-button">
      ❤️ {likes}
    </button>
  );
};

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from Django API using axios
    axios.get(`${API_URL}/api/blog/posts/`)
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      });
  }, []); // The empty array [] means this runs once on page load

  if (loading) {
    return <div>Loading...</div>;
  }

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="blog-list-container">
      <h1 className="page-title">Blog</h1>
      {posts.map(post => (
        // This is the Framer Motion animation from your guide
        <motion.div
          key={post.id}
          className="blog-post-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -3 }} // Slight lift on hover
        >
          <Link to={`/blog/${post.slug}`} className="post-link">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-meta">
              {formatDate(post.created)} • <LikeButton />
            </p>
            <p className="post-excerpt">{post.excerpt}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogList;