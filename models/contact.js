const mongoose = require('mongoose')
const Schema = mongoose.Schema

// modelo para el contacto
let ContactSchema = new Schema({
    mobilePhone: {
        type: Number,
        min: 6,
        max: 6,
        required: [true, 'Número móvil requerido']
    },
    mainPhone: {
        type: Number,
        min: 6,
        max: 6,
        required: [true, 'Número de teléfono requerido']
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Correo electrónico requerido']
    },
    monday: {
        type: String,
        required: [true, 'Horario de lunes requerido']
    },
    tuesday: {
        type: String,
        required: [true, 'Horario de martes requerido']
    },
    wednesday: {
        type: String,
        required: [true, 'Horario de miércoles requerido']
    },
    thursday: {
        type: String,
        required: [true, 'Horario de jueves requerido']
    },
    friday: {
        type: String,
        required: [true, 'Horario de viernes requerido']
    },
    saturday: {
        type: String,
        required: [true, 'Horario de sábado requerido']
    },
})

module.exports = mongoose.model('Contact', ContactSchema)