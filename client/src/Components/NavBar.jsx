import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterAlphabetical, filterByName } from '../Actions/Actions'
import styles from '../Styles/NavBar.module.css'

function NavBar({ selectedRadio, filterRadioButton, setDietsFiltered }) {
	const [searchValue, setSearchValue] = useState('')
	const dispatch = useDispatch()

	return (
		<>
			<form
				id="form"
				className={styles.navBarForm}
				onSubmit={(e) => {
					e.preventDefault()
					dispatch(filterByName(searchValue))
					dispatch(filterAlphabetical('a-z'))
					setDietsFiltered([])
					let form = document.getElementById('form')
					form.reset()
				}}
			>
				<input
					className={styles.navBarInput}
					autocomplete="off"
					placeholder="Search..."
					id="search"
					onChange={(e) => setSearchValue(e.target.value)}
				></input>

				<button
					className={styles.navBarButton}
					type="submit"
					onClick={(e) => {
						dispatch(filterByName(searchValue))
						filterRadioButton()
					}}
				>
					Search
				</button>
			</form>
			<div className={styles.navBarLink}>
				<Link to="/recipe-maker" className={styles.link}>
					Create your own recipe!
				</Link>
			</div>
		</>
	)
}

export default NavBar
