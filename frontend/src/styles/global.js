import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    background: #f8f9f9;
    color: #334750;
    transition: all 0.25s linear;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1rem;
    padding 0 1rem;
  }

  #root {
    max-width: 1200px;
    margin: auto;
  }

  #grid {
    display: grid; 
    grid-template-columns: 5fr 2fr; 
    grid-template-rows: auto auto; 
    gap: 0 1rem; 
  }

  #search-box {
    grid-column: 1 / span 1;
    grid-row: 1;
    margin-bottom: 1.2rem;
  }

  #tweet-list {
    grid-column: 1 / span 1;
    grid-row: 2;
  }

  #hashtag-filter {
    grid-column: 2 / span 1;
    grid-row: 1 / span 2;
    margin-bottom: 1rem;
  }

  p {
    line-height: 170%;
    margin: 0 0 0.2rem 0;
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
      font-size: 0.9rem;
    }

    #grid {
      display: block; 
    }

    header,
    #search-box {
      padding: 0 1rem;
    }
  }
`;

export default GlobalStyles;
