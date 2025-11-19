// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(10, 10, 10, 0.5); /* Semi-transparent */
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none; /* Hide on mobile for now */
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.text};
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

// The Toggle Button
const ThemeToggle = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryBg};
    transform: rotate(15deg);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <NavWrapper>
      <Logo to="/">OO<span>.</span></Logo>
      <NavLinks>
        <StyledNavLink to="/">Index</StyledNavLink>
        <StyledNavLink to="/about">About</StyledNavLink>
        <StyledNavLink to="/blog">Blog</StyledNavLink>
        <StyledNavLink to="/portfolio">Portfolio</StyledNavLink>
        <StyledNavLink to="/contact">Connect</StyledNavLink>
        
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeToggle>
      </NavLinks>
    </NavWrapper>
  );
};

export default Navbar;