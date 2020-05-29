import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./Components/Home"
import { lightTheme, darkTheme } from "./Utils/Theme/theme"
import { GlobalStyles } from "./Utils/Theme/global"
import { ThemeToggleContext } from "./Context/ThemeContext"
import { ThemeProvider } from "styled-components"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

const Routes = () => {
	const { themeMode } = React.useContext(ThemeToggleContext)
	const themeObject = {
		palette: {
			primary: { main: "#ff3a22", contrastText: "#fff" },
			secondary: { main: "#5e3c6f", contrastText: "#000" },
			type: themeMode
		},
		themeName: "Blue Lagoon 2020"
	}
	const themeConfig = createMuiTheme(themeObject)
	return (
		<BrowserRouter>
			<Switch>
				<ThemeProvider
					theme={themeMode === "light" ? lightTheme : darkTheme}
				>
					<GlobalStyles />
					<MuiThemeProvider theme={themeConfig}>
						<Route path="/" exact component={Home} />
					</MuiThemeProvider>
				</ThemeProvider>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes
