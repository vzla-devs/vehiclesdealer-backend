const mongoose = require('mongoose')
const Schema = mongoose.Schema

// modelo para los coches
var CarSchema = new Schema({
    // marca
    make: {
        type: String,
        enum: [
            'abarth',
            'alfa romeo',
            'audi',
            'bmw',
            'chevrolet',
            'citroën',
            'dacia',
            'fiat',
            'ford',
            'honda',
            'jeep',
            'kia',
            'lexus',
            'mazda',
            'mercedes-benz',
            'mini',
            'mitsubishi',
            'nissan',
            'opel',
            'peugeot',
            'renault',
            'seat',
            'skoda',
            'smart',
            'subaru',
            'toyota',
            'volkswagen',
            'volvo'
        ],
        lowercase: true,
        required: true
    },
    // modelo
    model: {
        type: String,
        lowercase: true,
        required: true
    },
    // año
    year: {
        type: Number,
        min: 1900,
        required: true
    },
    // kilometros
    kilometers: {
        type: Number,
        min: 0,
        required: true
    },
    // tipo de combustible
    fuel_type: {
        type: String,
        enum: [
            'gasoline',
            'diesel',
            'gasoil'
        ],
        lowercase: true,
        required: true
    },
    // potencia
    horsepower: {
        type: Number,
        required: true
    },
    // transmisión
    transmission: {
        type: String,
        enum: [
            'automatic',
            'manual'
        ],
        lowercase: true,
        required: true
    },
    // precio
    price: {
        type: Number,
        min: 0,
        required: true
    }
})

module.exports = mongoose.model('Car', CarSchema )