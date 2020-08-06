const mongoose = require('mongoose')
const {Schema} = mongoose;

const JefeSchema = new Schema ({
    nombre: {
        type: String,
        trim: true
    },
    correo: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    }
})

module.exports=mongoose.model('jefe', JefeSchema)