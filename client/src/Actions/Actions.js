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

export function filterByDiet(diet) {
	return {
		type: 'FILTER_BY_DIET',
		payload: diet,
	}
}

export function filterAlphabetical(alpha) {
	return {
		type: 'FILTER_ALPHABETICALLY',
		payload: alpha,
	}
}

export function filterByScore() {
	return {
		type: 'FILTER_SCORE',
	}
}

export function filterByName(name) {
	return {
		type: 'FILTER_BY_NAME',
		payload: name,
	}
}
