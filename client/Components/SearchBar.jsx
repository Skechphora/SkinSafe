// This component lives on the search page and contains the search bar and submit button

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { update_allergens, fetchProductsByAllergen, update_results } from "../productsSlice";


const SearchBar = () => {
  // dispatch actions using RTK
  const dispatch = useDispatch();
  
  return (
    <div>
      {/* input field where user can type their allergen */}
      <input placeholder="What should we avoid?" 
        onChange={(e) => 
          /* update state on each key input */
          dispatch(update_allergens(e.target.value))}
      ></input>
      {/* associated submit button */}
      <button 
        onClick={(e) => {
          /* send fetch query with current data in state, and save response data to state */
          dispatch(fetchProductsByAllergen())
        }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
