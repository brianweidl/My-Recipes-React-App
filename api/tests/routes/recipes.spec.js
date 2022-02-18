/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Recipe, conn } = require('../../src/db.js')

const agent = session(app)
const recipe = {
	title: 'Milanesa a la napolitana',
	summary:
		'La milanesa a la napolitana es un plato típico de la gastronomía rioplatense propia de Argentina y Uruguay.',
}

describe('Recipe routes', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err)
		})
	)
	beforeEach(() =>
		Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
	)
	describe('GET /recipes', () => {
		it('should get 200', () => {
			return agent.get('/recipes').expect(200)
		})
	})
	describe('GET /recipes/:id', () => {
		it('should get 404 if the parameters id does not exist', () =>
			agent.get('/recipes/84').expect(404))
	})
	describe('GET /types', () => {
		it('should get 200', () => agent.get('/types').expect(200))
	})

	describe('POST /recipe/', () => {
		it('should get 200 when created', () =>
			agent.post('/recipe').send(recipe).expect(200))
	})
	describe('GET /notARoute', () => {
		it('should get 404 if route does not exist', () =>
			agent.get('/notARoute').expect(404))
	})
})
