// src/pages/Writing.jsx
// The same meadow at dusk, mirrored, as a strip across the top. Lists come
// from src/content/site.js; with nothing published the page says so.
import React, { useState } from 'react';
import '../meadow/meadow.css';
import MeadowScene from '../meadow/MeadowScene.jsx';
import Wordmark from '../meadow/Wordmark.jsx';
import SiteNav from '../meadow/SiteNav.jsx';
import SiteFooter from '../meadow/SiteFooter.jsx';
import WritingRow from '../meadow/WritingRow.jsx';
import { WRITING, DRAFTS } from '../content/site.js';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'essay', label: 'Essays' },
  { id: 'paper', label: 'Papers' },
  { id: 'idea', label: 'Ideas' },
];

const Writing = () => {
  const [filter, setFilter] = useState('all');
  const published = WRITING.filter((p) => filter === 'all' || p.kind === filter);

  return (
    <div className="oo">
      <header className="oo-strip">
        <MeadowScene time="dusk" strip mirrored />
        <div className="oo-strip-shade" aria-hidden="true" />
        <div className="oo-bar">
          <Wordmark />
          <SiteNav />
        </div>
      </header>

      <main className="oo-page-main">
        <div className="oo-section-head">
          <h1 className="oo-page-title">Writing</h1>
          <p className="oo-aside">
            Essays in progress. I would rather publish these late than publish them thin.
          </p>
        </div>

        {DRAFTS.length > 0 && (
          <>
            <h2 className="oo-group" style={{ marginTop: 56 }}>In progress</h2>
            <div className="oo-rows">
              {DRAFTS.map((piece) => (
                <WritingRow key={piece.title} status="Drafting" {...piece} />
              ))}
            </div>
          </>
        )}

        {WRITING.length > 0 ? (
          <>
            <div className="oo-tabs" role="group" aria-label="Filter writing">
              {FILTERS.map(({ id, label }) => (
                <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>
                  {label}
                </button>
              ))}
            </div>
            <h2 className="oo-group">Published</h2>
            {published.length > 0 ? (
              <div className="oo-rows">
                {published.map((piece) => (
                  <WritingRow key={piece.title} {...piece} />
                ))}
              </div>
            ) : (
              <p className="oo-empty">Nothing of that kind yet.</p>
            )}
          </>
        ) : (
          <>
            <h2 className="oo-group" style={{ marginTop: 88 }}>Published</h2>
            <p className="oo-empty">Nothing here yet. The first essays are being written.</p>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
};

export default Writing;
