// This is the top level container of the Results page
import React from "react";
import SearchedIngredients from "../Components/SearchedIngredients";
import ResultsDisplay from "../Components/ResultsDisplay";
import { useNavigate } from "react-router";

const ResultsPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <div className="results-page">
      {/* This component renders the Searched Ingredients component */}
      <div id="searched">
        <div id="searched-header">
          <h4>Searched Allergens: </h4>
        </div>
        <div id="searched-ingredients">
          <SearchedIngredients />
        </div>
        {/* Convenient button to return to home search page */}
        <button 
          id="return-to-home-button"
          onClick={e => { handleClick(); }}
        >Return to Home
        </button>
      </div>
      {/* This renders the Results Display component */}
      <div id="results">
          <ResultsDisplay />
      </div>
    </div>
  );
};

export default ResultsPage;
