require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
//const {CLIENT_ORIGIN} = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const plantsRouter = require('./plants/plants-router')
//const favoritesRouter = require('./favorites/favorites-router')
const app = express()
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(morgan(morganSetting))
app.use(cors())
app.use(helmet())
//app.use(cors()) already in server.js

app.use('/api/plants', plantsRouter)

app.use(function errorHandler(error, req, res, next) {
   let response
   if (process.env.NODE_ENV === 'production') {
     response = { error: { message: 'server error' } }
   } else {
     response = { error }
   }
   res.status(500).json(response)
 })

module.exports = app