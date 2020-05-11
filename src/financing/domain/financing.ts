import mongoose from 'mongoose'

const Schema = mongoose.Schema

let FinancingSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Monto requerido']
    }
})

export default mongoose.model('Financing', FinancingSchema)
