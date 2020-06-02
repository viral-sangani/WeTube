import React from "react"
import Base from "../Base"
import VideoCard from "../Video/VideoCard"
import CustomLoader from "../../Utils/CustomLoader"
import { TopDiv, GuestTopDiv, VideoDiv } from "../../Utils/Styles"
import { isAuthenticated } from "../../_helper/auth"
import axios from "axios"

export default function UserTrending() {
	const [loading, setLoading] = React.useState(true)
	const [videos, setVideos] = React.useState([])
	React.useEffect(() => {
		window.scrollTo(0, 0)
		axios
			.get(`${process.env.REACT_APP_API_URL}/api/video/trending/`)
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
