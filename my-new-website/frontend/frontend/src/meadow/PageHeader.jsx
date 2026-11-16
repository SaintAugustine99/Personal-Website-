// src/meadow/PageHeader.jsx
// The band of meadow across the top of every inner page. Each page chooses
// its own hour and which way the field faces, so the seated figure turns up
// somewhere different as you move through the site.
import React from 'react';
import MeadowScene from './MeadowScene.jsx';
import Wordmark from './Wordmark.jsx';
import SiteNav from './SiteNav.jsx';

const HOURS = ['dawn', 'day', 'dusk', 'night'];

const PageHeader = ({ hour = 'dusk', mirrored = false, thin = false }) => (
  <header className={`oo-strip${thin ? ' thin' : ''}`}>
    <MeadowScene time={HOURS.includes(hour) ? hour : 'dusk'} strip mirrored={mirrored} />
    <div className="oo-strip-shade" aria-hidden="true" />
    <div className="oo-bar">
      <Wordmark />
      <SiteNav />
    </div>
  </header>
);

export default PageHeader;
