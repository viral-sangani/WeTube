import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./Components/Home"
import { lightTheme, darkTheme } from "./Utils/Theme/theme"
import { GlobalStyles } from "./Utils/Theme/global"
import { ThemeToggleContext } from "./Context/ThemeContext"
import Watch from "./Components/Video/Watch"
import { ThemeProvider } from "styled-components"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import SignIn from "./Components/SignIn"
import SignUp from "./Components/SignUp"
import UserChannel from "./Components/User/UserChannel"
import UserHistory from "./Components/User/UserHistory"
import UserLikedVideo from "./Components/User/UserLikedVideo"
import ChannelHome from "./Components/Channel/ChannelHome"
import UserTrending from "./Components/User/UserTrending"
// import PrivateRoute from "./_helper/auth/PrivateRoutes"

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
						<Route path="/signin" exact component={SignIn} />
						<Route path="/signup" exact component={SignUp} />
						<Route path="/watch/:slug" exact component={Watch} />
						<Route
							path="/user/channel"
							exact
							component={UserChannel}
						/>
						<Route path="/history" exact component={UserHistory} />
						<Route
							path="/trending"
							exact
							component={UserTrending}
						/>
						<Route path="/liked" exact component={UserLikedVideo} />
						<Route
							path="/channel/:slug"
							exact
							component={ChannelHome}
						/>
					</MuiThemeProvider>
				</ThemeProvider>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes
