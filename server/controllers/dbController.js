//require models, connect with database
const pgSql = require('../models/pgSqlDatabase.js')

const dbControllers = {};




dbControllers.getAllProducts = (req, res, next) =>{
console.log('inside dbControllers.getAllProducts mw')
const product_query = 'SELECT * from sub_product'
pgSql.query(product_query)
// .then((data)=>data.json())
.then((data) => {
  console.log('select all products ' , data.rows);
  res.locals.getAllProducts = data.rows;
  next();
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
// TODO: create object with 1 property for each product
let returnObj = {};
//step 1: get all products
res.locals.getAllProducts.forEach((product) => {
  returnObj[product['sub_product_id']] = [];
})
console.log(returnObj);
//step 2: make sql query to get all ingredients for each product
const ingredient_query = 'SELECT * FROM sub_product LEFT JOIN product_ingredient ON sub_product.sub_product_id = product_ingredient.sub_product_id LEFT JOIN ingredient_list ON product_ingredient.ingredient_id = ingredient_list._id'

pgSql.query(ingredient_query)
.then((data) => {
  console.log("query executing?")
  console.log(data.rows)
//step 3: populate the ingredient array in returnObj by matching the product id's with the keys of the returnObj
data.rows.forEach((element) => {
  returnObj[element['sub_product_id']].push(element.ingredient);
})
console.log(returnObj)
res.locals.productsWithIngredients = returnObj
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
  // Get all products containing undesired ingredients
  // store values from req.bod in an array
  // make query to ingredient list to return all products containing these ingredients
   const allergens = req.body.allergens;
   console.log('passing in')
  console.log(allergens)
  const query = "SELECT * FROM sub_product LEFT JOIN product_ingredient ON sub_product.sub_product_id = product_ingredient.sub_product_id LEFT JOIN ingredient_list ON product_ingredient.ingredient_id = ingredient_list._id WHERE ingredient_list.ingredient IN ($1,$2,$3,$4,$5)"
  // WHERE ingredient_list.ingredient IN ALLERGENS($1,$2,$3,$4,$5)
  pgSql.query(query, allergens)
  .then((data) => {
    console.log("query executing?")
    console.log(data.rows)
    res.locals.badProducts = data.rows
  return next();
})
}

dbControllers.filter = (req, res, next) => {
// Requires list of bad products and list of all products
console.log('inside dbcontrollers.filter mwf')
// console.log('badProducts =', res.locals.badProducts)
// console.log('allProducts = ', res.locals.getAllProducts)
const goodProducts = []
for (const ele of res.locals.getAllProducts) {
  //for each element in bad products, check the sub product id
  //if subproduct id of product ele is found in a badproduct ele, continue
  if (!res.locals.badProducts.includes(ele)){
    console.log()
    
    goodProducts.push(ele)}
  }
  console.log('goodProducts =', goodProducts)
  return next();
}

//TODO:
//Save query response in res.locals.getProduct. Also maybe format it.
//Get product information from database; - need to check the db next step
dbControllers.getProduct = (req, res, next) => {
  console.log('within dbControllers.getProduct mwf, passing in:')
  console.log(req.body)
  // //save the info from req from req.body
  const { allergons } = req.body //this should be a array, send from front end;
  const params = allergons;
  //console.log("params", params);

  //this query return product id given string===desired ingredient
  //get info from request, (one ingredient name), and product query is return products that contians the allergons
    const product_query = 'SELECT DISTINCT pi.sub_product_id FROM product_ingredient pi iNNER JOIN ingredient_list i ON pi.ingredient_id=i._id WHERE i.ingredient=$1';

    pgSql.query(product_query, params).then((data) => {
      console.log(data.rows);
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


module.exports = dbControllers;