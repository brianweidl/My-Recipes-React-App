import React from "react";
import store from "./Store/Store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Components/Home";
import Filters from "./Components/Filters";
import RecipeCreation from "./Components/RecipeCreation";
import RecipeDetail from "./Components/RecipeDetail";
import "./Styles/styles.css";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />}></Route>
					<Route exact path="/recipes" element={<Filters />}></Route>
					<Route exact path="/recipe-maker" element={<RecipeCreation />}></Route>
					<Route path="recipe-detail/:id" element={<RecipeDetail />}></Route>
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
