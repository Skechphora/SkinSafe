// This component lives inside the Results Display component. A Product component will be rendered for each returned result

import React from "react";
import { useSelector } from 'react-redux';

const Product = (props) => {
  // deconstructs the id off the props object (assigned in ResultsDisplay)
  const { id } = props;

  // grabs the results of the DB query from state (set in products.slice)
  const productList = useSelector((state) => state.products.results);

  console.log('productList: ', productList);

  // grabs a single product with the relevant product ID
  const product = productList.find((el) => el.id === id);

  // deconstructs the properties to display from the product object
  // const { brandName, productName, productImage, ingredients } = product;
  
  // returns a product card with each relevant piece of information
  return (
    // <div className="product">
    //   <img src= {productImage}></img>
    //   <h1>{productName}</h1>
    //   <h2>{brandName}</h2>
    //   <p> Ingredients: </p>
    //   <p>{ingredients}</p>
    // </div>
    <>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>The Dewy Skin Cream Plumping & Hydrating Moisturizer</h1>
        <h2>TATCHA</h2>
        <p> Ingredients:</p>
        <p>
            SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, 
        </p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>Protini™ Polypeptide Firming MoisturizerR</h1>
        <h2>PROTINI</h2>
        <p> Ingredients: </p>
        <p>
            SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, SO MANY DAMN INGREDIENTS, 
        </p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
      <div className="product">
        <img src="https://www.sephora.com/productimages/sku/s2181006-main-grid.jpg?pb=2020-03-sephora-clean-2019"></img>
        <h1>FENTY CONCEALER</h1>
        <h2>FENTY</h2>
        <p> Ingredients: SO MANY DAMN INGREDIENTS</p>
      </div>
    </>
    );
};
export default Product;
