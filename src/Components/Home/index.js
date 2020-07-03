import React from "react"
import Base from "../Base/"
import CustomLoader from "../../Utils/CustomLoader"
import VideoCard from "../Video/VideoCard"
import axios from "axios"
import { VideoDiv } from "../../Utils/Styles"

const Home = (props) => {
	const [videos, setVideos] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	React.useEffect(() => {
		window.scrollTo(0, 0)
		axios
			.get(
				`https://8jx1h4z1ra.execute-api.ap-south-1.amazonaws.com/dev/api/video`
			)
			.then((res) => {
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
