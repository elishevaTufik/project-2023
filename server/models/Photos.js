const mongoose = require('mongoose')
const photosSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        uppercase:true

    }, 
    imageUrl: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true
    }
)
    
module.exports = mongoose.model('Photos', photosSchema)