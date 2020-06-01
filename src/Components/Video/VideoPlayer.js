import React from "react"
import { PlayerWrapper, StyledReactPlayer } from "../../Utils/Styles"

export default function VideoPlayer() {
	return (
		<React.Fragment>
			<PlayerWrapper>
				<StyledReactPlayer
					url={"https://www.youtube.com/watch?v=vJNVramny9k"}
					width="100%"
					height="100%"
					controls={true}
				/>
			</PlayerWrapper>
		</React.Fragment>
	)
}
