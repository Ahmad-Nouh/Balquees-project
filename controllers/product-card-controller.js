const {ProductCard} = require('../Models/ProductCard');
const Joi = require('joi');

async function getProductCard(req, res) {
    const productCard = await ProductCard
    .find()
    .populate({
        path: 'paintMix',
        model: 'PaintMix'
    })
    .populate({
        path: 'engobMix',
        model: 'EngobMix'
    })
    .populate({
        path: 'bodyMix',
        model: 'BodyMix'
    });

    if(!productCard) return res.status(404).send('getProductCard not found!!');
    return res.send(productCard);
}


async function createProductCard(req, res) {
    const {error} = validateProductCard(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let newProductCard = new BodyMix({

        productName:    req.body.productName,
        code:           req.body.code,
        productionDate: req.body.productionDate,
        dimensions:     req.body.dimensions,
        bOvenHeat:      req.body.bOvenHeat,
        pOvenHeat:      req.body.pOvenHeat,
        bOvenPeriod:    req.body.bOvenPeriod,
        pOvenPeriod:    req.body.pOvenPeriod,
        engobFactors:   req.body.engobFactors,
        paintFactors:   req.body.paintFactors,
        pistonPressure: req.body.pistonPressure,
        thickness:      req.body.thickness,
        breakingForce:  req.body.breakingForce,
        absorbency:     req.body.absorbency,

        paintMix,
        engobMix,
        bodyMix,
        createdAt:  Date.now()
    });

    newProductCard = await newProductCard.save();

    return res.send(newProductCard);
}

async function updateProductCard(req, res) {
    let newProductCard = await ProductCard.findById(req.params.id);
    if(!newProductCard) return res.status(404).send('Product Card not found!!');
    const {error} = validateProductCard(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    newProductCard.productName=         req.body.productName,
    newProductCard.code=                req.body.code,
    newProductCard.productionDate=      req.body.productionDate,
    newProductCard.dimensions=          req.body.dimensions,
    newProductCard.bOvenHeat=           req.body.bOvenHeat,
    newProductCard.pOvenHeat=           req.body.pOvenHeat,
    newProductCard.bOvenPeriod=         req.body.bOvenPeriod,
    newProductCard.pOvenPeriod=         req.body.pOvenPeriod,
    newProductCard.engobFactors=        req.body.engobFactors,
    newProductCard.paintFactors=        req.body.paintFactors,
    newProductCard.pistonPressure=      req.body.pistonPressure,
    newProductCard.thickness=           req.body.thickness,
    newProductCard.breakingForce=       req.body.breakingForce,
    newProductCard.absorbency=          req.body.absorbency,

    newProductCard.paintMix,
    newProductCard.engobMix,
    newProductCard.bodyMix


    newProductCard = await newProductCard.save();

    const result = await ProductCard
        .populate(newProductCard, {
            path: 'paintMix',
            model: 'PaintMix'
        })
        .populate(newProductCard, {
            path: 'engobMix',
            model: 'EngobMix';
        })
        .populate(newProductCard, {
            path: 'bodyMix',
            model: 'BodyMixr'
        });
    

    return res.send(result);
}

async function deleteProductCard(req, res) {
    const productCard = await ProductCard.findByIdAndRemove(req.params.id);
    if(!productCard) return res.status(404).send('Product Card not found!!');

    return res.send(productCard);
}




function validateProductCard(productCard) {
    const dimensionsSchema = Joi.object().keys({
       width:           Joi.number().min(1).optional(),
       hight:           Joi.number().min(1).optional(),
    });
    const schema = {
        _id:            Joi.string().optional(),
        createdAt:      Joi.string().optional(),
        productName:    Joi.string().trim().min(1).required(),
        code:           Joi.string().trim().min(1).required(),
        productionDate: Joi.date().trim().required(),
        bOvenHeat:      Joi.number().min(1).optional(),
        pOvenHeat:      Joi.number().min(1).optional(),
        bOvenPeriod:    Joi.number().min(1).optional(),
        pOvenPeriod:    Joi.number().min(1).optional(),
        engobFactors:   Joi.number().min(1).optional(),
        paintFactors:   Joi.number().min(1).optional(),
        pistonPressure: Joi.number().min(1).optional(),
        thickness:      Joi.number().min(1).optional(),
        breakingForce:  Joi.number().min(1).optional(),
        absorbency:     Joi.number().min(1).optional(),
        createdAt:      Joi.date().default(Date.now()),
        dimensions:     dimensions,
        
    };

    return Joi.validate(productCard, schema);
}
