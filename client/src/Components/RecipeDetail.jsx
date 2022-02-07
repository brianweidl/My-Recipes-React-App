import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'

function RecipeDetail() {
	const { id } = useParams()
	const [recipe, setRecipe] = useState({})
	const [loading, setLoading] = useState(false)
	console.log(id)

	useEffect(() => {
		const getRecipeById = async () => {
			setLoading(true)
			const recipeRequest = await axios.get(
				`http://localhost:3001/recipes/${id}`
			)
			setRecipe(recipeRequest.data)
			console.log(recipe)
			setLoading(false)
		}
		getRecipeById()
	}, [id])
	console.log(recipe)
	return (
		<>
			<Header />
			<Link to="/recipes">Back to recipes</Link>
			{loading ? <span>Loading...</span> : <div>{recipe.title}</div>}
		</>
	)
}

export default RecipeDetail
