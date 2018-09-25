const mongoose = require('mongoose')
const Schema = mongoose.Schema

// modelo para los vehículos
let VehicleSchema = new Schema({
    // tipo de vehículo
    type: {
        type: String,
        enum: [
            'car',
            'motorcycle'
        ],
        lowercase: true,
        required: [true, 'Tipo requerido']
    },
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
            'hyundai',
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
            'suzuki',
            'toyota',
            'volkswagen',
            'volvo',
            // motos
            'aeon',
            'adly',
            'alfer',
            'aprilia',
            'atala',
            'bajaj',
            'benelli',
            'beta',
            'bimota',
            'bjr',
            'bombardier',
            'buell',
            'bultaco',
            'cagiva',
            'colibrí',
            'csr',
            'daelim',
            'derbi',
            'dkw',
            'ducati',
            'factory bike',
            'fantic',
            'gasgas',
            'gilera',
            'hanway',
            'harley davidson',
            'hm',
            'hrd',
            'husaberg',
            'husqvarna',
            'hyosung',
            'indian',
            'italjet',
            'kawasaki',
            'keeway',
            'ktm',
            'kymco',
            'lambretta',
            'laverda',
            'leonart',
            'lml',
            'malaguti',
            'mecatecno',
            'merlin',
            'mobylette',
            'moto Guzzi',
            'motogac',
            'piaggio',
            'universal motor',
            'yamaha'
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
    // descripción
    description: {
        type: String,
        lowercase: true,
        required: [true, 'Descripción requerida']
    },
    // color
    color: {
        type: String,
        enum: [
            'blanco',
            'bronce',
            'celeste',
            'champagne',
            'negro',
            'naranja',
            'gris/plata',
            'azul',
            'rojo',
            'amarillo',
            'verde',
            'beige',
            'rosado',
            'marrón',
            'morado',
            'lima',
            'vinotinto'
        ],
        lowercase: true,
        required: [true, 'Color requerido']
    },
    // año
    year: {
        type: Number,
        min: [1968, 'El año debe ser mayor a 1980'],
        required: [true, 'Año de matriculación requerido']
    },
    // kilometros
    kilometers: {
        type: Number,
        min: [0, 'El kilometraje no puede ser negativo'],
        default: 0,
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
        min: [0, 'La potencia no puede ser negativa'],
        default: 0,
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
    // características
    features: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feature'
        }
    ],
    // servicios
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }
    ],
    featured_picture: {
        type: String
    },
    // fotos del vehículo
    pictures: [
        {
            type: String
        }
    ],
    // cilindrada
    cylinders: {
        type: Number,
        min: [0, 'La cilindrada no puede ser negativa'],
        default: 0,
        required: [true, 'Cilindrada requerida']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Vehicle', VehicleSchema)