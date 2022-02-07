const initialState = {
	allRecipes: [],
	filteredRecipes: [],
	diets: [],
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_DIETS':
			return {
				...state,
				diets: [...action.payload],
			}
		case 'GET_RECIPES':
			return {
				...state,
				allRecipes: [...action.payload],
				filteredRecipes: [...action.payload],
			}
		case 'FILTER_BY_DIET':
			if (action.payload === 'ALL') {
				return { ...state, filteredRecipes: [...state.allRecipes] }
			}
			let filteredByDiet = state.filteredRecipes.filter((recipe) =>
				recipe.diets.includes(action.payload.toLowerCase())
			)
			return {
				...state,
				filteredRecipes: filteredByDiet,
			}
		case 'FILTER_ALPHABETICALLY':
			console.log('alpha')
			if (action.payload === 'a-z' || action.payload === '') {
				let filterAZ = state.filteredRecipes.sort((a, b) => {
					if (a.title.toLowerCase() > b.title.toLowerCase()) {
						return 1
					}
					if (b.title.toLowerCase() > a.title.toLowerCase()) {
						return -1
					}
					return 0
				})

				return {
					...state,
					filteredRecipes: filterAZ,
				}
			} else {
				let filterZA = state.filteredRecipes.sort((a, b) => {
					if (a.title.toLowerCase() > b.title.toLowerCase()) {
						return -1
					}
					if (b.title.toLowerCase() > a.title.toLowerCase()) {
						return 1
					}
					return 0
				})

				return {
					...state,
					filteredRecipes: filterZA,
				}
			}
		case 'FILTER_SCORE':
			console.log('score')
			let filteredByScore = state.filteredRecipes.sort((a, b) => {
				return b.score - a.score
			})

			console.log(filteredByScore)

			return {
				...state,
				filteredRecipes: [...filteredByScore],
			}
		case 'FILTER_BY_NAME':
			let recipesFound = state.allRecipes.filter((recipe) =>
				recipe.title.toUpperCase().includes(action.payload.toUpperCase())
			)
			return {
				...state,
				filteredRecipes: recipesFound,
			}

		default:
			return {
				...state,
			}
	}
}

export default rootReducer
