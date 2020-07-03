import React from "react"
import Base from "../Base"
import {
	StyledMainDiv,
	StyledSecDiv,
	StyledButtonDiv,
	VideoDiv
} from "../../Utils/Styles"
import SubscribeButton from "../../Utils/SubscribeButton"
import { Card, makeStyles, Avatar, Typography } from "@material-ui/core"
import CustomLoader from "../../Utils/CustomLoader"
import VideoCard from "../Video/VideoCard"
import axios from "axios"
import { useParams } from "react-router-dom"
import { isAuthenticated } from "../../_helper/auth"

const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12)
	}
}))

export default function ChannelHome() {
	const classes = useStyles()
	const [totalSub, setTotalSub] = React.useState(0)
	const [loading, setLoading] = React.useState(true)
	const [channel, setChannel] = React.useState({})
	const { slug } = useParams()
	React.useEffect(() => {
		let url = `https://8jx1h4z1ra.execute-api.ap-south-1.amazonaws.com/dev/api/channels/${slug}/`
		if (isAuthenticated()) {
			axios
				.get(url, {
					headers: {
						Authorization: "Bearer " + isAuthenticated().access
					}
				})
				.then((res) => {
					setChannel(res.data)
					setLoading(false)
					setTotalSub(res.data.channelTotalSub)
				})
		}
		axios.get(url).then((res) => {
			setChannel(res.data)
			setLoading(false)
			setTotalSub(res.data.channelTotalSub)
		})
		// setLoading(false)
	}, [slug])

	// if (!isAuthenticated()) {
	// 	return (
	// 		<Base>
	// 			<GuestTopDiv>Please Signin to use this feature</GuestTopDiv>
	// 		</Base>
	// 	)
	// }
	return (
		<Base>
			{loading ? (
				<CustomLoader loading={loading} />
			) : (
				<>
					<Card variant="outlined">
						<StyledMainDiv>
							<Avatar
								alt="Remy Sharp"
								src={channel.channelImage}
								className={classes.large}
							/>

							<StyledSecDiv>
								<div style={{ display: "block" }}>
									<Typography
										component={"span"}
										style={{ display: "block" }}
										variant="h4"
									>
										{channel.channelName}
									</Typography>
									<Typography
										component={"span"}
										style={{ display: "block" }}
										variant="overline"
										color="textSecondary"
									>
										{totalSub} Subscribers
									</Typography>
								</div>
								<StyledButtonDiv>
									<SubscribeButton
										setTotalSub={setTotalSub}
										totalSub={totalSub}
										slug={slug}
										hasSubscribed={channel.hasSubscribed}
									/>
								</StyledButtonDiv>
							</StyledSecDiv>
						</StyledMainDiv>
					</Card>
					<Typography
						component={"span"}
						style={{ padding: "4px" }}
						variant="h6"
					>
						Video By - {channel.channelName}
					</Typography>
					<VideoDiv>
						{channel.videoList.map((video) => (
							<VideoCard video={video} key={video.videoId} />
						))}
					</VideoDiv>
				</>
			)}
		</Base>
	)
}
