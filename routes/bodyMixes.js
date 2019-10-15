const express = require('express');
const router = express.Router();
const controller = require('../controllers/body-mix-controller');

// get body mixes
router.get('/', controller.getBodyMixes);
// create body mixes
router.post('/', controller.createBodyMixes);
// update body mixes
router.put('/:id', controller.updateBodyMixes);
// delete body mixes
router.delete('/:id', controller.deleteBodyMixes);


module.exports = router;