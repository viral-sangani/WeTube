import React from "react"
import Navbar from "./Navbar"
import { GeneralProvider } from "../../Context/GeneralContext"

const Base = (props) => {
	return (
		<GeneralProvider>
			<Navbar>{props.children}</Navbar>
		</GeneralProvider>
	)
}

export default Base
