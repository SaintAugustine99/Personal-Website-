import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub, FaYoutube, FaTwitter } from 'react-icons/fa';

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  background: rgba(11, 12, 16, 0.6);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBg};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease, text-shadow 0.3s ease;

  span {
    color: ${({ theme }) => theme.colors.teal};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.teal};
    text-shadow: ${({ theme }) => theme.glow};
  }
`;

// This new wrapper will hold both navigation and social links
const NavRightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem; // Space between nav links and social icons
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.teal};
    text-shadow: ${({ theme }) => theme.glow};
  }

  &.active {
    color: ${({ theme }) => theme.colors.teal};
  }
`;

// New component for social icons
const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

// New component for a single social icon link
const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.25rem; // Make icons a bit bigger
  transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.violet};
    transform: scale(1.1);
    text-shadow: ${({ theme }) => theme.glowViolet};
  }
`;


const Navbar = () => {
  return (
    <NavWrapper>
      <NavContainer>
        <Logo to="/">
          Onserio Ogeto<span>.</span>
        </Logo>
        
        <NavRightWrapper>
          <NavLinks>
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/blog">Blog</StyledNavLink>
            <StyledNavLink to="/portfolio">Portfolio</StyledNavLink> {/* <-- ADDED */}
            <StyledNavLink to="/contact">Contact</StyledNavLink>
          </NavLinks>

          <SocialLinks>
            <SocialLink href="https://github.com/saintaugustine99" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
          </SocialLinks>
        </NavRightWrapper>

      </NavContainer>
    </NavWrapper>
  );
};

export default Navbar;