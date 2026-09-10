// src/pages/ComingSoon.jsx
// Placeholder for every section that isn't ready. Same chrome as the home
// page, so the site reads as finished-but-sparse rather than broken.
import React from 'react';
import styled from 'styled-components';
import MinimalLayout from '../components/MinimalLayout.jsx';
import { minimalTokens as t, metaType, displayType, bodyType } from '../styles/theme.js';

const Label = styled.p`
  && {
    ${metaType}
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${t.accent};
    margin: 0 0 2.2em;
  }
`;

const Title = styled.h1`
  text-transform: none;
  margin: 0 0 0.35em;
  ${displayType}
  max-width: 20ch;
  color: ${t.text};
`;

const Note = styled.p`
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

const ComingSoon = ({ title = 'Not here yet', note }) => (
  <MinimalLayout>
    <Label>Coming soon</Label>
    <Title>{title}</Title>
    <Note>
      {note ||
        'Being written and rebuilt. I would rather publish this late than publish it thin.'}
    </Note>
    <Rule />
  </MinimalLayout>
);

export default ComingSoon;
