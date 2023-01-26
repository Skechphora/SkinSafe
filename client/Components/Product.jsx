// This component lives inside the Results Display component. A Product component will be rendered for each returned result
import React from "react";

const Product = (props) => {
  // Utilizing prop-drilling here instead of leveraging 'useSelector' to grab stuff from state

  // deconstructs the properties to display from the product object
  const { brandName, imgSrc, productName, urlLink } = props;
  let { ingredients } = props;
  const fullLink = `https://www.sephora.com${urlLink}`;

  // sanitizing the ingredients information coming in from each product object
  // so that it is more readable on the front-end
  ingredients = ingredients.replaceAll(/[\{\}]/g,'').split(',');
  console.log(ingredients);
  
  // returns a product card with each relevant piece of information
  return (
    <div className="product">
      <img src= {imgSrc}></img>
      <h1><a href={fullLink}>{productName}</a></h1>
      <h2>by {brandName}</h2>
      <p> Ingredients: </p>
      <p>{ingredients}</p>
    </div>
    );
};
export default Product;
