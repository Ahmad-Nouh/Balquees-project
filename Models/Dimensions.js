const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    width: {
        type: Number,
    },
    height: {
        type: Number
    }
});

const Dimensions = mongoose.model('Dimensions', schema);

module.exports.Dimensions = Dimensions;
module.exports.DimensionsSchema = schema;