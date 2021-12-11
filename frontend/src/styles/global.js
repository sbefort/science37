import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1rem;
  }

  #root-container {
    max-width: 1200px;
    margin: auto;
    margin-top: 20px;
  }

  @media (max-width: 800px) {
    body {
      font-size: 0.9rem;
    }
  }
`;
