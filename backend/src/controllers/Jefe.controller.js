const JefeCtrl = {}
const Jefe = require('../models/Jefe.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// CREAR UN NUEVO USUARIO
JefeCtrl.crearJefe = async (req, res) => {
    const {nombre, correo, password} = req.body
    const NuevoJefe = new Jefe({
        nombre, 
        correo, 
        password
    })
    const correojefe= await Jefe.findOne({correo:correo})

    if (correojefe){
        res.json({
            mensaje:'El correo ya existe'
        })
    } else {
        NuevoJefe.password = await bcrypt.hash(password,10)
        const token = jwt.sign({_id:NuevoJefe._id}, 'palabrasecreta')
        await NuevoJefe.save()
        res.json({
            mensaje:'Bienvenido',
            id: NuevoJefe._id,
            nombre:NuevoJefe.nombre,
            token
        })
    }
}


// LOGUEAR USUARIO
JefeCtrl.login = async (req,res) =>{
    const {correo, password} = req.body

    const jefe = await Jefe.findOne({correo: correo})
    if(!jefe){
        return res.json({
            mensaje: 'correo incorrecto',
            datos: jefe
        })
    } 
    const match = await bcrypt.compare(password, jefe.password)
    if (match) {
        const token = jwt.sign({_id:Jefe._id}, 'palabrasecreta')
        res.json({
            mensaje: 'Bienvenido',
            id:jefe._id,
            nombre:jefe.nombre,
            correo:correo,
            password:password,
            token:token
        })
    } else {
        res.json({
            mensaje: 'Contraseña incorrecta'
        })
    }
}

module.exports = JefeCtrl