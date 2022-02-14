import React from 'react'
import { useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from '../Styles/RecipeCreation.module.css'

const DEFAULT_IMAGE =
	'https://previews.123rf.com/images/rastudio/rastudio1606/rastudio160600763/57759850-plate-with-cutlery-vector-sketch-icon-isolated-on-background-hand-drawn-plate-with-cutlery-icon-plat.jpg'

function RecipeCreation() {
	const diets = useSelector((state) => state.diets)
	const [selectedDiets, setSelectedDiets] = useState([])
	const [steps, setSteps] = useState([{ stepInput: '', number: 0 }])
	const [input, setInput] = useState({
		title: '',
		summary: '',
		healthScore: '',
		score: '',
		image: '',
	})

	const [errors, setErrors] = useState({})
	const handleChange = (e) => {
		setInput({ ...input, [e.name]: e.value })
		setErrors({})
	}

	const handleStepInputChange = (e, number) => {
		setSteps(
			steps.map((step) => {
				if (step.number === number) {
					step.stepInput = e.value
				}
				return step
			})
		)
	}

	const handleSelect = (e) => {
		if (e.value === '') return
		if (!selectedDiets.includes(e.value)) {
			setSelectedDiets([...selectedDiets, e.value.toLowerCase()])
		} else {
			alert('Diet already selected')
		}
		let selectDiet = document.getElementById('select')
		selectDiet.value = ''
		return
	}

	const removeDiet = (e, diet) => {
		e.preventDefault()
		setSelectedDiets(selectedDiets.filter((diets) => diets !== diet))
		let selectDiet = document.getElementById('select')
		selectDiet.value = ''
	}

	const addStep = (e) => {
		e.preventDefault()
		setSteps([
			...steps,
			{ stepInput: '', number: steps[steps.length - 1].number + 1 },
		])
	}

	const resetSteps = (e) => {
		e.preventDefault()
		setSteps([{ stepInput: '', number: 0 }])
	}

	const formatSteps = () => {
		let formattedSteps = steps.reduce((string, step) => {
			return string + '|' + step.stepInput
		}, '')
		return formattedSteps
	}

	const getInputsToMap = () => {
		let inputs = []
		for (let key in input) {
			inputs.push(
				<div className={styles.inputContainer}>
					<label>{`${key.toUpperCase()}`}</label>
					<input
						autoComplete="off"
						className={styles.userInput}
						name={`${key}`}
						value={input[key]}
						onChange={(e) => handleChange(e.target)}
					></input>
					{errors && errors[key] && (
						<p className={styles.errorMessage}>{errors[key]}</p>
					)}
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
		healthScore: {
			isValid: (healthScore) => {
				healthScore = parseInt(healthScore)

				return healthScore > 0 && healthScore <= 100
			},
			errorMessage: 'Health Score must be between 0 and 100',
		},
		score: {
			isValid: (score) => {
				score = parseInt(score)
				return score > 0 && score <= 100
			},
			errorMessage: 'Score must be between 0 and 100',
		},
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const newErrors = {}
		let validSubmit = true

		for (let key in validations) {
			let foundError = validations[key].isValid(input[key])

			if (!foundError) {
				validSubmit = false

				newErrors[key] = validations[key].errorMessage
			}
		}
		const validSteps = steps[0].stepInput.length > 0
		if (!validSteps) {
			validSubmit = false
			newErrors.steps = 'There has to be at least one step'
		}
		const validDiets = selectedDiets.length > 0
		if (!validDiets) {
			validSubmit = false
			newErrors.diets = 'Choose at least one diet'
		}

		if (!validSubmit) {
			setErrors(newErrors)
			return
		} else {
			let formatSend = {
				title: input.title,
				summary: input.summary,
				healthScore: parseFloat(input.healthScore),
				score: parseFloat(input.score),
				image: input.image,
				diets: selectedDiets,
				steps: formatSteps(),
			}
			if (!formatSend.image) {
				formatSend.image = DEFAULT_IMAGE
			}
			await axios.post('http://localhost:3001/recipe', formatSend)
		}
	}
	return (
		<>
			<Header />
			<Link to="/recipes" className={styles.backLink}>
				<span className={styles.span}>&lt;</span>Back to recipes
			</Link>

			<form className={styles.formContainer}>
				{getInputsToMap()}
				{steps.map((step) => {
					return (
						<div className={styles.stepNumberInput} key={step.number + 1}>
							<label>{`STEP ${step.number + 1}`}</label>
							<input
								className={styles.stepTextInput}
								type="text"
								onChange={(e) => {
									handleStepInputChange(e.target, step.number)
								}}
								value={step.stepInput}
							></input>
						</div>
					)
				})}
				{errors && errors.steps && (
					<p className={styles.errorMessage}>{errors.steps}</p>
				)}

				<button className={styles.stepButton} onClick={(e) => addStep(e)}>
					Add Step
				</button>
				<button className={styles.stepButton} onClick={(e) => resetSteps(e)}>
					Reset steps
				</button>
				<div>
					DIETS:
					<select
						className={styles.dietSelect}
						onChange={(e) => handleSelect(e.target)}
						id="select"
					>
						<option></option>
						{diets.map((diet) => (
							<option>{diet.name.toUpperCase()}</option>
						))}
					</select>
					{selectedDiets.map((diet) => (
						<div>
							<span>{diet.toUpperCase()}</span>
							<button onClick={(e) => removeDiet(e, diet)}>X</button>
						</div>
					))}
					{errors && errors.diets && (
						<p className={styles.errorMessage}>{errors.diets}</p>
					)}
				</div>
				<button
					className={styles.submitButton}
					onClick={(e) => handleSubmit(e)}
				>
					SUBMIT RECIPE !
				</button>
			</form>
		</>
	)
}

export default RecipeCreation
