import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/Recipes.module.css'

function Recipes({ recipes }) {
	return (
		<div className={styles.recipeContainer}>
			{recipes.length ? (
				recipes.map((recipe, index) => (
					<div key={recipe.id} className={styles.itemRecipe}>
						<h3>{recipe.title}</h3>
						<img src={recipe.image} alt="Recipe" className={styles.recipeImg} />
						<ul>
							Diets:{' '}
							{recipe.diets.map((diet, index) => {
								return <li>{diet}</li>
							})}
						</ul>
						<Link
							to={{
								pathname: `/recipe-detail/${recipe.id}`,
							}}
						>
							Detail
						</Link>
					</div>
				))
			) : (
				<span>No recipes found</span>
			)}
		</div>
	)
}

export default Recipes
