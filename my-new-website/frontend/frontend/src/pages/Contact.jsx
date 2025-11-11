import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, Input, TextArea } from '../components/common';

const API_URL = "http://127.0.0.1:8000"; // Django backend

const ContactContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  
  h1 {
    font-size: 3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.violet};
    text-shadow: ${({ theme }) => theme.glowViolet};
    margin-bottom: 2rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormMessage = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${({ theme, type }) => type === 'success' ? theme.colors.teal : theme.colors.violet};
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Note: Django config/urls.py must have a path for '/api/contact/'
    // You will need to create this view and URL in Django.
    axios.post(`${API_URL}/api/contact/`, formData)
      .then(response => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        setStatus('error');
      });
  };

  return (
    <ContactContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Get in Touch</h1>
      <StyledForm onSubmit={handleSubmit}>
        <Input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name}
          onChange={handleChange}
          required 
        />
        <Input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <TextArea 
          name="message" 
          placeholder="Your Message" 
          value={formData.message}
          onChange={handleChange}
          required 
        />
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>
        
        {status === 'success' && (
          <FormMessage type="success">Message sent! I'll get back to you soon.</FormMessage>
        )}
        {status === 'error' && (
          <FormMessage type="error">Something went wrong. Please try again.</FormMessage>
        )}
      </StyledForm>
    </ContactContainer>
  );
};

export default Contact;