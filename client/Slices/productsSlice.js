/*
 * Here lives a collection of Redux logic and actions for the component features
 * author: Melody Duan, Stephen L.
 */
import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  // this slice of state will be accessible via two getState().products:
  name: 'products',
  initialState: {
    allergens: [],  // 1. getState().products.allergens
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
  return async (dispatch, getState) => {
    // split the string of allergens separated by comma into an array of allergens
    const allergens = getState().products.allergens;

    // wait for fetch promise to resolve before asigning to response 
    const response = await fetch('/api', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ allergens }) // send a JSON object
    });

    // wait for response.json() promise to resolve before invoking dispatch 
    dispatch(update_results(await response.json()));
  }
}

// Dispatching 'restrictAllergenInputs' within the 'SearchBar' component to limit the number of
// allergen inputs to only 5 when the submit button is pressed.
// Performs all the string manipulation and filtering from the user input, resulting in the 
// 'allergens' property in our state to be an array with a maximum of 5 values
export const restrictAllergenInputs = () => {
  return (dispatch, getState) => {
    let allergens = getState().products.allergens;
    console.log(allergens);

    if (!allergens.length) dispatch(update_allergens([]))
    else {
      allergens = allergens.replaceAll(' ','').split(',').filter(ingredient => ingredient !== '').slice(0,5);
      dispatch(update_allergens(allergens));
    }
  }
}

/** Redux Toolkit createAsyncThunk API syntax */
export const { update_allergens, update_results } = productsSlice.actions;

export default productsSlice.reducer;
