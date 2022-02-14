import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Styles/Home.module.css'

function Home() {
	return (
		<div className={styles.homeContainer}>
			<Link to="/recipes">Recipes</Link>
			<div className={styles.videoContainer}>
				<iframe
					className={styles.video}
					src="https://giphy.com/embed/5XLPWTWfj7h6M"
					width="890"
					height="500"
					frameBorder="0"
					allowFullScreen
				></iframe>
				<div className={styles.overlay}>Welcome to My Recipes!</div>
			</div>
		</div>
	)
}

export default Home
