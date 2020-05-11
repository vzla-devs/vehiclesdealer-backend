import mongoose from 'mongoose'
const Schema = mongoose.Schema

// modelo para la historia/información adicional
let AboutSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Texto requerido']
    },
    picture: {
        type: String,
        default: ''
    }
})

export default mongoose.model('About', AboutSchema)
