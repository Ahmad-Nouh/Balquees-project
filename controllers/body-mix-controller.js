const {BodyMix} = require('../Models/BodyMix');

async function getBodyMixes(req, res) {
    const bodyMixes = await BodyMix.find();

    return res.send(bodyMixes);
}

async function createBodyMixes(req, res) {
    let newBody = new BodyMix({
        code: req.body.code,
        components: req.body.components
    });

    newBody = await newBody.save();

    return res.send(newBody);
}


async function updateBodyMixes(req, res) {
    let bodyMix = await BodyMix.findOneAndUpdate({_id: req.params.id}, {
        code: req.body.code,
        components: req.body.components
    },{ new: true });


    bodyMix = await bodyMix.save();

    return res.send(bodyMix);
}

async function deleteBodyMixes(req, res) {
    let bodyMix = await BodyMix.findOneAndDelete({_id: req.params.id});

    return res.send(bodyMix);
}

module.exports = {
    getBodyMixes,
    createBodyMixes,
    updateBodyMixes,
    deleteBodyMixes
};