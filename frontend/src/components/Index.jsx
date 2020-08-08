import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Index() {

    const [empleados, setEmpleados] = useState([])

    const [nombre, setnombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [puesto, setPuesto] = useState('')
    const [tcontrato, setTcontrato] = useState('')

    const opcionesContrato = ['Fijo', 'Temporal', 'Practicas']

    useEffect(() => {
        obtenerEmpleados()
        /* creo que no sirbe para nada! setTcontrato() */
    }, [])

    const obtenerEmpleados = async () => {

        const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')

        const respuesta = await Axios.get(
            'http://localhost:4000/empleado/listarporjefe/' + id,
            {
                headers: { 'autorizacion': token }
            }
        )
        console.log(respuesta.data)
        setEmpleados(respuesta.data)
    }

    const guardar = async (e) => {
        console.log('holaaaa')
        e.preventDefault()
        const nuevoempleado = {
            nombre,
            apellidos,
            identificacion,
            puesto,
            tcontrato,
            jefe: sessionStorage.getItem('idusuario')/* el objeto que esta logueado, es el que añada el empleado!  */
        }
        /* instanciamos el token, ya que para hacer la peticion post necesitamos el token! */
        const token = sessionStorage.getItem('token')
        /* acemos la peticion */
        const respuesta = await Axios.post('http://localhost:4000/empleado/crear', nuevoempleado, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
        })
        /* igual funcionalidad que timer:1500 */
        setTimeout(() => {
            window.location.href = '/index'
        }, 1500)


    }

    const eliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('http://localhost:4000/empleado/eliminar/' + id, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        obtenerEmpleados()


    }

    /* BUSCAR POR NOMBRE! */
    const buscar = async (e) => {
        if (e.target.value === '') {
            return obtenerEmpleados()
        }
        console.log('desde buscar')
        const inputValueName = e.target.value
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/empleado/buscar/' + inputValueName,
            { headers: { 'autorizacion': token } }
        )
        setEmpleados(respuesta.data)
    }


    return (
        <Fragment>

            <header className="py-2 bg-primary text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className="fas fa-pencil-alt"></i> Empleados</h1>
                        </div>
                    </div>
                </div>
            </header>


            {/* BUSCADOR */}
            <nav className=" navbar py-4">
                <div className="container">
                    <div className="col-md-3">
                        <Link to="#"
                            className="btn btn-primary btn-block"
                            data-toggle='modal'
                            data-target="#addEmpleado"
                        >
                            <i className="fas fa-plus"></i> Add Empleado
                        </Link>
                    </div>
                    <div className="col-md-6 ml-auto">
                        <div className="input-group">
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="Buscar"
                                aria-label="Search"
                                onChange={(e) => buscar(e)}
                            />
                        </div>
                    </div>
                </div>

            </nav>


            {/* Mostrar Empleados */}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Empleados de {sessionStorage.getItem('nombre')} </h4>
                                </div>
                                <table className="table table-responsive-lg table-striped">
                                    <thead className="thead-dark">
                                        <tr className="text-center">
                                            <th >#</th>
                                            <th>Nombre</th>
                                            <th>Apellidos</th>
                                            <th>Identificacion</th>
                                            <th>Tipo de Contrato</th>
                                            <th>Puesto</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            empleados.map((empleado, i) => (
                                                <tr key={empleado._id} className="text-center">
                                                    <td>{i + 1}</td>
                                                    <td>{empleado.nombre}</td>
                                                    <td>{empleado.apellidos}</td>
                                                    <td>{empleado.identificacion}</td>
                                                    <td>{empleado.tcontrato}</td>
                                                    <td>{empleado.puesto}</td>
                                                    <td>
                                                        <button className="btn btn-danger mr-1" onClick={() => eliminar(empleado._id)}>Eliminar</button>
                                                        <Link
                                                            className="btn btn-warning mr-1 "
                                                            to={"/actualizar/" + empleado._id}>Editar</Link>
                                                    </td>
                                                </tr>
                                            ))

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODAL */}

            <div className="modal fade" id="addEmpleado">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Add Empleado</h5>
                            <button className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardar}>

                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        onChange={(e) => setnombre(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellidos</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setApellidos(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Identificacion</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setIdentificacion(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Puesto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setPuesto(e.target.value)}
                                    />
                                </div>


                                <div className="form-group">
                                    <label>Tipo de contrato</label>

                                    <select className="form-control" onChange={(e) => { setTcontrato(e.target.value) }}>
                                        {

                                            opcionesContrato.map(tcontrato => (
                                                <option key={tcontrato}>
                                                    {tcontrato}
                                                </option>
                                            ))
                                        }
                                        {/*otra opcion un poco mas estatica:
                                        <option key="fijo"> Fijo </option>
                                        <option key="temporal"> Temporal </option>
                                        <option key="practicas"> Practicas </option> */}

                                    </select>

                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary " type="submit">Guardar</button>
                                </div>
                            </form>


                        </div>
                    </div>


                </div>
            </div>


        </Fragment>
    )

}