import React from "react"
import Base from "../Base"
import VideoCard from "../Video/VideoCard"
import CustomLoader from "../../Utils/CustomLoader"
import { TopDiv, VideoDiv } from "../../Utils/Styles"
import axios from "axios"

export default function UserTrending() {
	const [loading, setLoading] = React.useState(true)
	const [videos, setVideos] = React.useState([])
	React.useEffect(() => {
		window.scrollTo(0, 0)
		axios
			.get(
				`https://8jx1h4z1ra.execute-api.ap-south-1.amazonaws.com/dev/api/video/trending/`
			)
			.then((res) => {
				setVideos(res.data)
				setLoading(false)
			})
	}, [])
	return (
		<Base>
			{loading ? (
				<CustomLoader loading={loading} />
			) : (
				<>
					<TopDiv>Trending Videos</TopDiv>
					<VideoDiv>
						{videos.map((video) => {
							return (
								<VideoCard video={video} key={video.videoId} />
							)
						})}
					</VideoDiv>
				</>
			)}
		</Base>
	)
}
