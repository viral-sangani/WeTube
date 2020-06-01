import React from "react"
import ReactPlayer from "react-player"
import styled from "styled-components"

const PlayerWrapper = styled.div`
	position: relative;
	padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`

const StyledReactPlayer = styled(ReactPlayer)`
	position: absolute;
	top: 0;
	left: 0;
`

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
