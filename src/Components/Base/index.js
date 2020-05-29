import React, { Fragment } from "react"
import Navibar from "./Navbar"
// import { SideBarContext } from "../Context/SideBarContext"

const Base = (props) => {
	// const [open, setOpen] = useContext(SideBarContext)
	return (
		<Fragment>
			{/* <Navibar open={open} setOpen={setOpen}> */}
			<Navibar>{props.children}</Navibar>
		</Fragment>
	)
}

export default Base
