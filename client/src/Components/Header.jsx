import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Header.module.css";
import iconImg from "../Images/recipes-icon.png";

function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.navLink}>
				<Link to="/" className={styles.navLink_anchor}>
					{" "}
					<span className={styles.navLink_span}>&lt; </span> Home
				</Link>
			</div>
			<div className={styles.headerIcon}>
				<img
					className={styles.headerIcon_image}
					src={iconImg}
					alt="chef-icon"
				></img>
			</div>
		</div>
	);
}

export default Header;
