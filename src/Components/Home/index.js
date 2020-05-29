import React from "react"
import Base from "../Base/"
// import CustomLoader from "../../Utils/CustomLoader"

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
			</Base>
		</React.Fragment>
	)
}

export default Home
