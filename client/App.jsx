// Top-level 'App' component. This component and all its routes will have access to the Redux store
// All routing is performed in this file as well
import React from "react";
import "./styles.scss";

// Importing in 'BrowserRouter', 'Routes', and 'Route' to establish some React-Routing functionality from our 'App' component
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import in our Route Components
import SearchPage from "./Routes/SearchPage.jsx";
import ResultsPage from "./Routes/ResultsPage";
import Loading from "./Routes/Loading";
import Error from "./Routes/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*The home page of localhost:8080/ will be the 'SearchPage' Route*/}
        <Route
          path="/"
          element={<SearchPage />}
        />
        <Route
          path="/loading"
          element={<Loading />}
        />
        <Route
          path="/results"
          element={<ResultsPage />}
        />
        {/*Doing some Route Error-Handling here on the front-end*/}
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
