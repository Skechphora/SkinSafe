// This component lives on the Results page and contains the list of allergens
import React from 'react';
import { useSelector } from 'react-redux';

const SearchedIngredients = () => {
  // grabs the allergens from state (set on each search in the SearchBar component)
  let allergens = useSelector(state => state.products.allergens);

  allergens = allergens.replaceAll(' ', '')
  const allergenArray = allergens.split(',');

  // populates an array of one list item per allergen to render 
  const allergenList = [];
  for (let i = 0; i < allergenArray.length; i++) {
    allergenList.push(<li>{allergens[i]}</li>);
  }
  // render all allergens in an unordered list
  return (
    <ul>{allergenList}</ul>
  );
};

export default SearchedIngredients;
