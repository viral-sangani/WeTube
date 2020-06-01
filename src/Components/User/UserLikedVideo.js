import React from "react"
import Base from "../Base"
import styled from "styled-components"
// import VideoCard from "../Video/VideoCard"
import CustomLoader from "../../Utils/CustomLoader"

const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	@media (max-width: 500px) {
		justify-content: space-around;
	}
`

const TopDiv = styled.div`
	width: 100%;
	height: 20vh;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40px;
`

export default function UserHistory() {
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		setLoading(false)
	}, [])
	return (
		<Base>
			{loading ? (
				<CustomLoader loading={loading} />
			) : (
				<>
					<TopDiv>Liked Videos</TopDiv>
					<VideoDiv>
						{/* <VideoCard />
				<VideoCard />
				<VideoCard />
				<VideoCard /> */}
					</VideoDiv>
				</>
			)}
		</Base>
	)
}
