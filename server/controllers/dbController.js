//require models, connect with database
const pgSql = require('../models/pgSqlDatabase.js')

const dbControllers = {};

//Get product information from database; - need to check the db next step
dbControllers.getProduct = (req, res, next) => {
  // save the info from req from req.body by deconstructing the object sent from the front end
  // property should be called 'allergens', whos value is an array of 5 elements (each element is an allergen)
  const { allergens } = req.body

  // Save the allergens array into a constant 'params', to eventually paramaterize our query for products
  const params = allergens;

  //get info from request, (one ingredient name), and product query is return products that contians the allergons
    const product_query = `
      SELECT DISTINCT pi.sub_product_id 
      FROM product_ingredient pi 
      INNER JOIN ingredient_list i 
      ON pi.ingredient_id=i._id 
      WHERE i.ingredient=$1
      `;

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