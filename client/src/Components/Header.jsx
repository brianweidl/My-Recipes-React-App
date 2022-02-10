import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/Header.module.css'

function Header() {
	return (
		<>
			<Link to="/" className={styles.navLink}>
				Home
			</Link>
			<div className={styles.headerTitle}>Header</div>
		</>
	)
}

export default Header
