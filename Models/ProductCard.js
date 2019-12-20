const mongoose = require('mongoose');
const { WALLS, FLOORS, WALLS_MAT, WALLS_TRANSPARENT, FLOORS_MAT, FLOORS_TRANSPARENT } = require('./Constants');
const { HeatSchema } = require('./Heat');
const { FactorsSchema } = require('./Factors');
const { DimensionsSchema } = require('./Dimensions');

const schema = new mongoose.Schema({
    productName: {
        type: String
    },
    code: {
        type: String
    },
    type: {
        type: String
    },
    glize: {
        type: String
    },
    productionDate: {
        type: Date
    },
    dimensions: {
        type: DimensionsSchema
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
    thickness: {
        type: Number,
    },
    breakingForce: {
        type: Number,
    },
    radiation: {
        type: Number,
    },
    imageUrl: {
        type: String
    },
    paintMix: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaintMix',
    },
    engobMix: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EngobMix',
    },
    bodyMix: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BodyMix'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


const ProductCard = mongoose.model('ProductCard', schema);

module.exports.ProductCard = ProductCard;
module.exports.ProductCardSchema = schema;
