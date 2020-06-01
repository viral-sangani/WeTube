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

export default function VideoSideCard() {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.cover}
				image="https://material-ui.com/static/images/cards/live-from-space.jpg"
				title="Live from space album cover"
			/>
			<div className={classes.details}>
				<CardContent
					className={classes.content}
					style={{ paddingLeft: "8px" }}
				>
					<Typography variant="subtitle2">Live From Space</Typography>
					<Typography variant="overline" color="textSecondary">
						Mac Miller
					</Typography>
					<br />
					<Typography variant="caption" color="textSecondary">
						22M Views | 2 years ago
					</Typography>
				</CardContent>
			</div>
		</Card>
	)
}
