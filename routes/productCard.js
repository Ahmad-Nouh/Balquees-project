const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-card-controller');
const upload = require('../middlewares/upload');
const parser = require('../middlewares/parser');

// get Product Card
router.get('/', controller.getProductCards);
// create Product Card
router.post('/', upload, controller.createProductCard);
// update Product Card
router.put('/:id', upload, controller.updateProductCard);
// delete Product Card
router.delete('/:id', controller.deleteProductCard);


module.exports = router;