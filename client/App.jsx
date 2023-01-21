// This is our highest level, our App page. It renders containers based on the requested route

import React from "react";
import { Router, Route } from "react-router";
import SearchPage from "./Containers/SearchPage.jsx";
import ResultsPage from "./Containers/ResultsPage.jsx";

import "./styles.scss";

const App = (props) => {
  return (
    <div>
      <main>
        {/* Here we declare our react routers */}
        <Router>
          {/* This route, to '/main', renders the SearchPage container */}
          <Route exact path="/main" component={SearchPage} />
          {/* This route, to '/results', renders the SearchPage container */}
          <Route exact path="/results" component={ResultsPage} />
        </Router>
      </main>
    </div>
  );
};

export default App;
