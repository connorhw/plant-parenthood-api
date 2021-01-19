const xss = require('xss')

const PlantsService = {
    getAllPlants(knex) {
        return knex.select('*').from('plants_table')
    },

    getById(knex, id) {
      return knex
        .from('plants_table')
        .select('*')
        .where('id', id)
        .first()
    },
    
    insertPlant(knex, newPlant) {
        return knex
          .insert(newPlant)
          .into('plants_table')
          .returning('*')
          .then(rows => {
            return rows[0]
          })
    },

    deletePlant(knex, id) {
      return knex('plants_table')
          .where({ id })
          .delete()
    },
    updatePlant(knex, id, newPlantFields) {
      return knex('plants_table')
          .where({ id })
          .update(newPlantFields)
    },

     serializePlant(plant) {
      //const { author } = article
      return {
        id: plant.id,
        plant_name: xss(plant.plant_name),
        water_day: plant.water_day,
        water_week: plant.water_week,
        rec_env: plant.rec_env,
        fert_type: plant.fert_type,
        when_epot: plant.when_repot,
        maint_level: plant.maint_level,
        fun_fact: plant.fun_fact,
        fav: plant.fav
      }
    },
}
module.exports = PlantsService