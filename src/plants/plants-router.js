const path = require('path')
const express = require('express')
const xss = require('xss')
const PlantsService = require('./plants-service')
const { serializePlant } = require('./plants-service')
const { json } = require('express')

const plantsRouter = express.Router()
const jsonParser = express.json()

const serializePlants = plant => ({
    id: plant.id,
    plant_name: xss(plant.plant_name),
    water_day: plant.water_day,
    water_week: plant.water_week,
    rec_env: plant.rec_env,
    fert_type: plant.fert_type,
    when_repot: plant.when_repot,
    maint_level: plant.maint_level,
    fun_fact: plant.fun_fact,
    fav: plant.fav
})

plantsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        PlantsService.getAllPlants(knexInstance)
          .then(plants => {
            console.log(serializePlants)
            res.json(plants.map(serializePlants))
          })
          .catch(next)
      })
      /* trying to implement create plant */
      .post(jsonParser, (req, res, next) => {
        const { plant_name, water_day, water_week, rec_env, fert_type, when_repot, maint_level, fun_fact, fav } = req.body
        const newPlant = { plant_name, water_day, water_week, rec_env, fert_type, when_repot, maint_level, fun_fact, fav }

        for(const [key, value] of Object.entries(newPlant))
            if (value == null)
                return res.status(400).json({
                    error: { message: `You are missing '${key}' in request body` }
                })
        PlantsService.insertPlant(
            req.app.get('db'),
            newPlant
        )
            .then(plant => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${plant.id}`))
                    .json(serializePlant(plant))
            })
            .catch(next)
    })
/*
plantsRouter
    .route('plants/:plant_id')
    //.all(requireAuth)
    .all(checkPlantExists)
    .get((req, res) => {
      res.json(PlantsService.serializeArticle(res.plant))
    })

*/




module.exports = plantsRouter