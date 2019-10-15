const {PaintMix} = require('../Models/PaintMix');

async function getPaintMixes(req, res) {
    const paintMixes = await PaintMix.find();

    return res.send(paintMixes);
}

async function createPaintMixes(req, res) {
    let newPaint = new PaintMix({
        code: req.body.code,
        type: req.body.type,
        glize: req.body.glize,
        components: req.body.components
    });

    newPaint = await newPaint.save();

    return res.send(newPaint);
}


async function updatePaintMixes(req, res) {
    let paintMix = await PaintMix.findOneAndUpdate({_id: req.params.id}, {
        code: req.body.code,
        type: req.body.type,
        glize: req.body.glize,
        components: req.body.components
    }, { new: true });


    paintMix = await paintMix.save();

    return res.send(paintMix);
}

async function deletePaintMixes(req, res) {
    let paintMix = await PaintMix.findOneAndDelete({_id: req.params.id});

    return res.send(paintMix);
}

module.exports = {
    getPaintMixes,
    createPaintMixes,
    updatePaintMixes,
    deletePaintMixes
};