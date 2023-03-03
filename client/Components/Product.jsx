// This component lives inside the Results Display component. A Product component will be rendered for each returned result
import React from "react";

const Product = (props) => {
  // Utilizing prop-drilling here instead of leveraging 'useSelector' to grab stuff from state
  // deconstructs the properties to display from the product object
  const { imgSrc, productName, category, brandName, urlLink } = props;
  let { ingredients } = props;
  const fullLink = `https://www.sephora.com${urlLink}`;

  // sanitizing the ingredients information coming in from each product object
  // so that it is more readable on the front-end
  ingredients = ingredients.replaceAll(/[\{\}"]/g, "").toLowerCase();
  ingredients = ingredients.replaceAll(/[,]/g, ", ");

  // returns a product card with each relevant piece of information
  return (
    <div className="product-card">
      <div className="product-description">
        <img src={imgSrc} />
        <h2>
          <a
            href={fullLink}
            target="_blank"
          >
            {productName}
          </a>
        </h2>
        <p className="category">'{category}' by:</p>
        <h3>{brandName}</h3>
      </div>
      <div className="product-ingredients">
        <p> Ingredients: </p>
        <p>{ingredients}</p>
      </div>
    </div>
  );
};
export default Product;
