// src/pages/Writing.jsx
// The index of everything written: the meadow at dusk across the top, one
// featured piece if there is one, work in progress, then the archive by year.
// Entries are the Markdown files in src/content/writing.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../meadow/meadow.css';
import PageHeader from '../meadow/PageHeader.jsx';
import SiteFooter from '../meadow/SiteFooter.jsx';
import WritingRow from '../meadow/WritingRow.jsx';
import { WRITING, DRAFTS } from '../lib/content.js';
import { byYear } from '../lib/frontmatter.js';
import { KIND_LABEL } from '../content/site.js';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'essay', label: 'Essays' },
  { id: 'paper', label: 'Papers' },
  { id: 'idea', label: 'Ideas' },
];

const Writing = () => {
  const [filter, setFilter] = useState('all');
  const featured = WRITING.find((e) => e.featured);
  const shown = WRITING.filter((e) => filter === 'all' || (e.kind || 'essay') === filter);
  // Only offer filters for kinds that exist.
  const kinds = new Set(WRITING.map((e) => e.kind || 'essay'));
  const filters = FILTERS.filter(({ id }) => id === 'all' || kinds.has(id));

  return (
    <div className="oo">
      <PageHeader hour="dusk" mirrored />

      <main className="oo-page-main">
        <div className="oo-section-head">
          <h1 className="oo-page-title">Writing</h1>
          <p className="oo-aside">
            Essays in progress. I would rather publish these late than publish them thin.
          </p>
        </div>

        {featured && (
          <Link className="oo-feature" to={`/writing/${featured.slug}`}>
            <span className="oo-row-kind">
              <span className={`oo-dab ${featured.kind || 'essay'}`} aria-hidden="true" />
              {KIND_LABEL[featured.kind] || 'Essay'}, {featured.dateLabel}
            </span>
            <span className="oo-feature-title">{featured.title}</span>
            {featured.premise && <span className="oo-feature-premise">{featured.premise}</span>}
          </Link>
        )}

        {DRAFTS.length > 0 && (
          <>
            <h2 className="oo-group" style={{ marginTop: 72 }}>In progress</h2>
            <div className="oo-rows">
              {DRAFTS.map((entry) => (
                <WritingRow key={entry.slug} entry={entry} draft />
              ))}
            </div>
          </>
        )}

        {WRITING.length > 0 ? (
          <>
            {filters.length > 2 && (
              <div className="oo-tabs" role="group" aria-label="Filter writing">
                {filters.map(({ id, label }) => (
                  <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>
                    {label}
                  </button>
                ))}
              </div>
            )}
            {byYear(shown).map(({ year, items }) => (
              <React.Fragment key={year}>
                <h2 className="oo-group" style={{ marginTop: 56 }}>{year}</h2>
                <div className="oo-rows">
                  {items.map((entry) => (
                    <WritingRow key={entry.slug} entry={entry} />
                  ))}
                </div>
              </React.Fragment>
            ))}
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
