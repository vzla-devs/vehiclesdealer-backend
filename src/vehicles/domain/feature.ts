import mongoose from 'mongoose'

const Schema = mongoose.Schema

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

export default mongoose.model('Feature', FeatureSchema)
