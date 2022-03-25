import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Home.module.css";
import homeVideo from "../Images/home-video.mp4";

function Home() {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "visible";
		};
	}, []);
	return (
		<div className={styles.homeContainer}>
			<video
				width="100%"
				height="100%"
				loop
				autoPlay
				muted
				className={styles.video}
			>
				<source src={homeVideo} type="video/mp4" />
			</video>

			<div className={styles.overlay}>
				<span>
					Welcome to My Recipes! <br></br>A Full-Stack application, build with
					PostgreSQL, Express, React and Node.js!
				</span>
				<Link className={styles.link} to="/recipes">
					ENTER
				</Link>
			</div>
		</div>
	);
}

export default Home;
