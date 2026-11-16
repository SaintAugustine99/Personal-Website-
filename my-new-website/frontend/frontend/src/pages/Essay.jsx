// src/pages/Essay.jsx
// One piece of writing. The meadow shrinks to a thin band so the text is the
// subject; the essay's `hour` decides the sky above it.
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../meadow/meadow.css';
import PageHeader from '../meadow/PageHeader.jsx';
import SiteFooter from '../meadow/SiteFooter.jsx';
import NotHere from '../meadow/NotHere.jsx';
import Markdown from '../lib/markdown.jsx';
import { findWriting } from '../lib/content.js';
import { faces } from '../lib/frontmatter.js';
import { KIND_LABEL } from '../content/site.js';

const Essay = () => {
  const { slug } = useParams();
  const entry = findWriting(slug);

  useEffect(() => {
    if (!entry) return undefined;
    const before = document.title;
    document.title = `${entry.title} — Onserio Ogeto`;
    window.scrollTo(0, 0);
    return () => {
      document.title = before;
    };
  }, [entry]);

  if (!entry) return <NotHere back="/writing" backLabel="All writing" />;

  const { kind = 'essay', title, premise, dateLabel, hour, venue, authors, pdf, body } = entry;
  const facts = [
    venue && ['Published in', venue],
    authors && ['Authors', authors],
  ].filter(Boolean);

  return (
    <div className="oo">
      <PageHeader hour={hour || 'dusk'} mirrored={faces(slug)} thin />

      <main className="oo-reading">
        <article>
          <header className="oo-reading-head">
            <p className="oo-row-kind" style={{ flex: 'none' }}>
              <span className={`oo-dab ${kind}`} aria-hidden="true" />
              {KIND_LABEL[kind] || kind}
              {dateLabel ? `, ${dateLabel}` : ''}
            </p>
            <h1 className="oo-reading-title">{title}</h1>
            {premise && <p className="oo-reading-premise">{premise}</p>}
            {(facts.length > 0 || pdf) && (
              <dl className="oo-facts">
                {facts.map(([term, value]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                {pdf && (
                  <div>
                    <dt>Read</dt>
                    <dd>
                      <a className="oo-link" href={pdf} target="_blank" rel="noopener noreferrer" style={{ minHeight: 0 }}>
                        PDF
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </header>

          <Markdown source={body} />

          <div className="oo-endmark" aria-hidden="true">
            <span className="oo-orb sun" />
            <span className="oo-orb moon" />
          </div>
        </article>

        <p className="oo-reading-back">
          <Link className="oo-link" to="/writing">
            All writing
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Essay;
