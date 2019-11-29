const {PaintMix} = require('../Models/PaintMix');
const Joi = require('joi');

async function getPaintMixes(req, res) {
    const paintMixes = await PaintMix
    .find()
    .populate({
        path: 'components.material',
        model: 'Material',
    });
    if(!paintMixes) return res.status(404).send('getpaintMix not found!!');
    return res.send(paintMixes);
}

async function createPaintMixes(req, res) {
    const {error} = validatePaintMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newPaint = new PaintMix({
        code: req.body.code,
        type: req.body.type,
        glize: req.body.glize,
        components: req.body.components,
        createdAt: Date.now()
    });

    newPaint = await newPaint.save();

    const result = await PaintMix.populate(newPaint, {
        path: 'components.material',
        model: 'Material'
    });

    return res.send(result);
}


async function updatePaintMixes(req, res) {
    const {error} = validatePaintMix(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newPaintMix = await PaintMix.findByIdAndUpdate(req.params.id, {
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

    return res.send(newPaintMix);
}

async function deletePaintMixes(req, res) {
    const paintMix = await PaintMix.findByIdAndRemove(req.params.id);
    if(!paintMix) return res.status(404).send('Paint Mix not found!!');

    return res.send(paintMix);
}


function validatePaintMix(bookmark) {
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
    getPaintMixes,
    createPaintMixes,
    updatePaintMixes,
    deletePaintMixes
};