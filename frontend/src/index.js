import React from 'react';
import ReactDOM from 'react-dom';
import { TwitterProvider } from './context/twitterContext';

// "Normalize.css makes browsers render all elements more consistently and in line with modern standards.
// It precisely targets only the styles that need normalizing."
import 'normalize.css';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <TwitterProvider>
      <App />
    </TwitterProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
