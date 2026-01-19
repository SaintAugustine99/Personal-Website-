// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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
  background: ${({ theme }) => theme.colors.navBg}; 
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.4s ease, border-color 0.4s ease;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  z-index: 102; /* Ensure logo is above mobile menu overlay if needed */
  position: relative;
  
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

// Desktop Nav Links
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none; 
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  font-size: 0.95rem;

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.text};
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.accent};
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${({ theme }) => theme.colors.accent};
        border-radius: 2px;
    }
  }
`;

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

// Mobile Menu Toggle (Hamburger)
const MobileMenuToggle = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 102; /* Above the menu overlay */

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.colors.text};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

// Mobile Menu Overlay
const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.mainBg};
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const MobileNavLink = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  margin: 1.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileThemeToggle = styled(ThemeToggle)`
  margin: 2rem 0 0 0;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
`;

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <NavWrapper>
      <Logo to="/" onClick={closeMenu}>OO<span>.</span></Logo>
      
      {/* Desktop Navigation */}
      <NavLinks>
        <StyledNavLink to="/">Index</StyledNavLink>
        <StyledNavLink to="/about">About</StyledNavLink>
        <StyledNavLink to="/blog">Blog</StyledNavLink>
        <StyledNavLink to="/experiments">Lab</StyledNavLink>
        <StyledNavLink to="/portfolio">Portfolio</StyledNavLink>
        <StyledNavLink to="/contact">Connect</StyledNavLink>
        
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeToggle>
      </NavLinks>

      {/* Mobile Toggle */}
      <MobileMenuToggle open={isMobileMenuOpen} onClick={toggleMenu} aria-label="Toggle Menu">
        <span />
        <span />
        <span />
      </MobileMenuToggle>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink to="/" onClick={closeMenu}>Index</MobileNavLink>
            <MobileNavLink to="/about" onClick={closeMenu}>About</MobileNavLink>
            <MobileNavLink to="/blog" onClick={closeMenu}>Blog</MobileNavLink>
            <MobileNavLink to="/experiments" onClick={closeMenu}>Lab</MobileNavLink>
            <MobileNavLink to="/portfolio" onClick={closeMenu}>Portfolio</MobileNavLink>
            <MobileNavLink to="/contact" onClick={closeMenu}>Connect</MobileNavLink>
            
            <MobileThemeToggle onClick={() => { toggleTheme(); closeMenu(); }} aria-label="Toggle Theme">
               {isDarkMode ? '☀️' : '🌙'}
            </MobileThemeToggle>
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </NavWrapper>
  );
};

export default Navbar;