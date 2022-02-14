import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../Styles/Recipes.module.css'

function Recipes({ recipes }) {
	const totalRecipes = useSelector((state) => state.filteredRecipes)
	return (
		<>
			{totalRecipes.length === 1 ? (
				<div>Results 1 recipes found</div>
			) : (
				<div>Results {totalRecipes.length} Recipes found</div>
			)}
			<div className={styles.recipeContainer}>
				{recipes.length ? (
					recipes.map((recipe, index) => (
						<div key={recipe.id} className={styles.itemRecipe}>
							<h3>{recipe.title}</h3>
							<img
								src={recipe.image}
								alt="Recipe"
								className={styles.recipeImg}
							/>
							<ul className={styles.dietsList}>
								{recipe.diets.map((diet, index) => {
									return <li key={index}>{diet} </li>
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
					<img
						src="https://media.istockphoto.com/vectors/an-elderly-male-chef-wearing-a-cook-coat-is-depressed-vector-id1173055368?k=20&m=1173055368&s=612x612&w=0&h=fHsy6Xar3oV7qP0HMzsuDhLEFUEfLPL8IGMRxL7sOsg="
						alt="sad chef"
					></img>
				)}
			</div>
		</>
	)
}

export default Recipes
