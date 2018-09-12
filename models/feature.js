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
        lowercase: true,
        required: [true, 'Tipo requerido']
    },
    spanish: {
        type: String,
        lowercase: true,
        required: [true, 'Descripción requerida']
    }
})

module.exports = mongoose.model('Feature', FeatureSchema)