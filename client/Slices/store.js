/* 
 * Creates the Redux store instance 
 * author: Melody Duan
 */
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'

// create redux store using the configureStore function from the Redux Toolkit
export default configureStore({
  // pass in reducer argument
  reducer: { 
    // key names here will define the properties in the Redux state
    // each property is a separate "slice" of the Redux state
    products: productsReducer
  }
})