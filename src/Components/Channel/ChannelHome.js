import React from "react"
import Base from "../Base"
import {
	StyledMainDiv,
	StyledImg,
	StyledSecDiv,
	StyledButtonDiv,
	StyledChannelName,
	VideoDiv
} from "../../Utils/Styles"
import DefaultImg from "../../Static/dafault-channel.png"
import { Button, Card } from "@material-ui/core"
import CustomLoader from "../../Utils/CustomLoader"
// import VideoCard from "../Video/VideoCard"

export default function ChannelHome() {
	const [loading, setLoading] = React.useState(true)
	const handleAddSubscription = () => {
		console.log("Clicked")
	}
	React.useEffect(() => {
		setLoading(false)
	}, [])
	return (
		<Base>
			{loading ? (
				<CustomLoader loading={loading} />
			) : (
				<>
					<Card variant="outlined">
						<StyledMainDiv>
							<StyledImg
								src={DefaultImg}
								// src={hasChannel ? channelImage : DefaultImg}
								alt="Channel"
							/>
							<StyledSecDiv>
								<StyledChannelName>
									viral-sangani
								</StyledChannelName>
								<StyledButtonDiv>
									{/* {hasChannel ? ( */}
									{/* <> */}

									<Button
										style={{
											backgroundColor: "red",
											color: "white"
										}}
										variant="contained"
										onClick={handleAddSubscription}
									>
										Subscribe
									</Button>
									{/* </> */}
									{/* )} */}
								</StyledButtonDiv>
							</StyledSecDiv>
						</StyledMainDiv>
					</Card>
					<VideoDiv>{/* <VideoCard /> */}</VideoDiv>
				</>
			)}
		</Base>
	)
}
