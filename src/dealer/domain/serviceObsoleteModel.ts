//TODO: delete when the population of this model in the vehicle model is solved using mongoDB
import mongoose from 'mongoose'

const Schema = mongoose.Schema

let ServiceSchema = new Schema({
    spanish: {
        type: String,
        unique: true,
        required: [true, 'Descripción requerida']
    }
})

export default mongoose.model('Service', ServiceSchema)
