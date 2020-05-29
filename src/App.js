import React from "react"
import Routes from "./router"
import { ThemeToggleProvider } from "./Context/ThemeContext"

function App() {
	return (
		<ThemeToggleProvider>
			<div className="App">
				<Routes />
			</div>
		</ThemeToggleProvider>
	)
}

export default App
