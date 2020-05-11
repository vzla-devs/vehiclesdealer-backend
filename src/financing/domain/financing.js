const mongoose = require('mongoose')
const Schema = mongoose.Schema

let FinancingSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Monto requerido']
    }
})

module.exports = mongoose.model('Financing', FinancingSchema)