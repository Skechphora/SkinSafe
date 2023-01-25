// Top-level 'App' component. This component and all its routes will have access to the Redux store
// All routing is performed in this file as well
import React from 'react';
import './styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error from './Routes/Error.jsx';
import SearchPage from "./Routes/SearchPage.jsx";
import ResultsPage from "./Routes/ResultsPage.jsx";


// We're going to use 'BrowserRouter', 'Routes', and 'Route' here 
// in place of 'createBrowserRouter' and 'RouterProvider'
// seems like they are functionally the same, but the 'BrowserRouter' and the 'Routes' & 'Route are easier to use
// and easier to visualize to make sense of
const App = props => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SearchPage />}/>
        <Route path='/results' element={<ResultsPage />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
