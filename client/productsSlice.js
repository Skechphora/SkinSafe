/* 
 * Here lives a collection of Redux logic and actions for the component features
 * author: Melody Duan
 */

import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allergens: [],
    results: [],
  },
  // RTK allows us to write "mutating" logic in reducers; it doesn't actually mutate the state because it uses a library that detects changes to a "draft state" which produces a new immutable state based off those changes
  reducers: {
    // update the allergens in the state to prepare for a new search
    update_allergens: (state, action) => {
      state.allergens = action.payload;
    },
    // update the products in the state to render to the page
    update_results: (state, action) => {
      state.results = action.payload;
    }
  }
})

export const { update_allergens, update_products } = productsSlice.actions;

export default productsSlice.reducer;
