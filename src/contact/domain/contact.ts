import mongoose from 'mongoose'
const Schema = mongoose.Schema

let ContactSchema = new Schema({
    mobilePhone: {
        type: Number,
        min: 9,
        required: [true, 'Número móvil requerido']
    },
    mainPhone: {
        type: Number,
        min: 9,
        required: [true, 'Número de teléfono requerido']
    },
    emails: {
        type: [String],
        lowercase: true
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

export default mongoose.model('Contact', ContactSchema)
