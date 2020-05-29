import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./Components/Home"
import { lightTheme, darkTheme } from "./Utils/Theme/theme"
import { GlobalStyles } from "./Utils/Theme/global"
import { ThemeToggleContext } from "./Context/ThemeContext"
import { ThemeProvider } from "styled-components"

const Routes = () => {
	const { themeMode } = React.useContext(ThemeToggleContext)
	return (
		<BrowserRouter>
			<Switch>
				<ThemeProvider
					theme={themeMode === "light" ? lightTheme : darkTheme}
				>
					<GlobalStyles />
					<Route path="/" exact component={Home} />
				</ThemeProvider>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes
