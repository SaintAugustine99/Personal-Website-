// src/pages/Project.jsx
// One project, read like a short essay: what it asks, what was built, what it
// taught. A lab piece with an `embed` runs in place, framed on its mat.
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../meadow/meadow.css';
import PageHeader from '../meadow/PageHeader.jsx';
import SiteFooter from '../meadow/SiteFooter.jsx';
import NotHere from '../meadow/NotHere.jsx';
import Markdown from '../lib/markdown.jsx';
import { findProject } from '../lib/content.js';
import { faces } from '../lib/frontmatter.js';

const Project = () => {
  const { slug } = useParams();
  const entry = findProject(slug);

  useEffect(() => {
    if (!entry) return undefined;
    const before = document.title;
    document.title = `${entry.title} — Onserio Ogeto`;
    window.scrollTo(0, 0);
    return () => {
      document.title = before;
    };
  }, [entry]);

  if (!entry) return <NotHere back="/projects" backLabel="All projects" />;

  const { kind, title, premise, year, stack, role, link, linkLabel, image, embed, hour, body } = entry;
  const facts = [
    year && ['Year', year],
    role && ['Role', role],
    stack && ['Made with', stack],
  ].filter(Boolean);

  return (
    <div className="oo">
      <PageHeader hour={hour || 'day'} mirrored={faces(slug)} thin />

      <main className="oo-reading">
        <article>
          <header className="oo-reading-head">
            <p className="oo-row-kind" style={{ flex: 'none' }}>
              <span className="oo-dab" aria-hidden="true" />
              {kind === 'lab' ? 'Lab' : 'Project'}
            </p>
            <h1 className="oo-reading-title">{title}</h1>
            {premise && <p className="oo-reading-premise">{premise}</p>}
          </header>

          {(embed || image) && (
            <div className="oo-hang">
              <div className="oo-mat">
                <div>
                  {embed ? (
                    <iframe src={embed} title={`${title}, running`} loading="lazy" />
                  ) : (
                    <img src={image} alt="" />
                  )}
                </div>
              </div>
              {embed && (
                <a className="oo-link" href={embed} target="_blank" rel="noopener noreferrer">
                  Open it full screen
                </a>
              )}
            </div>
          )}

          {(facts.length > 0 || link) && (
            <dl className="oo-facts">
              {facts.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              {link && (
                <div>
                  <dt>See it</dt>
                  <dd>
                    <a className="oo-link" href={link} target="_blank" rel="noopener noreferrer" style={{ minHeight: 0 }}>
                      {linkLabel || 'Open the live version'}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          )}

          <Markdown source={body} />

          <div className="oo-endmark" aria-hidden="true">
            <span className="oo-orb sun" />
            <span className="oo-orb moon" />
          </div>
        </article>

        <p className="oo-reading-back">
          <Link className="oo-link" to="/projects">
            All projects
          </Link>
        </p>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Project;
