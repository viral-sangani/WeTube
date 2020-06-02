import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"

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

export default function VideoSideCard({ video }) {
	const classes = useStyles()

	return (
		<Card className={classes.root} variant="outlined">
			{/* <div style={{ width: "45%" }}> */}
			<CardMedia
				className={classes.cover}
				image={video.videoThumbnail}
				title={video.videoName}
			/>
			{/* </div> */}
			<div style={{ width: "55%" }} className={classes.details}>
				<CardContent
					className={classes.content}
					style={{ padding: "8px 8px" }}
				>
					<Typography variant="subtitle2">
						{video.videoName}
					</Typography>
					<Typography variant="overline" color="textSecondary">
						{video.videoChannelName}
					</Typography>
					<br />
					<Typography variant="caption" color="textSecondary">
						{video.videoTotalViews} Views | {video.videoUploadTime}
					</Typography>
				</CardContent>
			</div>
		</Card>
	)
}
