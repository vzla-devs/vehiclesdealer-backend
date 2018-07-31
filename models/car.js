const mongoose = require('mongoose')
const Schema = mongoose.Schema

// modelo para los coches
let CarSchema = new Schema({
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
        required: [true, 'Marca requerida']
    },
    // modelo
    model: {
        type: String,
        lowercase: true,
        required: [true, 'Modelo requerido']
    },
    // año
    year: {
        type: Number,
        min: [1990, 'El año debe ser mayor a 1990'],
        required: [true, 'Año de matriculación requerido']
    },
    // kilometros
    kilometers: {
        type: Number,
        min: [0, 'El kilometraje no puede ser negativo'],
        required: [true, 'Kilometraje requerido']
    },
    // tipo de combustible
    fuel_type: {
        type: String,
        enum: [
            'gasolina',
            'diesel',
            'gasoil'
        ],
        lowercase: true,
        required: [true, 'Tipo de combustible requerido']
    },
    // potencia
    horsepower: {
        type: Number,
        required: [true, 'Potencia requerida']
    },
    // transmisión
    transmission: {
        type: String,
        enum: [
            'automático',
            'manual'
        ],
        lowercase: true,
        required: [true, 'Transmisión requerida']
    },
    // precio
    price: {
        type: Number,
        min: [0, 'El precio no puede ser negativo'],
        required: [true, 'Precio requerido']
    },
    // equipamiento
    equipment: [
        {
            type: String,
            lowercase: true
        }
    ],
    // fotos del coche
    pictures: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Picture'
        }
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('Car', CarSchema)