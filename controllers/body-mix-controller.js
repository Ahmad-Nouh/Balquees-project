const {BodyMix} = require('../Models/BodyMix');
const Joi = require('joi');

async function getBodyMixes(req, res) {
    const bodyMixes = await BodyMix.find();
    if(!bodyMixes) return res.status(404).send('getBodyMix not found!!');
    return res.send(bodyMixes);
}

async function createBodyMixes(req, res) {
    const {error} = validateBodyMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newBody = new BodyMix({
        code: req.body.code,
        components: req.body.components
    });

    newBody = await newBody.save();

    return res.send(newBody);
}


async function updateBodyMixes(req, res) {
    let newBodyMix = await BodyMix.findById(req.params.id);
    if(!newBodyMix) return res.status(404).send('Body Mix not found!!');
    const {error} = validateBodyMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);

      newBodyMix.code = req.body.code,
      newBodyMix.components = req.body.components;
      newBodyMix = await newBodyMix.save();

    return res.send(newBodyMix);
}

async function deleteBodyMixes(req, res) {
    const bodyMix = await BodyMix.findByIdAndRemove(req.params.id);
    if(!bodyMix) return res.status(404).send('Body Mix not found!!');

    return res.send(bodyMix);
}

function validateBodyMix(bookmark) {
    const componentsSchema = Joi.object().keys({
        _id:      Joi.string().optional(),
        name:     Joi.string().trim().min(1).required(),
        quantity: Joi.number().min(1).required(),
        moisture: Joi.number().min(1).required(),
        dryRM:    Joi.number().min(1).required(),
        wetRM:    Joi.number().min(1).required(),
        wet:      Joi.number().min(1).required(),

    });
    const schema = {
        _id: Joi.string().optional(),
        createdAt: Joi.string().optional(),
        code: Joi.string().trim().min(1).required(),
        components: Joi.array().items(componentsSchema).min(1).required()
    };

    return Joi.validate(bookmark, schema);
}


module.exports = {
    getBodyMixes,
    createBodyMixes,
    updateBodyMixes,
    deleteBodyMixes
};