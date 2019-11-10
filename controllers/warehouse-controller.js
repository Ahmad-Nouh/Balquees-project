const {Warehouse} = require('../Models/Warehouse');
const Joi = require('joi');

async function getWarehouses(req, res) {
    const warehouses = await Warehouse
    .find()
    .populate({
        path: 'materials',
        model: 'Material',
    });

    if(!warehouses) return res.status(404).send('warehouses not found!!');
    return res.send(warehouses);
}

async function createWarehouse(req, res) {
    const {error} = validateWarehouse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newWarehouse = new Warehouse({
        name_en: req.body.name_en,
        name_ar: req.body.name_ar,
        materials: req.body.materials
    });

    newWarehouse = await newWarehouse.save();

    const result = await Warehouse.populate(newWarehouse, {
        path: 'materials',
        model: 'Material'
    });

    return res.send(result);
}


async function updateWarehouse(req, res) {
    let newWarehouse = await Warehouse.findById(req.params.id);
    if(!newWarehouse) return res.status(404).send('Warehouse not found!!');
    const {error} = validateWarehouse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    newWarehouse.name_en = req.body.name_en,
    newWarehouse.name_ar = req.body.name_ar,
    newWarehouse.materials = req.body.materials,
    newWarehouse = await newWarehouse.save();

    const result = await Warehouse.populate(newWarehouse, {
        path: 'materials',
        model: 'Material'
    });

    return res.send(result);
}

async function deleteWarehouse(req, res) {
    const warehouse = await Warehouse.findByIdAndRemove(req.params.id);
    if(!warehouse) return res.status(404).send('Warehouse not found!!');

    return res.send(warehouse);
}

function validateWarehouse(material) {
    const schema = {
        name_en: Joi.string().trim().min(1).max(255).required(),
        name_ar: Joi.string().trim().min(1).max(255).required(),
        materials: Joi.array().optional()
    };

    return Joi.validate(material, schema);
}


module.exports = {
    getWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
};