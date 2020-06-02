import React from "react"
import Base from "../Base"
import VideoCard from "../Video/VideoCard"
import CustomLoader from "../../Utils/CustomLoader"
import { TopDiv, GuestTopDiv, VideoDiv } from "../../Utils/Styles"
import { isAuthenticated } from "../../_helper/auth"
import axios from "axios"

export default function UserHistory() {
	const [loading, setLoading] = React.useState(true)
	const [videos, setVideos] = React.useState([])
	React.useEffect(() => {
		window.scrollTo(0, 0)
		axios
			.get(`${process.env.REACT_APP_API_URL}/api/video/history/`, {
				headers: {
					Authorization: "Bearer " + isAuthenticated().access
				}
			})
			.then((res) => {
				setVideos(res.data)
				setLoading(false)
			})
	}, [])
	if (!isAuthenticated()) {
		return (
			<Base>
				<GuestTopDiv>Please Signin to use this feature</GuestTopDiv>
			</Base>
		)
	}
	return (
		<Base>
			{loading ? (
				<CustomLoader loading={loading} />
			) : (
				<>
					<TopDiv>Your History</TopDiv>
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
