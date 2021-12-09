import React from 'react';
import ReactDOM from 'react-dom';

// "Normalize.css makes browsers render all elements more consistently and in line with modern standards.
// It precisely targets only the styles that need normalizing."
import '../node_modules/normalize.css/normalize.css';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
