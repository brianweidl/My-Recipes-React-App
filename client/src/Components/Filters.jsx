import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header.jsx'
import Recipes from './Recipes'
import axios from 'axios'
import {
	getDiets,
	getRecipes,
	filterByDiet,
	filterAlphabetical,
	filterByScore,
	reset,
} from '../Actions/Actions.js'
import NavBar from './NavBar.jsx'

import styles from '../Styles/Filters.module.css'

function Filters() {
	const dispatch = useDispatch()
	const [selectedRadio, setSelectedRadio] = useState('')
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [dietsFiltered, setDietsFiltered] = useState([])
	const recipesShown = 9
	const { diets, filteredRecipes } = useSelector((state) => state)

	console.log(filteredRecipes)

	useEffect(() => {
		const getAllDiets = async () => {
			setLoading(true)

			const allRecipes = await axios.get('http://localhost:3001/recipes')
			const allDiets = await axios.get('http://localhost:3001/types')
			dispatch(getRecipes(allRecipes.data))
			dispatch(getDiets(allDiets.data))
			let radio = document.getElementById('az')
			radio.checked = true

			setLoading(false)
		}
		getAllDiets()
	}, [dispatch])

	const handleSelectChange = (e) => {
		if (e.target.value === '') {
			return
		} else {
			dispatch(filterByDiet(e.target.value))
			if (!dietsFiltered.includes(e.target.value)) {
				setDietsFiltered([...dietsFiltered, e.target.value])
			}
			setCurrentPage(1)
			filterRadioButton()
		}
	}

	const filterRadioButton = () => {
		if (selectedRadio.includes('score')) {
			dispatch(filterByScore(selectedRadio))
		} else {
			dispatch(filterAlphabetical(selectedRadio))
		}
		setCurrentPage(1)
	}
	const resetFilters = () => {
		dispatch(reset())
		setDietsFiltered([])
		let select = document.getElementById('select')
		select.value = 'ALL'
		let radio = document.getElementById('az')
		radio.checked = true
	}

	const nextPage = () => {
		if (currentPage >= filteredRecipes.length / recipesShown) {
			return
		}
		setCurrentPage(currentPage + 1)
	}

	const previousPage = () => {
		if (currentPage === 1) {
			return
		}
		setCurrentPage(currentPage - 1)
	}
	const indexOfLastRecipe = currentPage * recipesShown
	const indexOfFirstRecipe = indexOfLastRecipe - recipesShown
	const currentRecipes = filteredRecipes.slice(
		indexOfFirstRecipe,
		indexOfLastRecipe
	)

	return (
		<div className={styles.mainContainer}>
			<Header />

			<div className={styles.content}>
				<div className={styles.navbar}>
					<NavBar
						selectedRadio={selectedRadio}
						filterRadioButton={filterRadioButton}
						setDietsFiltered={setDietsFiltered}
					></NavBar>
				</div>
				<div className={styles.filters}>
					<div className={styles.filterHeader}>
						<h1>Filters</h1>
						<button onClick={resetFilters}>Reset Filters</button>
					</div>
					<div className={styles.dietFilter}>
						<h3>By Diet</h3>
						<select onChange={handleSelectChange} id="select">
							<option></option>
							{diets.map((diet, index) => (
								<option key={index}>{diet.name.toUpperCase()}</option>
							))}
						</select>

						<ul>
							{dietsFiltered.map((diet, index) => {
								return <li key={index}>{diet}</li>
							})}
						</ul>
					</div>

					<div className={styles.sortFilter}>
						<h2>Sort</h2>
						<div>
							<label htmlFor="az">A - Z</label>
							<input
								type="radio"
								onChange={() => setSelectedRadio('a-z')}
								id="az"
								name="sortBy"
							></input>
						</div>
						<div>
							<label htmlFor="za">Z -A</label>
							<input
								type="radio"
								onChange={() => setSelectedRadio('z-a')}
								id="za"
								name="sortBy"
							></input>
						</div>
						<div>
							<label htmlFor="score">Highest Health Score</label>
							<input
								type="radio"
								onChange={() => setSelectedRadio('high-score')}
								id="score"
								name="sortBy"
							></input>
						</div>
						<div>
							<label htmlFor="score">Lowest Health Score</label>
							<input
								type="radio"
								onChange={() => setSelectedRadio('low-score')}
								id="score"
								name="sortBy"
							></input>
						</div>

						<button onClick={() => filterRadioButton()}>SORT</button>
					</div>
				</div>

				{loading ? (
					<span>Loading...</span>
				) : (
					<div className={styles.recipesGrid}>
						<Recipes recipes={currentRecipes} />
					</div>
				)}
				<div className={styles.pagination}>
					<button onClick={() => previousPage()}> Previous </button>
					<span>{currentPage}</span>

					<button onClick={() => nextPage()}> Next </button>
				</div>
			</div>
		</div>
	)
}

export default Filters
