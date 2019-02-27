const mongoose = require('mongoose')
const Schema = mongoose.Schema

let VehicleSchema = new Schema({
    type: {
        type: String,
        enum: [
            'car',
            'motorcycle'
        ],
        lowercase: true,
        required: [true, 'Tipo requerido']
    },
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
            'land rover',
            'lexus',
            'maserati',
            'mazda',
            'mercedes-benz',
            'mini',
            'mitsubishi',
            'nissan',
            'opel',
            'peugeot',
            'porsche',
            'renault',
            'saab',
            'seat',
            'skoda',
            'smart',
            'ssangyong',
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
    model: {
        type: String,
        lowercase: true,
        required: [true, 'Modelo requerido']
    },
    description: {
        type: String,
        lowercase: true,
        required: [true, 'Descripción requerida']
    },
    color: {
        type: String,
        lowercase: true,
        required: [true, 'Color requerido']
    },
    year: {
        type: Number,
        min: [1968, 'El año debe ser mayor a 1980'],
        required: [true, 'Año de matriculación requerido']
    },
    kilometers: {
        type: Number,
        min: [0, 'El kilometraje no puede ser negativo'],
        default: 0,
        required: [true, 'Kilometraje requerido']
    },
    fuel_type: {
        type: String,
        enum: [
            'diesel',
            'gas',
            'gasolina',
            'gasoil',
            'híbrido'
        ],
        lowercase: true,
        required: [true, 'Tipo de combustible requerido']
    },
    horsepower: {
        type: Number,
        min: [0, 'La potencia no puede ser negativa'],
        default: 0,
        required: [true, 'Potencia requerida']
    },
    transmission: {
        type: String,
        enum: [
            'automático',
            'manual'
        ],
        lowercase: true,
        required: [true, 'Transmisión requerida']
    },
    price: {
        type: Number,
        min: [0, 'El precio no puede ser negativo'],
        required: [true, 'Precio requerido']
    },
    features: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feature'
        }
    ],
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }
    ],
    featured_picture: {
        type: String
    },
    pictures: [
        {
            type: String
        }
    ],
    cylinders: {
        type: Number,
        min: [0, 'La cilindrada no puede ser negativa'],
        default: 0
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Vehicle', VehicleSchema)