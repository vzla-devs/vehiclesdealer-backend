const mongoose = require('mongoose')
const Schema = mongoose.Schema

// modelo para la historia/información adicional
let AboutSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Texto requerido']
    }
})

module.exports = mongoose.model('About', AboutSchema)