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
				filteredRecipes: [action.payload],
			}

		default:
			break
	}
}

export default rootReducer
