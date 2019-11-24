const express = require('express');
const router = express.Router();
const controller = require('../controllers/material-controller');

// get materials
router.get('/', controller.getMaterials);
// create material
router.post('/', controller.createMaterial);
// update material
router.put('/:id', controller.updateMaterial);
// delete material
router.delete('/:id', controller.deleteMaterial);


module.exports = router;