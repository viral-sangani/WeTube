import React from "react"
import Base from "../Base"
// import VideoCard from "../Video/VideoCard"
import CustomLoader from "../../Utils/CustomLoader"
import { TopDiv, VideoDiv } from "../../Utils/Styles"

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
