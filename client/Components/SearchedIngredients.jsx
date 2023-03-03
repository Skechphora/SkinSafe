// This component lives on the Results page and contains the list of allergens
import React from "react";
import { useSelector } from "react-redux";

const SearchedIngredients = () => {
  // grabs the allergens from state (set on each search in the SearchBar component)
  let allergens = useSelector((state) => state.products.allergens);

  // populates an array of one list item per allergen to render
  const allergenList = [];
  for (let i = 0; i < allergens.length; i++) {
    allergenList.push(<p key={i}>* {allergens[i]}</p>);
  }
  // render all allergens in an unordered list
  return <>{allergenList}</>;
};

export default SearchedIngredients;
