// src/pages/Projects.jsx
// Projects and lab pieces, hung like pictures under a midday field. Entries
// are the Markdown files in src/content/projects.
import React from 'react';
import '../meadow/meadow.css';
import PageHeader from '../meadow/PageHeader.jsx';
import SiteFooter from '../meadow/SiteFooter.jsx';
import WorkCard from '../meadow/WorkCard.jsx';
import { PROJECTS } from '../lib/content.js';

const Projects = () => (
  <div className="oo">
    <PageHeader hour="day" />

    <main className="oo-page-main">
      <div className="oo-section-head">
        <h1 className="oo-page-title">Projects &amp; lab</h1>
        <p className="oo-aside">Being reworked from the ground up — new questions, fewer demos.</p>
      </div>

      {PROJECTS.length > 0 ? (
        <div className="oo-works">
          {PROJECTS.map((entry) => (
            <WorkCard key={entry.slug} entry={entry} />
          ))}
        </div>
      ) : (
        <p className="oo-empty" style={{ marginTop: 72 }}>
          The new work is being built. It will hang here when it is ready.
        </p>
      )}
    </main>

    <SiteFooter />
  </div>
);

export default Projects;
