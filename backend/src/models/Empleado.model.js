const mongoose = require('mongoose')

const {Schema} = mongoose

const EmpleadoSchema = new Schema ({
    nombre: {
        type: String,
        trim: true
    },
    apellidos: {
        type: String,
        trim: true
    },
    identificacion: {
        type: String,
        trim: true
    },
    puesto: {
        type: String,
        trim: true
    },
    tcontrato: {
        type: String,
        trim: true
    },
    jefe: {
        type: String,
        trim: true
    }
})

module.exports=mongoose.model('usuario', EmpleadoSchema)