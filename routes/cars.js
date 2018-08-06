const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const Car = require('../models/car')
//middleware para manejar formularios multipart
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        let filename = Date.now()
        switch (file.mimetype) {
            case 'image/png':
            filename = filename + ".png"
            break;
            case 'image/jpeg':
            filename = filename + ".jpeg"
            break;
        }
        cb(null, filename);
    }
  })
   
const upload = multer({ storage: storage })

// obtener coches
router.get('/', (req, res) => {
    
    Car.find({}, {
        make: 1,
        model: 1, 
        year: 1, 
        fuel_type: 1, 
        horsepower: 1, 
        kilometers: 1, 
        transmission: 1, 
        price: 1,
        pictures: 1
    }).exec((err, cars) => {

        if (err) return console.error(err)

        res.send(cars)
    })
    //req.query contiene la query que se arma con los filtros para la búsqueda de los coches
})

// obtener las marcas disponibles de los coches
router.get('/makes', async (req, res) => {
    Car.find({}, {
        _id: 0,
        make: 1
    }).exec((err, cars) => {

        if (err) return console.error(err)

        let makes = cars.map((car) => car.make)

        // ordena los nombres de las marcas disponibles
        makes = makes.sort((a, b) => {
            if (a > b) return 1;
        })

        // quita las marcas repetidas utilizando Set
        makes = [ ...new Set(makes) ]

        res.send(makes)
    })
})

// obtener coche en específico
router.get('/:id', (req, res) => {
    
    Car.find({_id: req.params.id})
    .exec((err, car) => {
        if (err) return console.error(err)

        res.send(car)
    })
})

// crear coche
router.post('/', upload.array('pictures'), async (req, res) => {

    const fields = req.body
    const pictures = req.files.map((pic) => `static/${pic.filename}`)
    
    // crea el coche
    let car = new Car({
        make: fields.make,
        model: fields.model,
        year: parseInt(fields.year),
        kilometers: parseInt(fields.kilometers),
        fuel_type: fields.fuel_type,
        horsepower: parseInt(fields.horsepower),
        transmission: fields.transmission,
        price: parseInt(fields.price),
        pictures: pictures
    })

    let newCar

    // guarda el coche en la db
    try {
        newCar = await car.save()
    } catch (err) {
        console.log(err)
    }

    res.send(newCar)
})

// actualizar coche
router.put('/:id', (req, res) => {
    res.send('pediste editar un coche')
})

router.delete('/:id', (req, res) => {

    // mejorar la implementacion del borrado
    Car.deleteOne({ _id: req.params.id }, (err, res) => {
        if(err) return console.log(err)
    })
})

module.exports = router