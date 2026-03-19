import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.teal};
  color: ${({ theme }) => theme.colors.mainBg};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  margin-top: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <p>We encountered an unexpected error.</p>
          <RetryButton onClick={this.handleRetry}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
