module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: 'https://plant-parenthood-api.herokuapp.com/',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/pp-plants',
  }

  //'https://plant-parenthood-app-pyistkv2r.now.sh/'