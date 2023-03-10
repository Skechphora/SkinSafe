// This is the top level container of the Results page
import React from "react";
import SearchedIngredients from "../Components/SearchedIngredients";
import ResultsDisplay from "../Components/ResultsDisplay";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { update_allergens, update_results } from "../Slices/productsSlice";
import FilterComponent from "../Components/FilterComponent";

const ResultsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    // onClick 'handleClick' function for 'return-to-home-button'
    // dispatched 'update_allergens' with an empty string to reset our state of allergens
    // dispatched 'update_results' with an empty array to reset our state of results
    // finally, navigate back to the landing page
    dispatch(update_allergens(""));
    dispatch(update_results([]));
    navigate("/");
  };

  return (
    <div className="results-page">
      {/* This part renders Searched Allergen Header, Searched Ingredients component, and a Return to Home Button */}
      <div id="searched-container">
        <div id="searched">
          <div id="searched-header">
            <h4>Searched Allergens: </h4>
          </div>
          <div id="searched-body-and-filter">
            <div id="searched-ingredients">
              <SearchedIngredients />
            </div>
            <div id="filter-options">
              <FilterComponent />
            </div>
          </div>
          <button
            id="return-to-home-button"
            onClick={() => {
              handleClick();
            }}
          >
            Return to Home
          </button>
        </div>
      </div>
      {/* This part renders the Results Display component(s) */}
      <ResultsDisplay />
    </div>
  );
};

export default ResultsPage;
