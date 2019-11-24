const express = require('express');
const router = express.Router();
const controller = require('../controllers/warehouse-controller');

// get warehouses
router.get('/', controller.getWarehouses);
// create warehouse
router.post('/', controller.createWarehouse);
// update warehouse
router.put('/:id', controller.updateWarehouse);
// delete warehouse
router.delete('/:id', controller.deleteWarehouse);


module.exports = router;