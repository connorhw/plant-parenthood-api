const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} for plant-parenthood-api.`));

module.exports = {app};