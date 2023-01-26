const express = require('express');
const transControl = require('../controllers/pgDBController.js');
const apiControl = require('../controllers/rapidApiController.js');
const router = express.Router();

// transControl.transIngr, transControl.saveIngr,
// transControl.getProduct_list,transControl.saveIngr,

router.get(
  '/ingredients',
  transControl.getProduct_list,
  apiControl.getProductDetail,
  transControl.transformIngredientsStringBlock,
  transControl.getCategoryID,
  // transControl.saveSub_product,
  (req, res) => {
    res.send('action happened');
  }
);

router.get(
  '/products',
  apiControl.getProductList,
  transControl.getBrandID,
  apiControl.getProductDetail,
  transControl.transformIngredientsStringBlock,
  transControl.getCategoryID,
  // transControl.transP_list,
  transControl.saveIngredients,
  transControl.jointTable,
  (req, res) => {
    res.send('action fulfilled');
  }
);

module.exports = router;
