const mongoose = require('mongoose');
const {WALLS, FLOORS, TRANSPARENT, MAT} = require('./Constants');
const {ComponentSchema} = require('./Component');

const schema = new mongoose.Schema({
    code: {
        type: String
    },
    type: {
        type: String,
        enum: [FLOORS, WALLS]
    },
    glize: {
        type: String,
        enum: [TRANSPARENT, MAT]
    },
    components: {
        type: [ComponentSchema]
    }
});

const EngobMix = mongoose.model('EngobMix', schema);

module.exports.EngobMix = EngobMix;
module.exports.EngobMixSchema = schema;