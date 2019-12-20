module.exports = function (obj) {
    obj.dimensions = parseJson(obj.dimensions);
    obj.paintFactors = parseJson(obj.paintFactors);
    obj.engobFactors = parseJson(obj.engobFactors);
    obj.pOvenHeat = parseJson(obj.pOvenHeat);
    obj.bOvenHeat = parseJson(obj.bOvenHeat);
};



function parseJson(stringify) {
    let data;
    try {
        data = JSON.parse(stringify);
    } catch (error) {
        throw new Error(`parsing form data error ${stringify}`)
    }
    return data;
}