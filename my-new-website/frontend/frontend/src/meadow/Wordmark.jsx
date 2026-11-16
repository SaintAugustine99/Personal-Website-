// src/meadow/Wordmark.jsx
// "Onserio Ogeto" with the two O's painted as the sun and the moon. On the
// home page it is the h1 the opening animation resolves into; everywhere else
// it is the small link home.
import React from 'react';
import { Link } from 'react-router-dom';

const Letters = () => (
  <>
    <span aria-hidden="true">
      <span className="oo-orb sun" />
      <span className="oo-rest">nserio</span>
    </span>
    <span aria-hidden="true">
      <span className="oo-orb moon" />
      <span className="oo-rest">geto</span>
    </span>
  </>
);

const Wordmark = ({ as = 'link' }) =>
  as === 'h1' ? (
    <h1 className="oo-mark" aria-label="Onserio Ogeto">
      <Letters />
    </h1>
  ) : (
    <Link className="oo-mark" to="/" aria-label="Onserio Ogeto, home">
      <Letters />
    </Link>
  );

export default Wordmark;
