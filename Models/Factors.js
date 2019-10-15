const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    weight: {
        type: Number,
    },
    density: {
        type: Number
    },
    viscosity: {
        type: Number
    },
});

const Factors = mongoose.model('Factors', schema);

module.exports.Factors = Factors;
module.exports.FactorsSchema = schema;