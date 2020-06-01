import React, { Fragment } from "react"
import Navbar from "./Navbar"

const Base = (props) => {
	return (
		<Fragment>
			<Navbar>{props.children}</Navbar>
		</Fragment>
	)
}

export default Base
