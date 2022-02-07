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
} from '../Actions/Actions.js'
import NavBar from './NavBar.jsx'

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

			setLoading(false)
		}
		getAllDiets()
	}, [dispatch])

	const handleSelectChange = (e) => {
		dispatch(filterByDiet(e.target.value))
		setDietsFiltered([...dietsFiltered, e.target.value])
		setCurrentPage(1)
		filterRadioButton()
	}

	const filterRadioButton = () => {
		if (selectedRadio === 'score') {
			dispatch(filterByScore())
		} else {
			dispatch(filterAlphabetical(selectedRadio))
		}
		setCurrentPage(1)
	}
	const reset = () => {
		dispatch(filterByDiet('ALL'))
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
		<>
			<Header />
			<NavBar
				selectedRadio={selectedRadio}
				filterRadioButton={filterRadioButton}
				setDietsFiltered={setDietsFiltered}
			></NavBar>
			<div>Filters</div>
			<select onChange={handleSelectChange} id="select">
				<option>ALL</option>
				{diets.map((diet) => (
					<option key={diet.id}>{diet.name.toUpperCase()}</option>
				))}
			</select>
			<button onClick={reset}>Reset Filters</button>
			<div>
				{dietsFiltered.map((diet) => {
					return <span>{diet}</span>
				})}
			</div>

			<div>
				Sort
				<input
					type="radio"
					onChange={() => setSelectedRadio('a-z')}
					id="az"
					name="sortBy"
				></input>
				<label htmlFor="az">A - Z</label>
				<input
					type="radio"
					onChange={() => setSelectedRadio('z-a')}
					id="za"
					name="sortBy"
				></input>
				<label htmlFor="za">Z -A</label>
				<input
					type="radio"
					onChange={() => setSelectedRadio('score')}
					id="score"
					name="sortBy"
				></input>
				<label htmlFor="score">Score</label>
				<button onClick={() => filterRadioButton()}>BOTON</button>
			</div>

			<div>
				{loading ? (
					<span>Loading...</span>
				) : (
					<Recipes recipes={currentRecipes} />
				)}
			</div>
			<button onClick={() => previousPage()}> Previous </button>
			<span>{currentPage}</span>
			<button onClick={() => nextPage()}> Next </button>
		</>
	)
}

export default Filters
