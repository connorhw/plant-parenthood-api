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
    /*
      getById(knex, id) {
        return knex
          .from('blogful_comments')
          .select('*')
          .where('id', id)
          .first()
      },
    
      deleteComment(knex, id) {
        return knex('blogful_comments')
          .where({ id })
          .delete()
      },
    
      updateComment(knex, id, newCommentFields) {
        return knex('blogful_comments')
          .where({ id })
          .update(newCommentFields)
      },
      */
     serializePlant(plant) {
      //const { author } = article
      return {
        id: plant.id,
        plant_name: xss(plant.plant_name),
        water_per_day: plant.water_per_day,
        water_per_week: plant.water_per_week,
        environment: plant.environment,
        soil_fert: plant.soil_fert,
        repot: plant.repot,
        maintenance_level: plant.maintenance_level,
        fun_fact: plant.fun_fact,
        fav: plant.fav
      }
    },
}
module.exports = PlantsService