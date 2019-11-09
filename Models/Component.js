const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material'
    },
    quantity: {
        type: Number
    }
});

const Component = mongoose.model('Component', schema);

module.exports.Component = Component;
module.exports.ComponentSchema = schema;