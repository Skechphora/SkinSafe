// This is the top level container of the Results page

import React from "react";
import SearchedIngredients from "../Components/SearchedIngredients.jsx";
import ResultsDisplay from "../Components/ResultsDisplay.jsx";

const ResultsPage = () => {
  return (
    <div class="results-page">
      {/* This component renders the Searched Ingredients component */}
      <div>
        <SearchedIngredients />
      </div>
      {/* This renders the Results Display component */}
      <div>
        <ResultsDisplay />
      </div>
    </div>
  );
};

export default ResultsPage;
