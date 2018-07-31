const mongoose = require('mongoose')
const Schema = mongoose.Schema

let PictureSchema = new Schema({
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true,
        default: 'image/png'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Picture', PictureSchema)