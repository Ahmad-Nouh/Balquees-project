const Joi = require('joi');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/engob-mix-controller');

// get engob mixes
router.get('/', controller.getEngobMixs);
// create engob mixes
router.post('/', controller.createEngobMixes);
// update engob mixes
router.put('/:id', controller.updateEngobMixes);
// delete engob mixes
router.delete('/:id', controller.deleteEngobMixes);


module.exports = router;