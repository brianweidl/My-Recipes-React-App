import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterByName } from '../Actions/Actions'

function NavBar({ selectedRadio, filterRadioButton, setDietsFiltered }) {
	const [searchValue, setSearchValue] = useState('')
	const dispatch = useDispatch()

	return (
		<div>
			<form
				id="form"
				onSubmit={(e) => {
					e.preventDefault()
					dispatch(filterByName(searchValue))
					filterRadioButton()
					setDietsFiltered([])
					let form = document.getElementById('form')
					form.reset()
				}}
			>
				<input
					placeholder="Search..."
					onChange={(e) => setSearchValue(e.target.value)}
				></input>
				<button
					type="submit"
					onClick={(e) => {
						dispatch(filterByName(searchValue))
						filterRadioButton()
					}}
				>
					X
				</button>
			</form>
			<Link to="/recipe-maker">Create a recipe</Link>
		</div>
	)
}

export default NavBar
