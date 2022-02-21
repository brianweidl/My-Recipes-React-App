import React from 'react'
import { useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import styles from '../Styles/RecipeCreation.module.css'
import defaultImage from '../Images/defaultImage.png'

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
		if (!selectedDiets.includes(e.value.toLowerCase())) {
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

	const validations = {
		title: {
			isValid: (title) => {
				return title.length > 5 && title.length < 50
			},
			errorMessage: 'Title must contain between 5 and 50 characters',
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

				return healthScore > 1 && healthScore <= 100
			},
			errorMessage: 'Health Score must be between 1 and 100',
		},
		score: {
			isValid: (score) => {
				score = parseInt(score)
				return score > 1 && score <= 100
			},
			errorMessage: 'Score must be between 1 and 100',
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
				formatSend.image = defaultImage
			}
			await axios.post('http://localhost:3001/recipe', formatSend)
			alert('Recipe created!')
		}
	}
	return (
		<>
			<Header />
			<Link to="/recipes" className={styles.backLink}>
				<span className={styles.span}>&lt;</span>Back to recipes
			</Link>

			<form className={styles.formContainer}>
				<div className={styles.inputContainer}>
					<label>TITLE</label>
					<input
						autoComplete="off"
						className={styles.userInput}
						name="title"
						value={input.title}
						onChange={(e) => handleChange(e.target)}
					></input>
					{errors && errors.title && (
						<p className={styles.errorMessage}>{errors.title}</p>
					)}
				</div>
				<div className={styles.inputContainer}>
					<label>SUMMARY</label>
					<textarea
						type="text"
						autoComplete="off"
						className={styles.userInput}
						name="summary"
						value={input.summary}
						onChange={(e) => handleChange(e.target)}
					></textarea>
					{errors && errors.summary && (
						<p className={styles.errorMessage}>{errors.summary}</p>
					)}
				</div>
				<div className={styles.inputContainer}>
					<label>HEALTHSCORE</label>
					<input
						min="0"
						max="100"
						placeholder="0"
						type="number"
						autoComplete="off"
						className={styles.userInput}
						name="healthScore"
						value={input.healthScore}
						onChange={(e) => handleChange(e.target)}
					></input>
					{errors && errors.healthScore && (
						<p className={styles.errorMessage}>{errors.healthScore}</p>
					)}
				</div>
				<div className={styles.inputContainer}>
					<label>SCORE</label>
					<input
						min="0"
						max="100"
						placeholder="0"
						type="number"
						autoComplete="off"
						className={styles.userInput}
						name="score"
						value={input.score}
						onChange={(e) => handleChange(e.target)}
					></input>
					{errors && errors.score && (
						<p className={styles.errorMessage}>{errors.score}</p>
					)}
				</div>
				<div className={styles.inputContainer}>
					<label>IMAGE (URL)</label>
					<input
						type="text"
						autoComplete="off"
						className={styles.userInput}
						name="image"
						value={input.image}
						onChange={(e) => handleChange(e.target)}
					></input>
					{errors && errors.image && (
						<p className={styles.errorMessage}>{errors.image}</p>
					)}
				</div>
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
				<div className={styles.dietsContainer}>
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
						<div className={styles.dietChosen}>
							<span>{diet.toUpperCase()}</span>
							<button
								className={styles.dietDeleteButton}
								onClick={(e) => removeDiet(e, diet)}
							>
								X
							</button>
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
