// This is the top level container of the Results page

import React from "react";
import SearchedIngredients from "../Components/SearchedIngredients";
import ResultsDisplay from "../Components/ResultsDisplay";

const ResultsPage = () => {
  return (
    <div className="results-page">
      {/* This component renders the Searched Ingredients component */}
      <div id="searched">
        <SearchedIngredients />
      </div>
      {/* This renders the Results Display component */}
      <div id="results">
        <ResultsDisplay />
      </div>
    </div>
  );
};

export default ResultsPage;
