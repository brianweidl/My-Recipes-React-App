import React from 'react'
import { useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function RecipeCreation() {
	const diets = useSelector((state) => state.diets)
	const [selectedDiets, setSelectedDiets] = useState([])
	const [input, setInput] = useState({
		title: '',
		summary: '',
		healthScore: '',
		score: '',
		image: '',
		steps: '',
	})
	const handleChange = (e) => {
		setInput({ ...input, [e.name]: e.value })
	}

	const handleSelect = (e) => {
		if (e.value === '') return
		if (!selectedDiets.includes(e.value)) {
			setSelectedDiets([...selectedDiets, e.value])
		} else {
			alert('Diet already selected')
		}
		return
	}

	const getInputsToMap = () => {
		let inputs = []
		for (let key in input) {
			inputs.push(
				<div>
					<label>{`${key}`}</label>
					<input
						name={`${key}`}
						value={input[key]}
						onChange={(e) => handleChange(e.target)}
					></input>
				</div>
			)
		}
		return inputs
	}

	const validations = {
		title: {
			isValid: (title) => {
				return title.length > 5 && title.length < 80
			},
			errorMessage: 'Title must contain between 5 and 80 characters',
		},
		summary: {
			isValid: (summary) => {
				return summary.length > 0
			},
			errorMessage: 'Summary cannot be empty',
		},
	}
	return (
		<>
			<Header />
			<Link to="/recipes">Back to recipes</Link>
			<div>Create</div>
			<form>
				{getInputsToMap()}
				<div>
					Diets:
					<select onChange={(e) => handleSelect(e.target)}>
						<option></option>
						{diets.map((diet) => (
							<option>{diet.name.toUpperCase()}</option>
						))}
					</select>
				</div>
			</form>
		</>
	)
}

export default RecipeCreation
