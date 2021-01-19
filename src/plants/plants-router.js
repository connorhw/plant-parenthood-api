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

plantsRouter
    .route('/:id')
    //.all(requireAuth)
    .all((req, res, next) => {
      PlantsService.getById(
        req.app.get('db'),
        req.params.id
      )
        .then(plant => {
          if(!plant) {
            return res.status(404).json({
              error: { message: `Plant doesn't exist` }
            })
          }
          res.plant = plant
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(serializePlant(res.plant))
    })
    .delete((req, res, next) => {
      PlantsService.deletePlant(
        req.app.get('db'),
        req.params.id
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
      const { plant_name, water_day, water_week, rec_env, fert_type, when_repot, maint_level, fun_fact, fav } = req.body
      const plantToUpdate = { plant_name, water_day, water_week, rec_env, fert_type, when_repot, maint_level, fun_fact, fav }

      const numberOfValues = Object.values(plantToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must contain a new value for at least one of the plant page values`
          }
        })
      PlantsService.updatePlant(
        req.app.get('db'),
        req.params.id,
        plantToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })

module.exports = plantsRouter