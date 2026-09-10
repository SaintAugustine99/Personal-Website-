// src/pages/Contact.jsx
// The one section that is live besides home. Restyled into the minimal
// language of design_handoff_home_redesign.
//
// Delivery goes through Web3Forms, not the Django backend: there is no backend
// deployed, and the old code posted to http://127.0.0.1:8000. Set
// VITE_WEB3FORMS_KEY in Vercel; without it the form falls back to a mailto.
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MinimalLayout from '../components/MinimalLayout.jsx';
import { minimalTokens as t, metaType, displayType, bodyType } from '../styles/theme.js';
import { WEB3FORMS_KEY, CONTACT_EMAIL } from '../config/api.js';

const Title = styled.h1`
  text-transform: none;
  margin: 0 0 0.35em;
  ${displayType}
  max-width: 20ch;
  color: ${t.text};
`;

const Intro = styled.p`
  && {
    margin: 0 0 2.5em;
    max-width: 46ch;
    ${bodyType}
    color: ${t.textDim};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  /* ch resolves against the element's own font-size, so the form has to carry
     the same fluid size as the intro or the two 46ch columns diverge. */
  ${bodyType}
  max-width: 46ch;
  border-top: 1px solid ${t.rule};
`;

// Inputs are hairline rows, not boxes — the same rhythm as the home page list.
const fieldStyles = `
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(241, 239, 236, 0.12);
  border-radius: 0;
  padding: 0.9em 0;
  font: inherit;
  color: #f1efec;
  outline: none;

  &::placeholder {
    color: rgba(241, 239, 236, 0.42);
  }

  &:focus {
    border-bottom-color: #e0785e;
  }
`;

const Field = styled.input`${fieldStyles}`;

const Message = styled.textarea`
  ${fieldStyles}
  min-height: 120px;
  resize: vertical;
  line-height: 1.65;
`;

const Submit = styled.button`
  ${metaType}
  letter-spacing: 0.14em;
  text-transform: uppercase;
  align-self: flex-start;
  margin-top: 32px;
  padding: 12px 22px;
  background: transparent;
  color: ${t.text};
  border: 1px solid ${t.rule};
  border-radius: 0;
  cursor: pointer;
  font-family: inherit;
  transition: border-color ${({ theme }) => theme.transition},
    color ${({ theme }) => theme.transition};

  &:hover:not(:disabled) {
    color: ${t.accent};
    border-color: ${t.accent};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Status = styled.p`
  && {
    ${metaType}
    line-height: 1.6;
    margin: 24px 0 0;
    color: ${({ $error }) => ($error ? t.accent : t.textDim)};

    a {
      color: ${t.accent};
      font-weight: 400;
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [isBot, setIsBot] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { data } = await axios.post('https://api.web3forms.com/submit', {
        access_key: WEB3FORMS_KEY,
        botcheck: isBot,
        subject: `New message from ${formData.name} via onserioogeto.org`,
        from_name: 'onserioogeto.org',
        ...formData,
      });

      // Web3Forms answers 200 with { success: false } on a bad key, so the
      // flag is the thing to check, not the status code.
      if (!data.success) throw new Error(data.message || 'Submission rejected');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <MinimalLayout>
      <Title>Get in touch.</Title>
      <Intro>
        Research, collaboration, or something you think I should read. I answer
        everything that isn&rsquo;t a pitch.
      </Intro>

      <Form onSubmit={handleSubmit}>
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          onChange={(e) => setIsBot(e.target.checked)}
        />
        <Field
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Field
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Message
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Submit type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send'}
        </Submit>

        {status === 'success' && <Status>Sent. I&rsquo;ll get back to you.</Status>}
        {status === 'error' && (
          <Status $error>
            Something went wrong. Email me directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </Status>
        )}
      </Form>
    </MinimalLayout>
  );
};

export default Contact;
