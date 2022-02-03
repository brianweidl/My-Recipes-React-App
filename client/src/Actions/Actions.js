export function getDiets(diets) {
	return {
		type: 'GET_DIETS',
		payload: diets,
	}
}

export function getRecipes(recipes) {
	return {
		type: 'GET_RECIPES',
		payload: recipes,
	}
}
