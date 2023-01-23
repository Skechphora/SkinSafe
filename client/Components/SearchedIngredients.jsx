// This component lives on the Results page and contains the list of allergens

import React from 'react';
import { useSelector } from 'react-redux';

const SearchedIngredients = () => {
  // grabs the alergens from state (set on each search in the SearchBar component)
  const allergens = useSelector((state) => state.products.allergens);
  // populates an array of one list item per allergen to render 
  const allergenList = [];
  for (let i = 0; i < allergens.length; i++) {
    allergenList.push(<li>{allergens[i]}</li>);
  }
  // render all alergens in unordered list
  return <ul>{[allergenList]}</ul>;
};

export default SearchedIngredients;
