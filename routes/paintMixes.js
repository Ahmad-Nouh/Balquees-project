const express = require('express');
const router = express.Router();
const controller = require('../controllers/paint-mix-controller');

// get paint mixes
router.get('/', controller.getPaintMixes);
// create paint mixes
router.post('/', controller.createPaintMixes);
// update paint mixes
router.put('/:id', controller.updatePaintMixes);
// delete paint mixes
router.delete('/:id', controller.deletePaintMixes);


module.exports = router;