// src/components/Navbar.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../config/navLinks';

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: ${({ theme }) => theme.colors.navBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color 0.4s ease, border-color 0.4s ease;
`;

const Logo = styled.a`
  font-size: 1.4rem;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  z-index: 102;
  position: relative;
  cursor: pointer;
  letter-spacing: -0.03em;
  
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

const StyledScrollLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 400;
  text-transform: uppercase;
  transition: color 0.3s ease;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.4rem 0.6rem;
  border-radius: 0; /* Square — brutalist */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  margin-left: 1rem;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryBg};
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
  z-index: 102;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 2rem;
    height: 2px; /* Thinner — brutalist */
    background: ${({ theme }) => theme.colors.text};
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

const MobileNavLink = styled.a`
  font-size: 2.5rem;
  font-weight: 800;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  margin: 1rem 0;
  transition: color 0.3s ease;
  cursor: pointer;
  letter-spacing: -0.03em;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileThemeToggle = styled(ThemeToggle)`
  margin: 2rem 0 0 0;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
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
      <Logo href="#home" onClick={closeMenu}>O<span>.</span>O</Logo>
      
      {/* Desktop Navigation */}
      <NavLinks>
        {NAV_ITEMS.map((item) => (
          <StyledScrollLink key={item.href} href={item.href}>
            {item.label}
          </StyledScrollLink>
        ))}

        <ThemeToggle onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? 'LIGHT' : 'DARK'}
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
            {NAV_ITEMS.map((item) => (
              <MobileNavLink key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </MobileNavLink>
            ))}

            <MobileThemeToggle onClick={() => { toggleTheme(); closeMenu(); }} aria-label="Toggle Theme">
               {isDarkMode ? 'LIGHT' : 'DARK'}
            </MobileThemeToggle>
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </NavWrapper>
  );
};

export default Navbar;