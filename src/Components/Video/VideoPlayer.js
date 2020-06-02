import React from "react"
import { PlayerWrapper, StyledReactPlayer } from "../../Utils/Styles"

export default function VideoPlayer({ url }) {
	return (
		<React.Fragment>
			<PlayerWrapper>
				<StyledReactPlayer
					url={url}
					width="100%"
					height="100%"
					controls={true}
				/>
			</PlayerWrapper>
		</React.Fragment>
	)
}
