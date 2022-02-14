import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/Header.module.css'

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.navLink}>
				<Link to="/" className={styles.anchor}>
					{' '}
					<span className={styles.span}>&lt; </span> Home
				</Link>
			</div>
			<div className={styles.headerTitle}>
				<span className={styles.headerName}>
					My<br></br>Recipes
				</span>
				<img
					className={styles.headerImage}
					src="https://st.depositphotos.com/1007566/1246/v/950/depositphotos_12467429-stock-illustration-cartoon-chef.jpg"
					alt="chef-icon"
				></img>
			</div>
		</div>
	)
}

export default Header
