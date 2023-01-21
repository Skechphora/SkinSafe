// This is our highest level, our App page. It renders containers based on the requested route

import React from "react";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./Containers/SearchPage.jsx";
import ResultsPage from "./Containers/ResultsPage.jsx";

import "./stylesheets/styles.css";

const App = (props) => {
  return (
    <div>
      <main>
        {/* Here we declare our react routers */}
        <Switch>
          {/* This route, to '/main', renders the SearchPage container */}
          <Route exact path="/main" component={SearchPage} />
          {/* This route, to '/results', renders the SearchPage container */}
          <Route exact path="/results" component={ResultsPage} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
