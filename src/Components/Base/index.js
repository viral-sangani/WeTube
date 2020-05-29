import React, { Fragment } from "react"
import Navbar from "./Navbar"
// import { SideBarContext } from "../Context/SideBarContext"

const Base = (props) => {
	// const [open, setOpen] = useContext(SideBarContext)
	return (
		<Fragment>
			{/* <Navibar open={open} setOpen={setOpen}> */}
			<Navbar></Navbar>
		</Fragment>
	)
}

export default Base
