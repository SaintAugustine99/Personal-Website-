// src/pages/Holding.jsx
// Full-screen holding page. Nothing else on the site is reachable while
// HOLDING_MODE is on in App.jsx — this is the entire surface.
import React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

// EMAIL is the one way through the holding page. The contact form lives on
// the site proper, which is gated off while HOLDING_MODE is on, so without
// this there is no way to reach me at all.
const LINKS = [
  { label: 'EMAIL', href: 'mailto:kevinogetobwoma@gmail.com' },
  { label: 'X', href: 'https://x.com/OnserioOgeto' },
  { label: 'GITHUB', href: 'https://github.com/SaintAugustine99' },
];

// The site scrolls; the holding page must not.
const LockScroll = createGlobalStyle`
  html, body {
    overflow: hidden;
    height: 100%;
    background: ${({ theme }) => theme.colors.darkBg};
  }
`;

const Screen = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.darkBg};
  color: ${({ theme }) => theme.colors.accent};
  padding: 4rem 3rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`;

const blink = keyframes`
  50% { opacity: 0; }
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: clamp(3rem, 12vw, 9rem);
  line-height: 0.85;
  letter-spacing: -0.06em;
  color: ${({ theme }) => theme.colors.accent};

  /* The dot is the one non-yellow mark on the page. */
  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Rule = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.accent};
  opacity: 0.35;
  margin: 2.5rem 0;
`;

const Status = styled.p`
  && {
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.accent};
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 0.75rem;
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }
`;

const Message = styled.h1`
  color: ${({ theme }) => theme.colors.accent};
  font-size: clamp(1.75rem, 5.5vw, 4rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  max-width: 20ch;
  margin-bottom: 2rem;

  &::after {
    content: '_';
    animation: ${blink} 1s step-end infinite;
    margin-left: 0.1em;
  }
`;

const Detail = styled.p`
  && {
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.65;
    font-size: 0.95rem;
    max-width: 46ch;
    margin-bottom: 0;
  }
`;

const Links = styled.nav`
  display: flex;
  gap: 2rem;
  margin-top: auto;
  padding-top: 3rem;

  a {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.65;
    border-bottom: 1px solid transparent;
    transition: opacity 0.3s ease, border-color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      opacity: 1;
      border-bottom-color: ${({ theme }) => theme.colors.accent};
    }
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const Reveal = styled(motion.div)``;

const Top = styled.div`
  margin-top: auto;
`;

const Bottom = styled(motion.div)`
  margin-top: auto;
`;

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Holding = () => (
  <Screen>
    <LockScroll />

    <Top>
      <Reveal variants={fade} custom={0} initial="hidden" animate="show">
        <Logo>O<span>.</span>O</Logo>
      </Reveal>

      <Reveal variants={fade} custom={1} initial="hidden" animate="show">
        <Rule />
      </Reveal>

      <Reveal variants={fade} custom={2} initial="hidden" animate="show">
        <Status>Status: Molting</Status>
        <Message>This site is shedding its old skin</Message>
        <Detail>
          Rebuilding in public. Loose wires, half-finished thoughts,
          no hard hats. Back when it&rsquo;s worth your time.
        </Detail>
      </Reveal>
    </Top>

    <Bottom variants={fade} custom={3} initial="hidden" animate="show">
      <Links>
        {LINKS.map(({ label, href }) => {
          const external = !href.startsWith('mailto:');
          return (
            <a
              key={href}
              href={href}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {label}
            </a>
          );
        })}
      </Links>
    </Bottom>
  </Screen>
);

export default Holding;
