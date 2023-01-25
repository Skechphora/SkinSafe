// This component lives on the search page and contains the search bar and submit button
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { update_allergens, fetchProductsByAllergen, update_results } from '../Slices/productsSlice';

const SearchBar = () => {
  // dispatch actions using RTK
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick= () => {
    navigate('/loading');
  }
  
  return (
    <div id="search-group">
      {/* input form where users can type in their allergen(s) */}
      <input 
        id="search-bar" 
        placeholder="What should we avoid?" 
        /* update state on each key input */
        onChange={e => dispatch(update_allergens(e.target.value))}
      />
      {/* associated submit button */}
      <div>
        <button 
          id="search-button"
          // send fetch query with current data in state, and save response data to state
          onClick={e => { 
            dispatch(fetchProductsByAllergen()); 
            handleClick();
          }}
        >Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;