const express = require('express')
const xss = require('xss')
const plantsRouter = require('../plants/plants-router')
const FavoritesService = require('./favorites-service')


const FavoritesRouter = express.Router()
//const jsonParser = express.json()

plantsRouter
    .route('/favorites')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        
    })