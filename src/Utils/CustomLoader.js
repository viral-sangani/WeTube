import React from "react"
import PacmanLoader from "react-spinners/PacmanLoader"

export default function CustomLoader({ loading }) {
	return (
		<React.Fragment>
			<div
				style={{
					position: "fixed",
					left: "50%",
					top: "35%"
				}}
			>
				<PacmanLoader size={50} color={"#ff3a22"} loading={loading} />
			</div>
		</React.Fragment>
	)
}
