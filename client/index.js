import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './styles.scss';
import App from './Routes/App (Root).jsx';
import store from './store.js';
import Error from './Routes/Error.jsx';
import SearchPage from "./Routes/SearchPage.jsx";
import ResultsPage from "./Routes/ResultsPage.jsx";

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: '/main',
    element: <SearchPage />,
  },
  {
    path: '/results',
    element: <ResultsPage />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
