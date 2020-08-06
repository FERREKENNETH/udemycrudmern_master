const {Router} = require('express')
const router = Router()

const EmpleadoCrtl = require('../controllers/Empleado.controller')

const Auth = require('../helper/Auth')

router.post('/crear', Auth.verificartoken, EmpleadoCrtl.crearEmpleado)

router.get('/listar', Auth.verificartoken, EmpleadoCrtl.listar)

router.get('/listar/:id', Auth.verificartoken, EmpleadoCrtl.listarid)

router.get('/listarporjefe/:id', Auth.verificartoken, EmpleadoCrtl.empleadosporjefe)

router.delete('/eliminar/:id', Auth.verificartoken, EmpleadoCrtl.eliminar)

router.get('/buscar/:nombre', Auth.verificartoken, EmpleadoCrtl.buscarempleado) // por nombre



module.exports= router