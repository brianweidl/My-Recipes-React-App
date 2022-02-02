const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diets } = require('../db.js')
const data = require('../data.js')

const formatApiSteps = (el) => {
	if (el.analyzedInstructions[0]) {
		let formatSteps = el.analyzedInstructions[0].steps.reduce((a, b) => {
			let newStep = b.step
			return a + '|' + newStep
		}, '')
		formatSteps = formatSteps.split('|')
		formatSteps.shift()

		return formatSteps
	} else return 'No steps available'
}
const getApiRecipes = () => {
	let formatRecipes = data.results.map((el) => {
		return {
			title: el.title,
			id: el.id,
			summary: el.summary,
			healthScore: el.healthScore,
			score: el.spoonacularScore,
			image: el.image,
			steps: formatApiSteps(el),
			diets: el.diets,
		}
	})
	return formatRecipes
}
const getDbRecipes = async () => {
	let dbRecipes = await Recipe.findAll({ include: Diets })
	console.log(dbRecipes)
	return dbRecipes
}
const getAllRecipes = async () => {
	const apiRecipes = await getApiRecipes()
	const dbRecipes = await getDbRecipes()
	const allRecipes = dbRecipes.concat(apiRecipes)
	return allRecipes
}

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/types', async (req, res) => {
	let diets = ['vegetarian']
	data.results.forEach((el) => {
		el.diets.forEach((diet) => {
			if (diet && !diets.includes(diet)) {
				diets.push(diet)
			}
		})
	})
	let formattedDiets = diets.map((diet) => {
		return {
			name: diet,
		}
	})
	try {
		let dietsCreated = await Diets.bulkCreate(formattedDiets)
		res.json(dietsCreated)
	} catch (error) {
		res.send(error)
	}
})

//{"title":"foodie", "summary":"food to eat","healthScore": 86.5, "score": 100.0, "steps": " |prepare  food | eat food", "diets": ["vegetarian","gluten free"]  }
router.post('/recipe', async (req, res) => {
	const { title, summary, healthScore, score, image, steps, diets } = req.body
	try {
		let recipe = await Recipe.create({
			title,
			summary,
			healthScore,
			score,
			image,
			steps,
		})
		const dietsToBeAdded = await Diets.findAll({
			where: {
				name: diets,
			},
		})
		await recipe.addDiets(dietsToBeAdded)
		res.json(recipe)
	} catch (error) {
		res.send(error)
	}
})

router.get('/recipes/', async (req, res) => {
	try {
		const allRecipes = await getAllRecipes()
		if (Object.keys(req.query).length !== 0) {
			const queryRecipe = allRecipes.find(
				(recipe) => recipe.title === req.query.name
			)
			if (queryRecipe) {
				res.json(queryRecipe)
			} else {
				res.json('Recipe not found')
			}
		} else {
			res.json(allRecipes)
		}
	} catch (error) {
		res.send(error)
	}
})

router.get('/recipes/:id', async (req, res) => {
	try {
		const allRecipes = await getAllRecipes()

		let id = req.params.id
		const paramRecipe = allRecipes.find((recipe) => recipe.id == id)
		if (!paramRecipe) {
			res.json('Recipe not found')
		}
		res.json(paramRecipe)
	} catch (error) {
		res.send(error)
	}
})

module.exports = router
