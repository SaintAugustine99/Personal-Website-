// src/meadow/NotHere.jsx
// For a slug that matches nothing: same page furniture, one honest sentence.
import React from 'react';
import { Link } from 'react-router-dom';
import './meadow.css';
import PageHeader from './PageHeader.jsx';
import SiteFooter from './SiteFooter.jsx';

const NotHere = ({ back = '/', backLabel = 'Back to the meadow' }) => (
  <div className="oo">
    <PageHeader hour="night" thin />
    <main className="oo-page-main">
      <h1 className="oo-page-title">Not here.</h1>
      <p className="oo-empty">
        Nothing lives at this address.{' '}
        <Link className="oo-link" to={back} style={{ display: 'inline', minHeight: 0 }}>
          {backLabel}.
        </Link>
      </p>
    </main>
    <SiteFooter />
  </div>
);

export default NotHere;
