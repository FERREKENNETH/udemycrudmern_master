import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'

export default function Actualizar(props) {

    const [nombre, setnombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [puesto, setPuesto] = useState('')
    const [tcontrato, setTcontrato] = useState([])
    const opcionesContrato = ['Fijo', 'Temporal', 'Practicas']

    useEffect(() => {
        obtenerEmpleado()
    }, [])


    const obtenerEmpleado = async () => {

        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/empleado/listar/' + id,
            {
                headers: { 'autorizacion': token }
            })

        console.log(respuesta.data)

        setnombre(respuesta.data.nombre)
        setApellidos(respuesta.data.apellidos)
        setIdentificacion(respuesta.data.identificacion)
        setPuesto(respuesta.data.puesto)
        setTcontrato(respuesta.data.tcontrato)
    }

    const actualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const empleado = {
            nombre,
            apellidos,
            identificacion,
            puesto,
            tcontrato
        }
        const respuesta = await Axios.put('http://localhost:4000/empleado/actualizar/' + id, empleado,
            {
                headers: { 'autorizacion': token }
            }
        )
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        window.location.href = '/index'

    }

    return (
        <div className="container col-md-6 mt-4">
            <div className="card">
                <div className="card-header">
                    <h3 >Editar Empleado</h3>
                    <div className="card-body">
                        <form onSubmit={actualizar}>

                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    onChange={(e) => setnombre(e.target.value)}
                                    value={nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellidos</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setApellidos(e.target.value)}
                                    value={apellidos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Identificacion</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setIdentificacion(e.target.value)}
                                    value={identificacion}
                                />
                            </div>
                            <div className="form-group">
                                <label>Puesto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setPuesto(e.target.value)}
                                    value={puesto}
                                />
                            </div>


                            <div className="form-group">
                                <label>Tipo de contrato</label>

                                <select
                                    className="form-control"
                                    onChange={(e) => { setTcontrato(e.target.value) }}
                                    value={tcontrato}
                                >
                                    {
                                        opcionesContrato.map(tcontrato => (
                                            <option key={tcontrato}>
                                                {tcontrato}
                                            </option>
                                        ))
                                    }
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
    )
}
