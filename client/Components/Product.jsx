// This component lives inside the Results Display component. A Product component will be rendered for each returned result

import React from "react";
import { useSelector } from 'react-redux';

const Product = (props) => {
  // deconstructs the id off the props object (assigned in ResultsDisplay)
  const { id } = props;
  // grabs the results of the DB query from state (set in products.slice)
  const productList = useSelector((state) => state.products.results);
  // grabs a single product with the relevant product ID
  const product = productList.find((el) => el.id === id);
  // deconstructs the properties to display from the product object
  const { brandName, productName, productImage, ingredients } = product;
  // returns a product card with each relevant piece of information
  return (
    <div className="product">
      <img src= {productImage}></img>
      <h1>{productName}</h1>
      <h2>{brandName}</h2>
      <body> Ingredients: {ingredients}</body>
    </div>
  );
};
export default Product;
