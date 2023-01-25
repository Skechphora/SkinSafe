// This component lives on the search page and contains the search bar and submit button
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { update_allergens, fetchProductsByAllergen, restrictAllergenInputs, update_results } from '../Slices/productsSlice';

const SearchBar = () => {
  // dispatch actions using RTK
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div id="search-group">
      {/* input form where users can type in their allergen(s) */}
      <input 
        id="search-bar" 
        placeholder="What should we avoid?" 
        /* update state on each key input */
        onChange={e => dispatch(update_allergens(e.target.value))}
      />
      <h5>Please enter in a maximum of 5 allergens, separated by commas</h5>
      <h6>Ex: Latex, Benzyl alcohol, Magnesium Sulfate, Aluminum Hydroxide, Silica</h6>
      {/* associated submit button */}
      <div>
        <button 
          id="search-button"
          // on click for the search button:
          // we'll restrict the input data to only 5 allergens via the 'restrictAllergenInputs' 'thunk creator'
          // then, we'll dispatch the 'fetchProductsByAllergen' 'thunk creator' to send the list of allergens to our
          // server, and wait for a list of product responses back
          // finally, navigate to the 'loading' page
          onClick={() => { 
            dispatch(restrictAllergenInputs());
            dispatch(fetchProductsByAllergen()); 
            navigate('/loading');
          }}
        >Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;