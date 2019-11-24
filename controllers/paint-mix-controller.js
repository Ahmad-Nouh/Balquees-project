const {PaintMix} = require('../Models/PaintMix');
const Joi = require('joi');

async function getPaintMixes(req, res) {
    const paintMixes = await PaintMix.find();
    if(!paintMixes) return res.status(404).send('getpaintMix not found!!');
    return res.send(paintMixes);
}

async function createPaintMixes(req, res) {
    const {error} = validatePaintMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newPaint = new PaintMix({
        code:       req.body.code,
        type:       req.body.type,
        glize:      req.body.glize,
        components: req.body.components,
        createdAt:  Date.now()
    });

    newPaint = await newPaint.save();

    return res.send(newPaint);
}


async function updatePaintMixes(req, res) {
    let newPaintMix = await PaintMix.findById(req.params.id);
    if(!newPaintMix) return res.status(404).send('Engob Mix not found!!');
    const {error} = validatePaintMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);

      newPaintMix.code =         req.body.code,
      newPaintMix.type =         req.body.type,
      newPaintMix.glize =        req.body.glize,
      newPaintMix.components =   req.body.components;

      newPaintMix = await newPaintMix.save();

    return res.send(newPaintMix);
}

async function deletePaintMixes(req, res) {
    const paintMix = await PaintMix.findByIdAndRemove(req.params.id);
    if(!paintMix) return res.status(404).send('Paint Mix not found!!');

    return res.send(paintMix);
}


function validatePaintMix(paintMix) {
    const componentsSchema = Joi.object().keys({
        _id:         Joi.string().optional(),
        name:        Joi.string().trim().min(1).required(),
        quantity:    Joi.number().integer().min(1).required(),
    });
    const schema = {
        _id:         Joi.string().optional(),
        createdAt:   Joi.string().optional(),
        code:        Joi.string().trim().min(1).required(),
        type:        Joi.string().trim().min(1).required(),
        glize:       Joi.string().trim().min(1).required(),
        components:  Joi.array().items(componentsSchema).min(1).required(),
        createdAt:   Joi.date().default(Date.now())
    };

    return Joi.validate(paintMix, schema);
}


module.exports = {
    getPaintMixes,
    createPaintMixes,
    updatePaintMixes,
    deletePaintMixes
};