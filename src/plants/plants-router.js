const path = require('path')
const express = require('express')
const xss = require('xss')
const PlantsService = require('./plants-service')
//const { json } = require('express')

const plantsRouter = express.Router()
//const jsonParser = express.json()

const serializePlants = plant => ({
    plant_id: plant.plant_id,
    plant_name: xss(plant.plant_name),
    water_per_day: plant.water_per_day,
    water_per_week: plant.water_per_week,
    environment: plant.environment,
    soil_fert: plant.soil_fert,
    repot: plant.repot,
    maintenance_level: plant.maintenance_level,
    fun_fact: plant.fun_fact,
    fav: plant.fav
})

plantsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        PlantsService.getAllPlants(knexInstance)
          .then(plants => {
            res.json(plants.map(serializePlants))
          })
          .catch(next)
      })

plantsRouter
    .route('/:plant_id')
    .all(requireAuth)
    .all(checkPlantExists)
    .get((req, res) => {
      res.json(PlantsService.serializeArticle(res.plant))
    })






module.exports = plantsRouter