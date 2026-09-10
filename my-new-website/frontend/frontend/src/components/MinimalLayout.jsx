// src/components/MinimalLayout.jsx
// Shared chrome for the redesigned site (design_handoff_home_redesign): the
// wordmark/nav bar, the page ground, and the footer row. Home, Contact and
// every coming-soon page render inside this so they read as one site.
//
// Type is Courier Prime via theme.fonts rather than the handoff's
// Newsreader/IBM Plex Mono — requested, and it keeps the site on one typeface.
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { minimalTokens as t, metaType } from '../styles/theme.js';

const NAV = [
  { label: 'Writing', to: '/writing' },
  { label: 'Projects', to: '/projects' },
];

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=Sg-hA64-yWs&t=1440s';

const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com/SaintAugustine99' },
  { label: 'X', href: 'https://x.com/OnserioOgeto' },
  { label: 'YouTube', href: YOUTUBE_URL },
].filter(({ href }) => href);

const Page = styled(motion.div)`
  background: ${t.bg};
  color: ${t.text};
  font-family: ${({ theme }) => theme.fonts.body};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Full bleed on purpose: the wordmark, the nav, the footer and the hairline
// all run to the edges of the viewport rather than sitting inside a centred
// column. Line length is held in check by the 20ch/46ch caps on the copy
// itself, so the text stays readable however wide the display gets.
const Inner = styled.div`
  width: 100%;
  padding: ${t.padY} ${t.padX};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  ${metaType}
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${t.meta};
`;

const Nav = styled.nav`
  display: flex;
  gap: clamp(14px, 1.7vw, 32px);

  a {
    color: inherit;
    /* GlobalStyles puts every anchor at weight 600 with a yellow hover. */
    font-weight: 400;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color ${({ theme }) => theme.transition};

    &:hover {
      color: ${t.text};
    }
  }

  /* NavLink sets aria-current itself, so the active rule needs no props. */
  a[aria-current='page'] {
    color: ${t.text};
    border-bottom-color: ${t.accent};
  }

  @media (max-width: 600px) {
    gap: 14px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4vh 0;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  ${metaType}
  letter-spacing: 0.1em;
  color: ${t.metaDim};
  padding-top: 4vh;

  a {
    color: inherit;
    font-weight: 400;
    text-decoration: none;

    &:hover {
      color: ${t.text};
    }
  }

  /* Side by side, both halves wrap mid-phrase on a phone. Stack instead. */
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.9em;
    line-height: 1.5;
  }
`;

const MinimalLayout = ({ children }) => (
  <Page initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <Inner>
      <TopBar>
        {/* The wordmark is the way home from every other page. */}
        <NavLink to="/" style={{ color: 'inherit', fontWeight: 400 }}>
          Onserio Ogeto
        </NavLink>
        <Nav>
          {NAV.map(({ label, to }) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </Nav>
      </TopBar>

      <Body>{children}</Body>

      <FooterRow>
        <span>&copy; 2026 Onserio Ogeto</span>
        <span>
          {FOOTER_LINKS.map(({ label, href }, i) => {
            const external = !href.startsWith('mailto:');
            return (
              <React.Fragment key={href}>
                {i > 0 && ' · '}
                <a
                  href={href}
                  {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  {label}
                </a>
              </React.Fragment>
            );
          })}
        </span>
      </FooterRow>
    </Inner>
  </Page>
);

export default MinimalLayout;
