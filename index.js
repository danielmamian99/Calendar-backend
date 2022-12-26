const express = require('express');
require('dotenv').config();

//servidor express
const app = express();

//Directorio publico
app.use( express.static('public') );
// auth// crear, login, renew token
app.use('/api/auth', require('./routes/auth') );
//TODO: CRUD: Eventos

//Escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});