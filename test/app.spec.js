//const { expect } = require('chai')
//const supertest = require('supertest')
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/api/')
      .expect(200)
  })

  
})