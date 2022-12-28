const express = require('express');
const {dbConnection} = require('./db/config')
require('dotenv').config();

//servidor express
const app = express();

//base de datos
dbConnection();

//Directorio publico
app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json() );

// auth// crear, login, renew token
app.use('/api/auth', require('./routes/auth') );
//TODO: CRUD: Eventos

//Escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});