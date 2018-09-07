const mongoose = require('mongoose')
const Schema = mongoose.Schema

// modelo para el equipamiento
let ServiceSchema = new Schema({
    spanish: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Descripción requerida']
    }
})

module.exports = mongoose.model('Service', ServiceSchema)