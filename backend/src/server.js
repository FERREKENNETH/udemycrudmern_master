const express    = require('express')
const app        = express()
const morgan     = require('morgan')
const cors       = require('cors')
const bodyparser = require('body-parser')
                   require('./database')

app.set('Port', 4000)

app.use(morgan('dev'))

app.use(bodyparser.urlencoded({extended:true}))

app.use(bodyparser.json())

app.use(cors({origen:'*'}))

// RUTAS JEFE
app.use('/jefe', require('./routes/Jefe.route'))

// RUTAS EMPLEADO 
app.use('/empleado', require('./routes/Empleado.route'))


app.listen(app.get('Port'), ()=> {
    console.log('Servidor escuchando por el puertoo ', app.get('Port'))
})