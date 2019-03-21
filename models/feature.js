const mongoose = require('mongoose')
const Schema = mongoose.Schema

// modelo para las características
let FeatureSchema = new Schema({
    type: {
        type: String,
        enum: [
            'car',
            'motorcycle'
        ],
        required: [true, 'Tipo requerido']
    },
    spanish: {
        type: String,
        required: [true, 'Descripción requerida']
    }
})

module.exports = mongoose.model('Feature', FeatureSchema)