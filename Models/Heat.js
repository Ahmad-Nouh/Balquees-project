const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    low: {
        type: Number,
    },
    high: {
        type: Number
    }
});

const Heat = mongoose.model('Heat', schema);

module.exports.Heat = Heat;
module.exports.HeatSchema = schema;