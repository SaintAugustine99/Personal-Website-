import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;

  &::before {
    content: '...';
    display: block;
    letter-spacing: 0.5em;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.violet};
    text-shadow: ${({ theme }) => theme.glowViolet};
    margin-bottom: 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      &copy; {new Date().getFullYear()} Onserio Ogeto :). All rights reserved.
    </FooterWrapper>
  );
};

export default Footer;