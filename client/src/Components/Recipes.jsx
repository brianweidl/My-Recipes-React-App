import React from 'react'
import { Link } from 'react-router-dom'

function Recipes({ recipes }) {
	return (
		<>
			<div>Recipes</div>

			{recipes.map((recipe) => (
				<ul>
					<li>{recipe.title}</li>
					<Link
						to={{
							pathname: `/recipe-detail/${recipe.id}`,
						}}
					>
						Detail
					</Link>
				</ul>
			))}
		</>
	)
}

export default Recipes
