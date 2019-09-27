const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number
    }
});

const Component = mongoose.model('Component', schema);

module.exports.Component = Component;
module.exports.ComponentSchema = schema;