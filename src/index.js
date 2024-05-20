import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (
  typeof window !== 'undefined' &&
  typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object'
) {
  // Disable React DevTools
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
}
console.error = () => {};
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
