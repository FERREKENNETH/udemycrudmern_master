const EmpleadoCrtl = {}
const Empleado = require('../models/Empleado.model')

EmpleadoCrtl.crearEmpleado = async(req,res) =>{
    const {nombre,apellidos,identificacion,puesto,tcontrato,jefe} = req.body;
    const nuevoEmpleado = new Empleado({
        nombre,apellidos,identificacion,puesto,tcontrato,jefe
    })

    const respuesta = await nuevoEmpleado.save()
    res.json({
        mensaje: 'Empleado creado correctamente',
        respuesta: respuesta
    })
}

EmpleadoCrtl.listar = async(req,res) => {
    const respuesta = await Empleado.find()
    res.json(respuesta)
}

EmpleadoCrtl.listarid = async (req,res) => {
    const id = req.params.id
    const respuesta = await Empleado.findById({_id:id})
    res.json(respuesta)
}

EmpleadoCrtl.empleadosporjefe = async (req,res) => {
    const id = req.params.id
    const respuesta = await Empleado.find({jefe:id})
    res.json(respuesta)
}


EmpleadoCrtl.eliminar = async (req,res) => {
    const id = req.params.id
    const respuesta = await Empleado.findByIdAndRemove({_id:id})
    res.json({
        respuesta:respuesta,
        mensaje:'Emplado eliminado'
    })
}

EmpleadoCrtl.actualizar = async (req,res) => {
    const id = req.params.id
    const respuesta = await Empleado.findOneAndUpdate({_id:id}, req.body)
    res.json({
        respuesta:respuesta,
        mensaje:'Emplado actualizado'
    })
}

EmpleadoCrtl.buscarempleado = async (req,res) => {
    const nombre = req.params.nombre
    const respuesta = await Empleado.findOne({nombre:{$regex:".*"+nombre+".*"}})
    res.json(respuesta)
}
, 'i'

module.exports = EmpleadoCrtl