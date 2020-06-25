import React from "react"
import Base from "../Base/"
import CustomLoader from "../../Utils/CustomLoader"
import VideoCard from "../Video/VideoCard"
import axios from "axios"
import { VideoDiv } from "../../Utils/Styles"
import { useParams } from "react-router-dom"

const Search = (props) => {
	const { slug } = useParams()
	const [videos, setVideos] = React.useState([])
	const [loading, setLoading] = React.useState(true)
	const [empty, setEmpty] = React.useState(false)
	React.useEffect(() => {
		window.scrollTo(0, 0)
		axios
			.get(`${process.env.REACT_APP_API_URL}/api/search?s=${slug}`)
			.then((res) => {
				if (res.data.empty) {
					console.log("object")
					setEmpty(true)
					setLoading(false)
				} else {
					setVideos(res.data)
					setLoading(false)
					setEmpty(false)
				}
			})
	}, [slug])

	if (empty) {
		return (
			<React.Fragment>
				<Base>
					<div className="row">
						{/* <VideoDiv> */}
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<h1>No search result found...</h1>
						</div>
						{/* </VideoDiv> */}
					</div>
				</Base>
			</React.Fragment>
		)
	}

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

export default Search
