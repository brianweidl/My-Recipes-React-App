import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { filterByName } from '../Actions/Actions'
import styles from '../Styles/NavBar.module.css'

function NavBar({ selectedRadio, filterRadioButton, setDietsFiltered }) {
	const [searchValue, setSearchValue] = useState('')
	const dispatch = useDispatch()

	return (
		<div className={styles.navBar}>
			<form
				id="form"
				className={styles.navBarForm}
				onSubmit={(e) => {
					e.preventDefault()
					dispatch(filterByName(searchValue))
					/* dispatch(filterAlphabetical('a-z')) */
					filterRadioButton(selectedRadio)
					setDietsFiltered([])
					let form = document.getElementById('form')
					form.reset()
				}}
			>
				<input
					className={styles.navBarInput}
					autoComplete="off"
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
		</div>
	)
}

export default NavBar
