require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const {CLIENT_ORIGIN} = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const plantsRouter = require('./plants/plants-router')
//const favoritesRouter = require('./favorites/favorites-router')
const app = express()
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/plants', plantsRouter)
//app.use('/api/favorites', favoritesRouter)
/*
app.get('/api/*', (req, res) => {
    console.log('The root path was called');
    res.send('get request in app js works')
});
*/

app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
     response = { error: { message: 'server error' } }
   } else {
     console.error(error)
     response = { message: error.message, error }
   }
   res.status(500).json(response)
 })

module.exports = app