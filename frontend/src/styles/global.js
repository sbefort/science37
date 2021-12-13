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

  #root{
    max-width: 1200px;
    margin: auto;
    padding: 20px 0 40px 0;
  }

  p {
    line-height: 170%;
    margin: 0 0 10px 0;
  }

  a,
  a:visited,
  a:hover {
    color: #367ab5;
    text-decoration: none;
  }

  @media (max-width: 800px) {
    html, body {
      padding: 0;
      font-size: 0.9em;
    }

    header {
      padding: 0 1em;
    }
  }
`;
