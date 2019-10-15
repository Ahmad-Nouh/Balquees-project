const mongoose = require('mongoose');
const {BodyComponentSchema} = require('./BodyComponent');

const schema = new mongoose.Schema({
    code: {
        type: String
    },
    components: {
        type: [BodyComponentSchema]
    }
});

const Body = mongoose.model('Body', schema);

module.exports.Body = Body;
module.exports.BodySchema = schema;