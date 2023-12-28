const mongoose = require('mongoose')
const todosSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        uppercase:true

    }, 
    tags: {
        type: Array,
        required: true,
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    }
},
    {
        timestamps: true
    }
)
    
module.exports = mongoose.model('Todos', todosSchema)