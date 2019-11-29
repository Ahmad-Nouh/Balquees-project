const {EngobMix} = require('../Models/EngobMix');
const Joi = require('joi');

async function getEngobMixs(req, res) {
    const engobMixes = await EngobMix
    .find()
    .populate({
        path: 'components.material',
        model: 'Material',
    });

    if(!engobMixes) return res.status(404).send('getEngobMix not found!!');
    return res.send(engobMixes);
}

async function createEngobMixes(req, res) {
    const {error} = validateEngobMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newEngob = new EngobMix({
        code: req.body.code,
        type: req.body.type,
        glize: req.body.glize,
        components: req.body.components,
        createdAt: Date.now()
    });

    newEngob = await newEngob.save();

    const result = await EngobMix.populate(newEngob, {
        path: 'components.material',
        model: 'Material'
    });

    return res.send(result);
}


async function updateEngobMixes(req, res) {
    const {error} = validateEngobMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newEngobMix = await EngobMix.findByIdAndUpdate(req.params.id, {
    $set: {
        code: req.body.code,
        components: req.body.components,
        type: req.body.type,
        glize: req.body.glize
    }
    }, {new: true}).populate({
        path: 'components.material',
        model: 'Material',
    });

    return res.send(newEngobMix);
}

async function deleteEngobMixes(req, res) {
   const engobMix = await EngobMix.findByIdAndRemove(req.params.id);
   if(!engobMix) return res.status(404).send('Engob Mix not found!!');
    return res.send(engobMix);
}

function validateEngobMix(bookmark) {
    const componentsSchema = Joi.object().keys({
        _id: Joi.string().optional(),
        material: Joi.string().required(),
        quantity: Joi.number().min(0).required(),
    });
    const schema = {
        _id: Joi.string().optional(),
        createdAt: Joi.string().optional(),
        code: Joi.string().trim().min(1).required(),
        type: Joi.string().trim().min(1).required(),
        glize: Joi.string().trim().min(1).required(),
        components: Joi.array().items(componentsSchema).min(1).required()
    };

    return Joi.validate(bookmark, schema);
}

module.exports = {
    getEngobMixs,
    createEngobMixes,
    updateEngobMixes,
    deleteEngobMixes
};