// This is the top level container of the Results page
import React from "react";
import SearchedIngredients from "../Components/SearchedIngredients";
import ResultsDisplay from "../Components/ResultsDisplay";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { update_allergens } from '../Slices/productsSlice';

const ResultsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(update_allergens(''));
    navigate('/');
  }

  return (
    <div className="results-page">
      {/* This component renders the Searched Allergen Header, Searched Ingredients component, and a Return to Home Button */}
       <div id="searched-container"> 
        <div id="searched">
          <div id="searched-header">
            <h4>Searched Allergens: </h4>
          </div>
          <div id="searched-ingredients">
            <SearchedIngredients />
          </div>
          <button 
            id="return-to-home-button"
            onClick={() => { handleClick(); }}
          >Return to Home
          </button>
        </div>
      </div>
      {/* This renders the Results Display component(s) */}
      <ResultsDisplay />
    </div>
  );
};

export default ResultsPage;
