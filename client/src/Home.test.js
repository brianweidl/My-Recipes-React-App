import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Components/Home";

test("renders welcome text", () => {
	render(
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />}></Route>
			</Routes>
		</BrowserRouter>
	);
	const linkElement = screen.getByText(/Welcome to My Recipes/i);
	expect(linkElement).toBeInTheDocument();
});

test("renders link button", () => {
	render(
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />}></Route>
			</Routes>
		</BrowserRouter>
	);
	const linkElement = screen.getByText(/ENTER/i);
	expect(linkElement).toBeInTheDocument();
});
