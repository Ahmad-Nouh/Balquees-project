const mongoose = require('mongoose');
const {BodyComponentSchema} = require('./BodyComponent');
const {WALLS, FLOORS} = require('./Constants');
const schema = new mongoose.Schema({
    code: {
        type: String
    },
    type: {
        type: String,
        enum: [FLOORS, WALLS]
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