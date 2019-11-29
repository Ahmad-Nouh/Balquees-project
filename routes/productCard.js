const Joi = require('joi');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-card-controller');

// get Product Card
router.get('/', controller.getProductCard);
// create Product Card
router.post('/', controller.createProductCard);
// update Product Card
router.put('/:id', controller.updateProductCard);
// delete Product Card
router.delete('/:id', controller.deleteProductCard);


module.exports = router;