// This component lives on the search page and contains the search bar and submit button

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { update_allergens } from "../productsSlice";
import 

/* const postQuery = (dispatch) => {
  fetch 
}; */

const SearchBar = () => {
  // dispatch actions using RTK

  const dispatch = useDispatch();
  return (
    <div>
      {/* input field where user can type their allergen */}
      <input placeholder="What should we avoid?" 
        {/* update state on each key input */}
        onChange={(e) => dispatch(update_allergens(e.target.value))}
      ></input>
      {/* associated submit button */}
      <button onClick={(e) => {

        /* send fetch query with data in state */}}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
