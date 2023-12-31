import React from 'react';
import ReactDOM from 'react-dom/client';
import Client from './Client/Client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Client />
  </React.StrictMode>
);
