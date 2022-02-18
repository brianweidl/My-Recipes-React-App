import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import styles from '../Styles/RecipeDetail.module.css'

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

			{loading ? (
				<span className={styles.loading}>Loading...</span>
			) : (
				<div className={styles.detailContainer}>
					<h1>{recipe.title}</h1>
					<img src={recipe.image} alt="recipe"></img>
					<div className={styles.summaryContainer}>
						<h3>Summary</h3>
						<p className={styles.summaryContent}>{getSummary()}</p>
					</div>
					<div className={styles.dietList}>
						<h3>Diets:</h3>
						<ul>
							{recipe.diets &&
								recipe.diets.map((diet) => {
									return <li key={diet.id}>{diet}</li>
								})}
						</ul>
					</div>
					<div className={styles.scoreContainer}>
						<div className={styles.healthScore}>
							<h2>Health Score</h2> <span>{recipe.healthScore}</span>
						</div>
						<div className={styles.normalScore}>
							<h2>Score </h2>
							<span>{recipe.score}</span>
						</div>
					</div>

					{recipe.steps && recipe.steps !== 'No steps available' && (
						<div className={styles.stepContainer}>
							<h2>Step by Step</h2>
							<ul>
								{recipe.steps.map((step, index) => {
									return (
										<li className={styles.stepList} key={index}>
											<span>Step {index + 1}: </span>
											<span>{step}</span>
										</li>
									)
								})}
							</ul>
						</div>
					)}

					<Link to="/recipes" className={styles.backToLink}>
						Back to recipes
					</Link>
				</div>
			)}
		</div>
	)
}

export default RecipeDetail
