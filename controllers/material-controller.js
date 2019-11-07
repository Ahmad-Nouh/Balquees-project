const {Material} = require('../Models/Material');
const Joi = require('joi');

async function getMaterials(req, res) {
    const materials = await Material.find();
    if(!materials) return res.status(404).send('materials not found!!');
    return res.send(materials);
}

async function createMaterial(req, res) {
    const {error} = validateMaterial(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newMaterial = new Material({
        name: req.body.name,
        quantity: req.body.quantity
    });

    newMaterial = await newMaterial.save();

    return res.send(newMaterial);
}


async function updateMaterial(req, res) {
    let newMaterial = await Material.findById(req.params.id);
    if(!newMaterial) return res.status(404).send('Material not found!!');
    const {error} = validateMaterial(req.body);
    if(error) return res.status(400).send(error.details[0].message);

      newMaterial.name = req.body.name,
      newMaterial.quantity = req.body.quantity,
      newMaterial = await newMaterial.save();

    return res.send(newMaterial);
}

async function deleteMaterial(req, res) {
    const material = await Material.findByIdAndRemove(req.params.id);
    if(!material) return res.status(404).send('Material not found!!');

    return res.send(material);
}

function validateMaterial(material) {
    const schema = {
        _id: Joi.string().optional(),
        name: Joi.string().trim().min(1).max(255).required(),
        quantity: Joi.number().optional(),
        createdAt: Joi.string().optional(),
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