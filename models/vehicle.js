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
            'Aeon',
            'Adly',
            'Alfer',
            'Aprilia',
            'Atala',
            'Bajaj',
            'Benelli',
            'Beta',
            'Bimota',
            'BJR',
            'Bombardier',
            'Buell',
            'Bultaco',
            'Cagiva',
            'Colibrí',
            'CSR',
            'Daelim',
            'Derbi',
            'DKW',
            'Ducati',
            'Factory Bike',
            'Fantic',
            'Gasgas',
            'Gilera',
            'Hanway',
            'Harley Davidson',
            'HM',
            'HRD',
            'Husaberg',
            'Husqvarna',
            'Hyosung',
            'Indian',
            'Italjet',
            'Kawasaki',
            'Keeway',
            'KTM',
            'Kymco',
            'Lambretta',
            'Laverda',
            'Leonart',
            'LML',
            'Malaguti',
            'Mecatecno',
            'Merlin',
            'Mobylette',
            'Moto Guzzi',
            'Motogac',
            'Piaggio',
            'Universal Motor',
            'Yamaha'
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
        min: [1980, 'El año debe ser mayor a 1980'],
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
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('Vehicle', VehicleSchema)