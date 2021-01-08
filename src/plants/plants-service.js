const PlantsService = {
    getAllPlants(knex) {
        return knex.select('*').from('plants_table')
    },
    /*
    insertComment(knex, newComment) {
        return knex
          .insert(newComment)
          .into('blogful_comments')
          .returning('*')
          .then(rows => {
            return rows[0]
          })
      },
    
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
}
module.exports = PlantsService