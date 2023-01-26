const pgSql = require('../models/pgSqlDatabase.js');

module.exports = {
  // Extracting data from DETAILS response

  extractBrandID: async (req, res, next) => {
    const query = `
      SELECT _id 
      FROM brands
      WHERE name = $1
    `;

    const create = `
      INSERT 
      INTO brands 
      (name) VALUES ($1)
    `;

    const newProducts = [];

    const { PRODUCTS } = await res.locals;
    for (const product of PRODUCTS) {
      let newBrand_id;
      const result = await pgSql.query(query, [product.brand_id]);

      // If the brand already exist in the DB
      // Use its ID to add to the Product
      if (result.rows[0]) {
        newBrand_id = result.rows[0]._id;
      }
      // Otherwise create a new Brand in the DB
      // And get it's _id back
      else {
        const insert = await pgSql.query(create, [product.brand_id]);
        const retrieve = await pgSql.query(query, [product.brand_id]);

        newBrand_id = retrieve.rows[0]._id;
      }

      // replace previous Brand name with new brand_id
      newProducts.push({ ...product, brand_id: newBrand_id });
    }

    res.locals.PRODUCTS = newProducts;
    return next();
  },

  extractCategoryID: async (req, res, next) => {
    const query = `
      SELECT _id 
      FROM categories
      WHERE category = $1
    `;

    const create = `
      INSERT 
      INTO categories 
      (category) VALUES ($1)
    `;

    const replace = `
      UPDATE products 
      SET category_id = REPLACE(category_id, $1, $2) 
      WHERE product_id = $3;
    `;

    const newProducts = [];

    const { PRODUCTS } = await res.locals;
    for (const product of PRODUCTS) {
      let cat_id;

      const result = await pgSql.query(query, [product.category_id]);

      // If the brand already exist in the DB
      // Use its ID to add to the Product
      if (result.rows[0]) {
        cat_id = result.rows[0]._id;
      }
      // Otherwise create a new Brand in the DB
      // And get it's _id back
      else {
        const insert = await pgSql.query(create, [product.category_id]);
        const retrieve = await pgSql.query(query, [product.category_id]);

        cat_id = retrieve.rows[0]._id;
      }

      // replace previous Brand name with new brand_id
      newProducts.push({ ...product, category_id: cat_id });
    }

    res.locals.PRODUCTS = newProducts;
    // console.log(newProducts);
    return next();
  },

  extractIngredients: async (req, res, next) => {
    console.log('Running transformIngredientsStringBlock');
    // Access list of ingredients from the JSON file

    const ingredients = [];
    const ingredientsJson = require('../models/ingredientsDatabase.json');
    const allIngredients = ingredientsJson.ingredients;

    for (const { NAME } of allIngredients) {
      ingredients.push(NAME);
    }

    // New product to be sent

    res.locals.PRODUCTS = [];

    for (const product of res.locals.DETAILS) {
      const matchingIngredients = [];
      const paragraphe = product.ingredients.toUpperCase();

      for (const name of ingredients) {
        if (paragraphe.includes(name)) matchingIngredients.push(name);
      }

      res.locals.PRODUCTS.push({
        ...product,
        parsedIngredients: matchingIngredients,
      });
    }

    return next();
  },

  // Insert data to the database

  insertProducts: async (req, res, next) => {
    try {
      const command = `
      INSERT INTO products 
      (product_id, product_name, brand_id, category_id, hero_image, target_url, rating, reviews, ingredients) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      ON CONFLICT DO NOTHING`;

      const { PRODUCTS } = await res.locals;

      for (const product of PRODUCTS) {
        const params = [
          product.product_id,
          product.product_name,
          product.brand_id,
          product.category_id,
          product.hero_image,
          product.target_url,
          product.rating,
          product.review,
          product.parsedIngredients,
        ];

        const result = await pgSql.query(command, params);
      }

      return next();
    } catch (err) {
      console.log(err);
    }
  },

  insertIngredients: async (req, res, next) => {
    console.log('Running saveIngredients');
    try {
      const command = `INSERT INTO ingredients (ingredient) VALUES ($1) ON CONFLICT DO NOTHING;`;

      for (let { parsedIngredients } of res.locals.PRODUCTS) {
        console.log(parsedIngredients);
        for (const ingredient of parsedIngredients) {
          const result = await pgSql.query(command, [ingredient]);
        }
      }

      return next();
    } catch (err) {
      const error = {
        log: `pgDBController.saveIngr ERROR::${JSON.stringify(err)}`,
        message: `server error check the server log`,
      };
      next(error);
    }
  },

  insertProductIngredientJoinTable: async (req, res, next) => {
    console.log('joint table');

    const commandJoint = `
      INSERT INTO product__ingredient (product_id, ingredient_id) 
      VALUES (
        (SELECT _id 
         FROM products
         WHERE product_id=$1),
        (SELECT _id 
         FROM ingredients 
         WHERE ingredient=$2)
      ) 
      ON CONFLICT DO NOTHING`;

    for (let product of res.locals.PRODUCTS) {
      for (let ingredient of product.parsedIngredients) {
        const jointResult = await pgSql.query(commandJoint, [
          product.product_id,
          ingredient,
        ]);
        console.log(jointResult);
      }
    }
    return next();
  },
};
