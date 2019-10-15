const mongoose = require('mongoose');
const {BodyComponentSchema} = require('./BodyComponent');

const schema = new mongoose.Schema({
    code: {
        type: String
    },
    components: {
        type: [BodyComponentSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const BodyMix = mongoose.model('BodyMix', schema);

module.exports.BodyMix = BodyMix;
module.exports.BodyMixSchema = schema;