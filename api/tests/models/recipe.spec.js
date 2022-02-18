const { Recipe, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('Recipe model', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err)
		})
	)
	describe('Validators', () => {
		beforeEach(() => Recipe.sync({ force: true }))
		describe('title', () => {
			it('should throw an error if title is null', (done) => {
				Recipe.create({})
					.then(() => done(new Error('It requires a valid title')))
					.catch(() => done())
			})
			it('should work when its a valid title and has a summary', (done) => {
				Recipe.create({
					title: 'Milanesa a la napolitana',
					summary:
						'La milanesa a la napolitana es un plato típico de la gastronomía rioplatense propia de Argentina y Uruguay.',
				})
					.then(() => done())
					.catch(() =>
						done(
							new Error(
								'It should create a recipe if it has a title and a summary'
							)
						)
					)
			})
		})
		describe('summary', () => {
			it('should throw an error if the recipe has a title but does not have a summary', (done) => {
				Recipe.create({
					title: 'Milanesa a la napolitana',
				})
					.then(() => done(new Error('It requires a valid summary')))
					.catch(() => done())
			})
		})
		describe('healthScore', () => {
			it('should throw an error if healthScore is not a floating-point number', (done) => {
				Recipe.create({
					title: 'Milanesa a la napolitana',
					summary:
						'La milanesa a la napolitana es un plato típico de la gastronomía rioplatense propia de Argentina y Uruguay.',
					healthScore: true,
				})
					.then(() =>
						done(new Error('healthScore needs to be a floating-point number'))
					)
					.catch(() => done())
			})
		})
	})
})
