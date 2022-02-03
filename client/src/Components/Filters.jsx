import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './Header.jsx'
import Recipes from './Recipes'
import axios from 'axios'
import { getDiets } from '../Actions/Actions.js'

function Filters() {
	const dispatch = useDispatch()
	useEffect(() => {
		const getAllDiets = async () => {
			const allDiets = await axios.get('http://localhost:3001/types')
			dispatch(getDiets(allDiets.data))
		}
		getAllDiets()
	}, [])
	return (
		<>
			<Header />
			<div>Filters</div>
			<Recipes />
		</>
	)
}

export default Filters
