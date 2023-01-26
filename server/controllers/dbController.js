//require models, connect with database
const pgSql = require('../models/pgSqlDatabase.js')

const dbControllers = {};

dbControllers.getAllProducts = (req, res, next) =>{
  console.log('getAllProducts')
// console.log('inside dbControllers.getAllProducts mw')
const product_query = `
SELECT products.* , brands.name AS brand_name, categories.category
FROM products 
LEFT JOIN brands ON products.brand_id = brands._id 
LEFT JOIN categories ON products.category_id = categories._id`
// product._id AS _id, brand_id, category_id, ingredients,hero_image, target_url 

pgSql.query(product_query)
// .then((data)=>data.json())
.then((data) => {
  res.locals.getAllProducts = data.rows;
  return next();
})
.catch((error) => {
    next({
      error : {
        log: `having error getting product from database : ${error}`,
        message: {error: 'An error ocurred here'}
      }
    });
  });
}

dbControllers.getAllIngredients = (req, res, next) =>{
  console.log('getAllIngredients')
// TODO: create object with 1 property for each product
  let returnObj = {};
  let allProducts = res.locals.getAllProducts;
//step 1: get all products
  allProducts.forEach((product) => {
    console.log('allProducts.forEach')
    returnObj[product['product_id']] = [];
  })
//step 2: make sql query to get all ingredients for each product
  const ingredient_query = 
  `SELECT * FROM products 
  LEFT JOIN product__ingredient 
  ON products.product_id = product__ingredient.product_id 
  LEFT JOIN ingredients 
  ON product__ingredient.ingredient_id = ingredients._id`
  // console.log('making ingredient query')
  pgSql.query(ingredient_query)
    .then((data) => { 
  //console.log(data.rows)
//step 3: populate the ingredient array in returnObj by matching the product id's with the keys of the returnObj
        console.log('entering data.rows.forEach',returnObj)
        data.rows.forEach((element) => {
        //console.log(returnObj[element['product_id']].length)
        if(!(returnObj[element['product_id']])){ console.log('FOUND THE PROBLEM',element)}

      if(element['product_id'])returnObj[element['product_id']].push(element.ingredient);
      })
      console.log('exiting data.rows.forEach')
      res.locals.productsWithIngredients = returnObj
      //console.log('we have made it here :/', returnObj)
      allProducts.forEach((product) => {
        //console.log('allproducts.forEach')
        product.ingredientArray = returnObj[product['product_id']];
      })
      //console.log('ALL PRODUCTS WITH INGREDIENTS', allProducts)
      return next();
    })
  .catch((error) => {
      next({
        error : {
          log: `having error getting product from database : ${error}`,
          message: {error: 'An error ocurred here'}
        }
      });
    });
}

dbControllers.getBadProducts = (req, res, next) => {
  console.log('getBadProducts')
  // Get all products containing undesired ingredients
  // store values from req.bod in an array
  // make query to ingredient list to return all products containing these ingredients
   const allergens = req.body.allergens;
  const query = "SELECT * FROM products LEFT JOIN product__ingredient ON products.product_id = product__ingredient.product_id LEFT JOIN ingredients ON product__ingredient.ingredient_id = ingredients._id WHERE ingredients.ingredient IN ($1,$2,$3,$4,$5)"
  // WHERE ingredient_list.ingredient IN ALLERGENS($1,$2,$3,$4,$5)
  pgSql.query(query, allergens)
  .then((data) => {
    res.locals.badProducts = data.rows
  return next();
})
}

dbControllers.filterOut = (req, res, next) => {
  console.log('filterOut')
// Requires list of bad products and list of all products
console.log('inside dbcontrollers.filterOut mwf')
const allProducts = res.locals.getAllProducts;
const badProducts = res.locals.badProducts;
// console.log('badProducts =', res.locals.badProducts)
// console.log('allProducts = ', res.locals.getAllProducts)
const goodProducts = []
for (const ele of allProducts) {

  let isBad = false;
  //for each element in bad products, check the sub product id
  //if subproduct id of product ele is found in a badproduct ele, continue
    for (const badEle of badProducts){
      if (badEle['product_id'] == ele['product_id']) isBad = true;
    }
    if (!isBad) goodProducts.push(ele)
  }
  res.locals.filteredProducts = goodProducts
  return next();
}

//TODO:
//Save query response in res.locals.getProduct. Also maybe format it.
//Get product information from database; - need to check the db next step



module.exports = dbControllers;