import React from 'react';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store.js';
import { createRoot } from 'react-dom/client';
import './styles.scss';

const domNode = document.getElementById('main');
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);