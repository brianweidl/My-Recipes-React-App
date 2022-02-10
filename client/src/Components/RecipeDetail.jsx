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

	useEffect(() => {
		const getRecipeById = async () => {
			setLoading(true)
			const recipeRequest = await axios.get(
				`http://localhost:3001/recipes/${id}`
			)
			setRecipe(recipeRequest.data)

			setLoading(false)
		}
		getRecipeById()
	}, [id])

	const getSummary = () => {
		if (recipe.summary) {
			return recipe.summary.replace(/<[^>]+>/g, '')
		}
	}

	return (
		<div>
			<Header />
			<Link to="/recipes">Back to recipes</Link>
			{loading ? (
				<span>Loading...</span>
			) : (
				<div>
					<h1>{recipe.title}</h1>
					<img src={recipe.image} alt="recipe"></img>
					<p>{getSummary()}</p>
					<ul>
						{recipe.diets &&
							recipe.diets.map((diet) => {
								return <li key={diet.id}>{diet}</li>
							})}
					</ul>
					<div>Health Score : {recipe.healthScore}</div>
					<div>Score : {recipe.score}</div>
					<ul>
						{recipe.steps &&
							recipe.steps !== 'No steps available' &&
							recipe.steps.map((step, index) => {
								return (
									<li key={index}>
										Step {index + 1}:{step}
									</li>
								)
							})}
					</ul>
				</div>
			)}
		</div>
	)
}

export default RecipeDetail
