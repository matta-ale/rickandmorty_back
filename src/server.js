const express = require('express')
const server = express()
const morgan = require('morgan')
const cors = require('cors');
const router = require('./routes/index')

server.use(morgan('dev'))
//este middleware de abajo es para manejar las CORS, que son cuestiones de seguridad implementadas por el navegador
server.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*'); //qué dominio puede entrar al server? asterisco es todos
    res.header('Access-Control-Allow-Credentials', 'true'); //permitir envío de cookies y credenciales para auth
    res.header(//qué tipo de headers se puecen mandar
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    ); 
    res.header( //métodos http
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next(); //pasa al siguiente middleware
 });

 //todo ese choclo de las cors se puede reemplazar por
 //const cors = require('cors');
 //server.use(cors()), el choclo es estándar y está implementado en cors()

server.use(express.json()) //cada uno de estos middlewares enlatados tiene el next() metido adentro para ir al siguiente

server.use('/rickandmorty', router)

module.exports = server