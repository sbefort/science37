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
    padding 0 20px;
  }

  #root-container {
    max-width: 1200px;
    margin: auto;
    margin-top: 20px;
  }

  @media (max-width: 800px) {
    body {
      padding: 0;
      font-size: 0.9em;
    }

    header {
      padding: 0 1em;
    }
  }
`;
