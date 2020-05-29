import React from "react"
import Base from "../Base/"
// import CustomLoader from "../../Utils/CustomLoader"
import VideoCard from "../Video/VideoCard"
import styled from "styled-components"

const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	@media (max-width: 500px) {
		justify-content: space-around;
	}
`

const Home = (props) => {
	// const [videos, setVideos] = useState([])
	// const [loading, setLoading] = useState(true)
	// useEffect(() => {
	// 	window.scrollTo(0, 0)
	// 	axios.get(`${process.env.REACT_APP_API_URL}/api/video`).then((res) => {
	// 		setVideos(res.data)
	// 		setLoading(false)
	// 	})
	// }, [])

	return (
		<React.Fragment>
			<Base>
				{/* <div className="row">
					{loading ? (
						<CustomLoader loading={loading} />
					) : (
						videos.map((video) => {
							console.log(video)
							return (
								<VideoCard video={video} key={video.videoId} />
							)
						})
					)}
				</div> */}
				<VideoDiv>
					<VideoCard />
					<VideoCard />
					<VideoCard />
					<VideoCard />
					<VideoCard />
					<VideoCard />
					<VideoCard />
				</VideoDiv>
			</Base>
		</React.Fragment>
	)
}

export default Home
