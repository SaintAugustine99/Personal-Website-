// src/pages/Home.jsx
// Landing page — implements design_handoff_home_redesign, minus the highlight
// list. The handoff specifies three rows (two essays and Jamii), but none of
// that content exists yet and it should not ship as links to nothing. The
// hairline above the footer is what remains of that block; restore the rows
// from the handoff once there is writing behind them.
import React from 'react';
import styled from 'styled-components';
import MinimalLayout from '../components/MinimalLayout.jsx';
import { minimalTokens as t, displayType, bodyType } from '../styles/theme.js';

const Headline = styled.h1`
  /* GlobalStyles sets h1 uppercase at weight 800 — the brutalist treatment
     this design replaces. Each inherited value has to be named to undo it. */
  text-transform: none;
  margin: 0 0 0.5em;
  ${displayType}
  max-width: 20ch;
  color: ${t.text};
`;

const Subhead = styled.p`
  && {
    margin: 0;
    max-width: 46ch;
    ${bodyType}
    color: ${t.textDim};
  }
`;

const Rule = styled.div`
  border-top: 1px solid ${t.rule};
  margin-top: 6vh;
`;

const Home = () => (
  <MinimalLayout>
    <Headline>Researcher, developer, artist. Currently on AI governance.</Headline>
    <Subhead>
      Philosophy, the sciences and the arts — trained in law, software engineering
      and cybersecurity. Based in Nairobi.
    </Subhead>
    <Rule />
  </MinimalLayout>
);

export default Home;
