const { Router } = require('express')
const router = Router()

const EmpleadoCrtl = require('../controllers/Empleado.controller')

/* const Auth = require('../helper/Auth') */

router.post('/crear', EmpleadoCrtl.crearEmpleado)

router.get('/listar', EmpleadoCrtl.listar)

router.get('/listar/:id', EmpleadoCrtl.listarid)

router.get('/listarporjefe/:id', EmpleadoCrtl.empleadosporjefe)

router.delete('/eliminar/:id', EmpleadoCrtl.eliminar)

router.get('/buscar/:nombre', EmpleadoCrtl.buscarempleado) // por nombre



module.exports = router