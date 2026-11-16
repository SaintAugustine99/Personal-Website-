// src/pages/Home.jsx
// The meadow. The hero is the painting itself; on a first visit the sun and
// moon rise out of the flowers and settle into the name.
//
// Writing and Projects read from src/content/site.js. While those lists are
// empty the sections say so in a sentence rather than showing sample rows.
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../meadow/meadow.css';
import MeadowScene from '../meadow/MeadowScene.jsx';
import Wordmark from '../meadow/Wordmark.jsx';
import SiteNav from '../meadow/SiteNav.jsx';
import SiteFooter from '../meadow/SiteFooter.jsx';
import WritingRow from '../meadow/WritingRow.jsx';
import { CONTACT_EMAIL } from '../config/api.js';
import { WRITING, PROJECTS, PORTRAIT } from '../content/site.js';

const INTRO_KEY = 'oo-intro-seen';

// The opening plays once per browser session; after that the page arrives
// already settled. Storage can throw (private mode), in which case it plays.
const introSeen = () => {
  try {
    return Boolean(sessionStorage.getItem(INTRO_KEY));
  } catch {
    return false;
  }
};

const Home = () => {
  const [intro, setIntro] = useState(() => !introSeen());
  const { hash } = useLocation();

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* nothing to remember it in */
    }
  }, []);

  // "About" in the nav is /#about, including from other pages.
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
  }, [hash]);

  // Dropping the class for two frames restarts every CSS animation under it.
  const replay = useCallback(() => {
    window.scrollTo({ top: 0 });
    setIntro(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setIntro(true)));
  }, []);

  return (
    <div className={`oo${intro ? ' intro' : ''}`}>
      <header className="oo-hero">
        <MeadowScene />
        <div className="oo-bar rise">
          <span className="oo-hide-sm">Nairobi, Kenya</span>
          <SiteNav />
        </div>
        <Wordmark as="h1" />
        <div className="oo-hero-copy">
          <p className="oo-statement rise d1">
            Researcher, developer, artist. Currently on <em>AI governance.</em>
          </p>
          <div className="oo-hero-side rise d2">
            <p>
              Philosophy, the sciences and the arts — trained in law, software engineering and
              cybersecurity. Based in Nairobi.
            </p>
            <div className="oo-hero-links">
              <Link className="oo-link on-dark" to="/writing">
                Read my thinking
              </Link>
              <a className="oo-link on-dark" href={`mailto:${CONTACT_EMAIL}`}>
                Work with me
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="oo-section" id="writing">
        <div className="oo-section-head">
          <h2 className="oo-title">Writing &amp; papers</h2>
          <p className="oo-aside">
            Essays in progress. I would rather publish these late than publish them thin.
          </p>
        </div>
        {WRITING.length > 0 ? (
          <>
            <div className="oo-rows" style={{ marginTop: 56, borderTop: '1px solid var(--rule)' }}>
              {WRITING.slice(0, 4).map((piece) => (
                <WritingRow key={piece.title} {...piece} />
              ))}
            </div>
            <p style={{ marginTop: 28 }}>
              <Link className="oo-link" to="/writing">
                All writing
              </Link>
            </p>
          </>
        ) : (
          <p className="oo-empty">
            Nothing published yet.{' '}
            <Link className="oo-link" to="/writing" style={{ display: 'inline', minHeight: 0 }}>
              See what is being written.
            </Link>
          </p>
        )}
      </section>

      <section className="oo-section" id="projects" style={{ paddingTop: 0 }}>
        <div className="oo-section-head">
          <h2 className="oo-title">Projects &amp; lab</h2>
          <p className="oo-aside">Being reworked from the ground up — new questions, fewer demos.</p>
        </div>
        {PROJECTS.length > 0 ? (
          <div className="oo-works">
            {PROJECTS.map(({ title, meta, text, image, href, cta }) => (
              <article className="oo-work" key={title}>
                {image && (
                  <div className="oo-mat">
                    <div>
                      <img src={image} alt="" loading="lazy" />
                    </div>
                  </div>
                )}
                <h3 className="oo-work-title">
                  <em>{title}</em>
                </h3>
                {meta && <p className="oo-work-meta">{meta}</p>}
                {text && <p className="oo-work-text">{text}</p>}
                {href && (
                  <a className="oo-link" href={href} target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'flex-start' }}>
                    {cta || 'Open it'}
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="oo-empty">The new work is being built. It will hang here when it is ready.</p>
        )}
      </section>

      <section className="oo-about" id="about">
        {PORTRAIT && (
          <div className="oo-portrait">
            <img src={PORTRAIT} alt="Onserio Ogeto" />
          </div>
        )}
        <div className="oo-about-text">
          <h2 className="oo-about-lede">
            A multidisciplinary researcher, interested in philosophy, the sciences and the arts.
          </h2>
          <p style={{ marginTop: 8 }}>
            I have formal training in law, software engineering and cybersecurity. I use that
            background to find meaningful methods for abstracting and resolving problems that are
            unique to human beings — particularly for the subaltern, we former <em>Others</em>.
            Currently building competence in AI governance research.
          </p>
          <p>
            When I am not programming, experimenting, drawing, writing or reading, you can find me
            hiking, cycling, running or sleeping.
          </p>
          <p className="oo-tools" style={{ marginTop: 8 }}>
            Tools and disciplines: Python, Django, JavaScript, React, PostgreSQL, Docker,
            cybersecurity, AI governance, legal tech.
          </p>
        </div>
      </section>

      <SiteFooter onReplay={replay} />
    </div>
  );
};

export default Home;
