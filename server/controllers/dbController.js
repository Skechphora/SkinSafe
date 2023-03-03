//require models, connect with database
const pgSql = require("../models/pgSqlDatabase.js");

const dbControllers = {};

dbControllers.getAllProducts = (req, res, next) => {
  const product_query = `
    SELECT products.* , brands.name AS brand_name, categories.category
    FROM products 
    LEFT JOIN brands ON products.brand_id = brands._id 
    LEFT JOIN categories ON products.category_id = categories._id`;

  pgSql
    .query(product_query)
    .then((data) => {
      res.locals.getAllProducts = data.rows;
      return next();
    })
    .catch((error) => {
      next({
        error: {
          log: `Error getting product from database : ${error}`,
          message: { error: "An error ocurred here" },
        },
      });
    });
};

dbControllers.getAllIngredients = (req, res, next) => {
  // TODO: create object with 1 property for each product
  let returnObj = {};
  let allProducts = res.locals.getAllProducts;
  // Step 1: get all products
  allProducts.forEach((product) => {
    returnObj[product["product_id"]] = [];
  });
  // Step 2: make sql query to get all ingredients for each product
  const ingredient_query = `
    SELECT * FROM products 
    LEFT JOIN product__ingredient 
    ON products.product_id = product__ingredient.product_id 
    LEFT JOIN ingredients 
    ON product__ingredient.ingredient_id = ingredients._id`;

  pgSql
    .query(ingredient_query)
    .then((data) => {
      // Step 3: populate the ingredient array in returnObj by matching the product id's with the keys of the returnObj
      data.rows.forEach((element) => {
        if (!returnObj[element["product_id"]]) {
          console.log("FOUND THE PROBLEM", element);
        }

        if (element["product_id"])
          returnObj[element["product_id"]].push(element.ingredient);
      });
      res.locals.productsWithIngredients = returnObj;
      allProducts.forEach((product) => {
        product.ingredientArray = returnObj[product["product_id"]];
      });
      return next();
    })
    .catch((error) => {
      next({
        error: {
          log: `Error getting product from database : ${error}`,
          message: { error: "An error ocurred here" },
        },
      });
    });
};

dbControllers.getBadProducts = (req, res, next) => {
  // Get all products containing undesired ingredients
  // store values from req.bod in an array
  // make query to ingredient list to return all products containing these ingredients
  const allergens = req.body.allergens;
  const query = `
    SELECT * FROM products 
    LEFT JOIN product__ingredient ON products.product_id = product__ingredient.product_id 
    LEFT JOIN ingredients ON product__ingredient.ingredient_id = ingredients._id 
    WHERE ingredients.ingredient IN ($1,$2,$3,$4,$5)`;

  pgSql.query(query, allergens).then((data) => {
    res.locals.badProducts = data.rows;
    return next();
  });
};

dbControllers.filterOut = (req, res, next) => {
  // Requires list of bad products and list of all products
  const allProducts = res.locals.getAllProducts;
  const badProducts = res.locals.badProducts;

  const goodProducts = [];
  for (const ele of allProducts) {
    let isBad = false;
    // for each element in bad products, check the sub product id
    // if subproduct id of product ele is found in a badproduct ele, continue
    for (const badEle of badProducts) {
      if (badEle["product_id"] == ele["product_id"]) isBad = true;
    }
    if (!isBad) goodProducts.push(ele);
  }
  res.locals.filteredProducts = goodProducts;
  return next();
};

//TODO:
//Save query response in res.locals.getProduct. Also maybe format it.
//Get product information from database; - need to check the db next step

module.exports = dbControllers;
