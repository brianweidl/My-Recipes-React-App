import axios from 'axios'
import React from 'react'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipes } from '../Actions/Actions'

function Recipes() {
	const dispatch = useDispatch()
	useEffect(() => {
		const getAllRecipes = async () => {
			const allRecipes = await axios.get('http://localhost:3001/recipes')
			dispatch(getRecipes(allRecipes.data))
		}
		getAllRecipes()
	}, [])
	return <div>Recipes</div>
}

export default Recipes
