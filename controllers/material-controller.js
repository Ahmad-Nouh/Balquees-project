const {Material} = require('../Models/Material');
const {Warehouse} = require('../Models/Warehouse');
const Joi = require('joi');

async function getMaterials(req, res) {
    const materials = await Material
    .find()
    .populate({
        path: 'warehouse',
        model: 'Warehouse'
    });

    if(!materials) return res.status(404).send('materials not found!!');
    return res.send(materials);
}

async function createMaterial(req, res) {
    const {error} = validateMaterial(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newMaterial = new Material({
        name: req.body.name,
        quantity: req.body.quantity,
        warehouse: req.body.warehouse,
        createdAt: Date.now()
    });

    newMaterial = await newMaterial.save();

    let warehouse = await Warehouse.findById(req.body.warehouse);
    if (!warehouse) return res.status(400).send('invalid warehouse');


    warehouse.materials.push(newMaterial);
    warehouse = await warehouse.save();

    const result = await Material.populate(newMaterial, {
        path: 'warehouse',
        model: 'Warehouse'
    });

    return res.send(result);
}


async function updateMaterial(req, res) {
    let newMaterial = await Material.findById(req.params.id);
    if(!newMaterial) return res.status(404).send('Material not found!!');
    const {error} = validateMaterial(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    newMaterial.name = req.body.name,
    newMaterial.quantity = req.body.quantity,
    // newMaterial.warehouse = req.body.warehouse,
    newMaterial = await newMaterial.save();

    const result = await Material.populate(newMaterial, {
        path: 'warehouse',
        model: 'Warehouse'
    });

    return res.send(result);
}

async function deleteMaterial(req, res) {
    const material = await Material.findByIdAndRemove(req.params.id);
    if(!material) return res.status(404).send('Material not found!!');

    let warehouse = await Warehouse.findById(material.warehouse);
    if (!warehouse) return res.status(400).send('invalid warehouse');

    const warehouseMaterials = warehouse.materials.slice();

    const index = warehouseMaterials.findIndex((mat) => mat == req.params.id);
    if (index >= 0) {
        warehouseMaterials.splice(index, 1);
    }
    warehouse.materials = warehouseMaterials;

    await warehouse.save();

    return res.send(material);
}

function validateMaterial(material) {
    const schema = {
        _id: Joi.string().optional(),
        warehouse: Joi.string().required(),
        name: Joi.string().trim().min(1).max(255).required(),
        quantity: Joi.number().optional(),
        updatedAt: Joi.string().optional()
    };

    return Joi.validate(material, schema);
}


module.exports = {
    getMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial
};