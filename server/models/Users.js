const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        uppercase:true

    }, 
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    }
},
    {
        timestamps: true
    }
)
    
module.exports = mongoose.model('Users', usersSchema)