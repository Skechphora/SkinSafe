// This component lives inside the Results Display component. A Product component will be rendered for each returned result

import React from "react";
import { useSelector } from 'react-redux';

const Product = (props) => {
  // // deconstructs the id off the props object (assigned in ResultsDisplay)
  // const { id } = props;

  // // grabs the results of the DB query from state (set in products.slice)
  // const productList = useSelector((state) => state.products.results);

  // console.log('productList: ', productList);

  // // grabs a single product with the relevant product ID
  // const product = productList.find((el) => el.id === id);

  // deconstructs the properties to display from the product object
  const { brandId, imgSrc, productName, urlLink } = props;
  let { ingredients } = props;
  const fullLink = `https://www.sephora.com${urlLink}`;

  // sanitizing the ingredients information coming in from each product object
  // so that it is more readable on the front-end
  ingredients = ingredients.replaceAll(/[\{\}]/g,'');
  console.log(ingredients);
  
  // returns a product card with each relevant piece of information
  return (
    <div className="product">
      <img src= {imgSrc}></img>
      <h1><a href={fullLink}>{productName}</a></h1>
      <h2>by {brandId}</h2>
      <p> Ingredients: </p>
      <p>{ingredients}</p>
    </div>
    );
};
export default Product;
