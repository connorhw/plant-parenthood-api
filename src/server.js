const app = require('./app')
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const knex = require('knex')
const { DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

/*
app.get('/api/*', (req, res) => {
  res.json({ok: true});
});
*/

app.set('db', db)

app.listen(PORT, () => console.log(`Listening on port ${PORT} for plant-parenthood-api.`));
