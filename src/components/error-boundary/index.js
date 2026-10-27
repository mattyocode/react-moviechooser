import React from "react";

import { Wrapper, Title, Text, HomeLink } from "./styles/error-boundary";

// Keeps a render error in one page from blanking the whole app (navbar included).
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    // Clear the error when the user navigates elsewhere.
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper data-testid="error-boundary" role="alert">
          <Title>Something went wrong</Title>
          <Text>We couldn't load this page. Please try again.</Text>
          <HomeLink href="/">Back to MOVIECHOOSER</HomeLink>
        </Wrapper>
      );
    }
    return this.props.children;
  }
}
