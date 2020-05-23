import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
