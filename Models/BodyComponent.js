const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number
    },
    moisture: {
        type: Number
    },
    dryRM: {
        type: Number
    },
    wetRM: {
        type: Number
    },
    wet: {
        type: Number
    }
});

const BodyComponent = mongoose.model('BodyComponent', schema);

module.exports.BodyComponent = BodyComponent;
module.exports.BodyComponentSchema = schema;