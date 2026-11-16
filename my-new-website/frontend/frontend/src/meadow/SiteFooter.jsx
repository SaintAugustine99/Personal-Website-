// src/meadow/SiteFooter.jsx
// Every meadow page ends at night, under the moon.
import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_EMAIL } from '../config/api.js';
import { LINKS } from '../content/site.js';

const SiteFooter = ({ onReplay }) => (
  <footer className="oo-footer" id="contact">
    <svg className="oo-footer-ridge" aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path
        d="M0,0 L1440,0 L1440,40 C1320,70 1180,30 1000,60 C820,90 660,40 460,70 C280,96 140,60 0,84 Z"
        fill="#EEE7D8"
      />
    </svg>
    <div className="oo-footer-moon" aria-hidden="true" />
    <div className="oo-footer-inner">
      <h2 className="oo-footer-title">Get in touch.</h2>
      <div className="oo-footer-row">
        <div>
          <p>Open to generalist roles, and to good questions.</p>
          <a className="oo-link on-dark oo-footer-mail" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
        <nav className="oo-footer-links" aria-label="Elsewhere">
          <Link className="oo-link on-dark" to="/contact">
            Send a message
          </Link>
          {LINKS.map(({ label, href }) => (
            <a key={href} className="oo-link on-dark" href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div className="oo-footer-base">
        <span>&copy; {new Date().getFullYear()} Onserio Ogeto, Nairobi</span>
        {onReplay ? (
          <button className="oo-replay" type="button" onClick={onReplay}>
            <svg aria-hidden="true" width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="5" cy="5" r="4" />
              <circle cx="17" cy="5" r="4" />
            </svg>
            Replay the opening
          </button>
        ) : (
          <Link className="oo-link on-dark" to="/">
            Back to the meadow
          </Link>
        )}
      </div>
    </div>
  </footer>
);

export default SiteFooter;
