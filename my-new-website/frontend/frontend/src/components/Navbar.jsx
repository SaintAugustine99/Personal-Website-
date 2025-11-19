// Add this styled component for the toggle button
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
  margin-left: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryBg};
    transform: rotate(15deg);
  }
`;

// Update the Navbar component definition
const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <NavWrapper>
      <Logo to="/">OO<span>.</span></Logo>
      <NavLinks>
        <StyledNavLink to="/">Index</StyledNavLink>
        {/* ... other links ... */}
        <StyledNavLink to="/contact">Connect</StyledNavLink>
        
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle Theme">
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeToggle>
      </NavLinks>
    </NavWrapper>
  );
};