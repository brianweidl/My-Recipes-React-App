import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../Styles/Recipes.module.css";

function Recipes({ recipes }) {
	const totalRecipes = useSelector((state) => state.filteredRecipes);

	const getDietsForCard = (diets) => {
		let dietsForCard = [];
		for (let i = 0; i < 3; i++) {
			dietsForCard.push(diets[i]);
		}
		dietsForCard.push(`and ${diets.length - 3} more`);
		return (
			<ul className={styles.recipeCard_dietsContainer}>
				{dietsForCard.map((diet, index) => {
					return (
						<li className={styles.dietsContainer_dietElement} key={index}>
							{diet}
						</li>
					);
				})}
			</ul>
		);
	};
	return (
		<>
			<div className={styles.resultsSpan}>
				Results {totalRecipes.length}{" "}
				{totalRecipes.length <= 1 ? (
					<span>Recipe found</span>
				) : (
					<span>Recipes found</span>
				)}
			</div>

			<div className={styles.recipeContainer}>
				{recipes.length ? (
					recipes.map((recipe) => (
						<div key={recipe.id} className={styles.recipeCard}>
							<div className={styles.recipeCard_title}>
								<h3>{recipe.title}</h3>
							</div>
							<img
								src={recipe.image}
								alt="Recipe"
								className={styles.recipeCard_image}
							/>
							{recipe.diets.length < 4 ? (
								<ul className={styles.recipeCard_dietsContainer}>
									{recipe.diets.map((diet, index) => {
										return (
											<li key={index} className={styles.dietsContainer_dietElement}>
												{diet}{" "}
											</li>
										);
									})}
								</ul>
							) : (
								getDietsForCard(recipe.diets)
							)}

							<Link
								className={styles.recipeCard_learnMore}
								to={{
									pathname: `/recipe-detail/${recipe.id}`,
								}}
							>
								Learn More
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
	);
}

export default Recipes;
