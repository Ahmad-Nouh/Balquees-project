const {EngobMix} = require('../Models/EngobMix');
const Joi = require('joi');

async function getEngobMixs(req, res) {
    const engobMixes = await EngobMix.find();
    if(!engobMixes) return res.status(404).send('getEngobMix not found!!');
    return res.send(engobMixes);
}

async function createEngobMixes(req, res) {
    const {error} = validateEngobMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newEngob = new EngobMix({
        code:          req.body.code,
        type:          req.body.type,
        glize:         req.body.glize,
        components:    req.body.components,
        createdAt:     Date.now()
    });

    newEngob = await newEngob.save();

    return res.send(newEngob);
}


async function updateEngobMixes(req, res) {
    let newEngobMix = await EngobMix.findById(req.params.id);
    if(!newEngobMix) return res.status(404).send('Engob Mix not found!!');
    const {error} = validateEngobMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);

      newEngobMix.code =         req.body.code,
      newEngobMix.type =         req.body.type,
      newEngobMix.glize =        req.body.glize,
      newEngobMix.components =   req.body.components;

      newEngobMix = await newEngobMix.save();

    return res.send(newEngobMix);
}

async function deleteEngobMixes(req, res) {
   const engobMix = await EngobMix.findByIdAndRemove(req.params.id);
   if(!engobMix) return res.status(404).send('Engob Mix not found!!');
    return res.send(engobMix);
}

function validateEngobMix(engobMix) {
    const componentsSchema = Joi.object().keys({
        _id:        Joi.string().optional(),
        name:       Joi.string().trim().min(1).required(),
        quantity:   Joi.number().integer().min(1).required(),
    });
    const schema = {
        _id:        Joi.string().optional(),
        code:       Joi.string().trim().min(1).required(),
        type:       Joi.string().trim().min(1).required(),
        glize:      Joi.string().trim().min(1).required(),
        components: Joi.array().items(componentsSchema).min(1).required(),
        createdAt:  Joi.date().default(Date.now())
    };

    return Joi.validate(engobMix, schema);
}

module.exports = {
    getEngobMixs,
    createEngobMixes,
    updateEngobMixes,
    deleteEngobMixes
};