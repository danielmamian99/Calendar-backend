const express = require('express');
const {dbConnection} = require('./db/config')
const cors = require('cors');

require('dotenv').config();

//servidor express
const app = express();

//base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json() );

// auth// crear, login, renew token
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
//Escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});