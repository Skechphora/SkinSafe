/*
 * Here lives a collection of Redux logic and actions for the component features
 * author: Melody Duan, Stephen L.
 */
import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  // this slice of state will be accessible via two getState().products:
  name: 'products',
  initialState: {
    allergens: '',  // 1. getState().products.allergens
    results: [],    // 2. getState().products.results
  },
  // RTK allows us to write "mutating" logic in reducers; it doesn't actually mutate the state because it uses a library that detects changes to a 
  // "draft state", which produces a new immutable state based off those changes
  reducers: {
    // update the allergens in the state to prepare for a new search
    update_allergens: (state, action) => {
      state.allergens = action.payload;
    },
    // update the products in the state to render to the page
    update_results: (state, action) => {
      state.results = action.payload;
    },
  },
});

/* ========== Redux thunk middleware syntax =========== */
// the outside custom "thunk creator" function, dispatch this in a React component
export const fetchProductsByAllergen = () => {
  // the inside "thunk function"
  // note on useSelector vs getState: https://www.reddit.com/r/react/comments/jdbzme/what_is_the_difference_between_getstate_and/
  return (dispatch, getState) => {
    // retrieve our allergens property from our state which at this point,
    // should be an proper array after going through the 'restrictAllergenInputs' thunk creator
    const allergens = getState().products.allergens;

    // then use promise-chaining on a fetch API to resolve the response from the server, 
    // and to update the 'results' property in our state
    fetch('/api', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      // send a JSON object with the key-value pair of 'allergens'
      body: JSON.stringify({ allergens })
    })
      .then(response => response.json())
      .then(response => dispatch(update_results(response)))
      .catch(err => console.log(err));
    }
  }

// Dispatching 'restrictAllergenInputs' within the 'SearchBar' component to limit the number of
// allergen inputs to only 5 when the submit button is pressed.
// Performs all the string manipulation and filtering from the user input, resulting in the 
// 'allergens' property in our state to be an array with a maximum of 5 values
export const restrictAllergenInputs = () => {
  return (dispatch, getState) => {
    let allergens = getState().products.allergens;
    // Check to see if the user had not entered any allergens
    // if so, just update our 'allergens' property in our state to be an empty string
    if (!allergens.length) dispatch(update_allergens(''))
    // otherwise, we've some input, and we'll need to turn it into an array by splitting the commas,
    // and to handle any inputs less than 5 allergens by filling in the rest of the array with empty strings
    // to satisfy the DB query requirements
    else {
      allergens = allergens.replaceAll(' ','').split(',').slice(0,4);
      while (allergens.length < 5) {
        allergens.push('');
      }
      dispatch(update_allergens(allergens));
    }
  }
}

/** Redux Toolkit createAsyncThunk API syntax */
export const { update_allergens, update_results } = productsSlice.actions;

export default productsSlice.reducer;
