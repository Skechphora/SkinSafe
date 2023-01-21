// This is the top level container of the Results page

import React from "react";
import SearchedIngredients from "../Components/SearchedIngredients";
import ResultsDisplay from "../Components/ResultsDisplay";

const ResultsPage = () => {
  return (
    <div>
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
