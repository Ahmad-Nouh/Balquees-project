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

const PaintMix = mongoose.model('PaintMix', schema);

module.exports.PaintMix = PaintMix;
module.exports.PaintMixSchema = schema;