const pgSql = require('../models/pgSqlDatabase.js');

module.exports = {
  getProduct_list: async (req, res, next) => {
    console.log('Running getProduct_list');
    // Fetching the products from the database

    try {
      const command = 'SELECT * FROM products';
      const sqlResponse = await pgSql.query(command);
      const product_list = sqlResponse.rows;
      res.locals.PRODUCTS = product_list;

      return next();
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }, // DONE

  transformIngredients: async (req, res, next) => {
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

    // console.log(res.locals.PRODUCTS);
    return next();
  }, // DONE

  saveIngredients: async (req, res, next) => {
    console.log('Running saveIngredients');
    try {
      const command = `INSERT INTO ingredients (ingredient) VALUES ($1) ON CONFLICT DO NOTHING;`;

      for (let { parsedIngredients } of res.locals.PRODUCTS) {
        console.log(parsedIngredients);
        for (const ingredient of parsedIngredients) {
          const result = await pgSql.query(command, [ingredient]);
        }
      }

      console.log('done');
      return next();
    } catch (err) {
      const error = {
        log: `pgDBController.saveIngr ERROR::${JSON.stringify(err)}`,
        message: `server error check the server log`,
      };
      next(error);
    }
  }, // DONE

  saveSub_product: async (req, res, next) => {
    console.log('Running saveSub_product');

    for (let product of res.locals.CATEGORY) {
      console.log(product);

      const {
        product_id,
        brand_name,
        display_name,
        hero_image,
        rating,
        reviews,
        sub_product_list,
      } = product;

      // for (let obj of product) {
      //   console.log(obj);
      const result = await pgSql.query(
        // `INSERT INTO sub_product (sub_product_id, display_name, hero_image, rating, reviews, product_id, variant) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING`,
        `INSERT INTO sub_product (sub_product_id, display_name, hero_image, rating, reviews, product_id) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING`,
        [
          product_id,
          // product_id + '::' + obj.display_name + obj.variant,
          display_name,
          hero_image,
          rating,
          reviews,
          product_id,
        ]
      );
      console.log(result);
    }
    // }
    return next();
  },

  jointTable: async (req, res, next) => {
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

  transP_list: async (req, res, next) => {
    try {
      const { PRODUCTS } = await res.locals;
      console.log(PRODUCTS);

      const command = `
        INSERT INTO products 
        (product_id, product_name, brand_id, category_id, hero_image, target_url, rating, reviews, ingredients) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        ON CONFLICT DO NOTHING`;

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
        console.log(result);
      }

      return next();
    } catch (err) {
      console.log(err);
    }
  },

  getBrandID: async (req, res, next) => {
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

  getCategoryID: async (req, res, next) => {
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

      // console.log(result.rows[0]);
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
      // replace category in the DB

      // const swapCategoryId = await pgSql.query(replace, [
      //   0,
      //   cat_id,
      //   product.product_id,
      // ]);
    }

    res.locals.PRODUCTS = newProducts;
    // console.log(newProducts);
    return next();
  },

  getSub_product_list: async (req, res, next) => {
    try {
      const QUERY = 'SELECT * FROM sub_product';
      const data = await pgSql.query(QUERY);
      if (data.rows.length) {
        res.locals.SUB_PRODUCT_LIST = data.rows;
        console.log('sub_product received getSub_product_list:');
        return next();
      } else {
        const err = { log: 'no data received', message: 'server error ' };
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  },

  getAllsubProduct: async (req, res, next) => {
    try {
      console.log('starting query for ingredient ');
      const ORDERED_SUB_PRODUCT_LIST = [];

      for (let SUB_PRODUCT of res.locals.SUB_PRODUCT_LIST) {
        const { sub_product_id, display_name, hero_image, rating, reviews } =
          SUB_PRODUCT;
        console.log('getting all the subProdut with ingredients');
        const QUERY =
          'SELECT pi.sub_product_id, i.ingredient, i.description FROM product_ingredient pi LEFT JOIN ingredient_list i ON i._id=pi.ingredient_id WHERE pi.sub_product_id =$1;';
        const ingredients = await pgSql.query(QUERY, [sub_product_id]);
        console.log(ingredients);
        console.log('query done getAllsubProduct');
        const sub_product = {
          sub_product_id: sub_product_id,
          display_name: display_name,
          hero_imgae: hero_image,
          rating: rating,
          reviews: reviews,
          ingredients: '',
        };

        console.log('start sorting');
        let ingredientStr = '';
        for (let obj of ingredients.rows) {
          const { sub_product_id, ingredient, description } = obj;
          if (sub_product.sub_product_id === sub_product_id) {
            if (description) {
              ingredientStr += ingredient + ' : ' + description + ', ';
            } else ingredientStr += ingredient + ', ';
          }
        }
        sub_product.ingredients = ingredientStr;
        console.log('done sorting');
        ORDERED_SUB_PRODUCT_LIST.push(sub_product);
      }

      console.log(ORDERED_SUB_PRODUCT_LIST);
      res.locals.SUB_PRODUCT_LIST = ORDERED_SUB_PRODUCT_LIST;
      return next();
    } catch (err) {}
  },

  getAllallergen: async (req, res, next) => {
    try {
      // res.locals.SUB_PRODUCT_LIST
      res.locals.allergens = [];
      // const arr = req.body.allergens // array
      const arr = ['Water'];
      for (let allergen of arr) {
        console.log(allergen);
        // this ligic is flawed fix it plz
        const command = `SELECT pi.sub_product_id FROM product_ingredient pi INNER JOIN ingredient_list i ON i._id=pi.ingredient_id WHERE i.ingredient=${allergen};`;
        const response = await pgSql.query(command);
        res.locals.allergens.push(...response);
      }
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  SortUnWanted: async (req, res, next) => {
    const tempArr = [];
    console.log(res.locals.SUB_PRODUCT_LIST[0], res.locals.allergens[0]);
    for (let sub_product of res.locals.SUB_PRODUCT_LIST) {
      for (let allergen of es.locals.allergens) {
        // if (sub_product.)
      }
    }
  },
};

// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);

// Formerly in transIngr

// console.log(ingredients);

// for (let PRODUCT of res.locals.CATEGORY) {
//   const sub_product_list = [];
//   console.log(PRODUCT.sub_product_list[0].ingredient);

//   const {
//     product_id,
//     brand_name,
//     display_name,
//     hero_image,
//     rating,
//     reviews,
//   } = PRODUCT;

//   for (let {
//     ingredient,
//     display_name,
//     variant,
//   } of PRODUCT.sub_product_list) {
//     // this is for testing when the test is done change the source of the data back to rapid api
//     //****************************** MAKE SURE TO GET A INGREDIENTS FROM PREVIOUS FUCNTION  *********************/
//     const obj = {
//       display_name: display_name,
//       variant: variant,
//       ingredient: [],
//     };

//     if (ingredient !== undefined) {
//       const sort1 = ingredient.split(
//         /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
//       );
//       // console.log(sort1)
//       const sort2 = [];
//       for (let str of sort1) {
//         // sort2.push(str.replace(/ /, ""))
//         const str1 = str.split(/, /);
//         sort2.push(...str1);
//       }
//       // console.log(sort2)
//       // const sort3 = []
//       for (let str of sort2) {
//         const [name, description] = str.split(/: /);

//         if (name.length) {
//           obj.ingredient.push({
//             ingredient: name,
//             description: description,
//           });
//         }
//       }
//     }
//     sub_product_list.push(obj);
//     // console.log(sub_product_list)
//   }
//   res.locals.SORTED_CATEGORY.push({
//     product_id,
//     brand_name,
//     display_name,
//     hero_image,
//     rating,
//     reviews,
//     sub_product_list,
//   });
// }
// console.log(res.locals.SORTED_CATEGORY);
