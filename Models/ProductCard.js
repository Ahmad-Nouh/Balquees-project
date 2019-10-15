const mongoose = require('mongoose');
const { WALLS, FLOORS, WALLS_MAT, WALLS_TRANSPARENT, FLOORS_MAT, FLOORS_TRANSPARENT } = require('./Constants');
const { HeatSchema } = require('./Heat');
const { FactorsSchema } = require('./Factors');

const schema = new mongoose.Schema({
    productName: {
        type: String
    },
    code: {
        type: String
    },
    productionDate: {
        type: Date
    },
    dimensions: {
        type: DimensionsSchema
    },
    productType: {
        type: String,
        enum: [
            WALLS_MAT,
            WALLS_TRANSPARENT,
            FLOORS_MAT,
            FLOORS_TRANSPARENT
        ]
    },
    engobType: {
        type: String,
        enum: [
            WALLS_MAT,
            WALLS_TRANSPARENT,
            FLOORS_MAT,
            FLOORS_TRANSPARENT
        ]
    },
    paintType: {
        type: String,
        enum: [
            WALLS_MAT,
            WALLS_TRANSPARENT,
            FLOORS_MAT,
            FLOORS_TRANSPARENT
        ]
    },
    pintMixCode: {
        type: String,
    },
    engobMixCode: {
        type: String,
    },
    bodyType: {
        type: String,
        enum: [
            WALLS,
            FLOORS
        ]
    },
    bodyCode: {
        type: String,
    },
    bOvenHeat: {
        type: HeatSchema,
    },
    pOvenHeat: {
        type: HeatSchema,
    },
    bOvenPeriod: {
        type: Number,
    },
    pOvenPeriod: {
        type: Number,
    },
    engobFactors: {
        type: FactorsSchema,
    },
    paintFactors: {
        type: FactorsSchema,
    },
    pistonPressure: {
        type: Number,
    },
    paintMix: {
        type: mongoose.Schema.ObjectId,
        ref: 'PaintMix',
    },
    engobMix: {
        type: mongoose.Schema.ObjectId,
        ref: 'EngobMix',
    },
    bodyMix: {
        type: mongoose.Schema.ObjectId,
        ref: 'BodyMix'
    }
});


const ProductCard = mongoose.model('ProductCard', schema);

module.exports.ProductCard = ProductCard;
module.exports.ProductCardSchema = schema;
