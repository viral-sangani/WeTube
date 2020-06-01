import React from "react"
import Base from "../Base/"
import CustomLoader from "../../Utils/CustomLoader"
import VideoCard from "../Video/VideoCard"
import styled from "styled-components"
import axios from "axios"

const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	@media (max-width: 500px) {
		justify-content: space-around;
	}
`

const Home = (props) => {
	const [videos, setVideos] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	React.useEffect(() => {
		window.scrollTo(0, 0)
		axios.get(`${process.env.REACT_APP_API_URL}/api/video`).then((res) => {
			console.log(res.data)
			setVideos(res.data)
			setLoading(false)
		})
	}, [])

	return (
		<React.Fragment>
			<Base>
				<div className="row">
					<VideoDiv>
						{loading ? (
							<CustomLoader loading={loading} />
						) : (
							videos.map((video) => {
								console.log(video)
								return (
									<VideoCard
										video={video}
										key={video.videoId}
									/>
								)
							})
						)}
					</VideoDiv>
				</div>
			</Base>
		</React.Fragment>
	)
}

export default Home
