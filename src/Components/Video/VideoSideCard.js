import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: "110px",
		margin: "10px 0"
	},
	details: {
		display: "flex",
		flexDirection: "column"
	},
	content: {
		flex: "1 0 auto"
	},
	cover: {
		width: 180
	}
}))

export default function VideoSideCard(props) {
	const { video } = props
	const classes = useStyles()

	return (
		<Card className={classes.root} variant="outlined">
			<Link
				to={`/watch/${video.videoSlug}`}
				style={{
					textDecoration: "none",
					color: "inherit"
				}}
			>
				<img
					src={video.videoThumbnail}
					style={{ width: "180px", height: "110px" }}
					alt=""
				/>
			</Link>
			<div style={{ width: "55%" }} className={classes.details}>
				<CardContent
					className={classes.content}
					style={{ padding: "8px 8px" }}
				>
					<Link
						to={`/watch/${video.videoSlug}`}
						style={{
							textDecoration: "none",
							color: "inherit"
						}}
					>
						<Typography component={"span"} variant="subtitle2">
							{video.videoName}
						</Typography>
					</Link>
					<Link
						to={`/channel/${video.videoChannelSlug}`}
						style={{
							textDecoration: "none",
							color: "inherit"
						}}
					>
						<Typography
							component={"span"}
							variant="overline"
							color="textSecondary"
						>
							{video.videoChannelName}
						</Typography>
					</Link>
					<br />
					<Typography
						component={"span"}
						variant="caption"
						color="textSecondary"
					>
						{video.videoTotalViews} Views | {video.videoUploadTime}
					</Typography>
				</CardContent>
			</div>
		</Card>
	)
}
