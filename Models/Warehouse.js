const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name_en: {
        type: String,
    },
    name_ar: {
        type: String,
    },
    materials: [mongoose.Schema.Types.ObjectId]
});

const Warehouse = mongoose.model('Warehouse', schema);

module.exports.Warehouse = Warehouse;
module.exports.WarehouseSchema = schema;