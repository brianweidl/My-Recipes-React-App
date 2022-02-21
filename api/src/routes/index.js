const { Router } = require('express')
const { default: axios } = require('axios')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diets } = require('../db.js')
const data = require('../data.js')
const { YOUR_API_KEY2 } = process.env

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
const getApiRecipes = async () => {
	/* let apiRecipes = await axios.get(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY2}&addRecipeInformation=true&number=100`
	) */

	let formatRecipes = data.results.map((el) => {
		if (el.vegetarian && !el.diets.includes('vegetarian')) {
			el.diets.push('vegetarian')
		}
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
	dbRecipes = JSON.stringify(dbRecipes)
	dbRecipes = JSON.parse(dbRecipes)
	dbRecipes = dbRecipes.map((recipe) => {
		if (recipe.steps) {
			recipe.steps = recipe.steps.split('|')
			recipe.steps.shift()
		}
		recipe.diets = recipe.diets.map((diet) => diet.name)
		return {
			...recipe,
		}
	})

	return dbRecipes
}
const getAllRecipes = async () => {
	const apiRecipes = await getApiRecipes()
	const dbRecipes = await getDbRecipes()

	let allRecipes = dbRecipes.concat(apiRecipes)
	allRecipes = allRecipes.sort((a, b) => {
		if (a.title.toLowerCase() > b.title.toLowerCase()) {
			return 1
		}
		if (b.title.toLowerCase() > a.title.toLowerCase()) {
			return -1
		}
		return 0
	})

	return allRecipes
}

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/types', async (req, res) => {
	let dbDiets = await Diets.findAll()

	if (!dbDiets.length) {
		let diets = ['vegetarian']
		const apiRecipes = await getApiRecipes()
		apiRecipes.forEach((el) => {
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
	} else {
		res.json(dbDiets)
	}
})

//{"title":"foodie", "summary":"food to eat","healthScore": 86.5, "score": 100.0, "steps": " |prepare  food | eat food", "diets": ["vegetarian","gluten free"]  }
//{"title":"foodietwo", "summary":"eat all the food","healthScore": 88.3, "score": 95.0, "steps": " |prepare  food | eat food | live food", "diets": ["vegetarian","gluten free"]  }

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
				res.status(404).json('Recipe not found')
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
			res.status(404).json('Recipe not Found')
		} else {
			res.status(200).json(paramRecipe)
		}
	} catch (error) {
		res.status(404).send('Recipe not Found')
	}
})

module.exports = router
