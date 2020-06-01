import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent, Button, Typography } from "@material-ui/core"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ShareIcon from "@material-ui/icons/Share"

const useStyles = makeStyles({
	root: {
		minWidth: "100%"
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)"
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
})

export default function OutlinedCard() {
	const classes = useStyles()
	const bull = <span className={classes.bullet}>•</span>

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					50 Views <bull /> 24 May 2020
				</Typography>
				<Typography variant="h5" component="h2">
					Building the Perfect Squirrel Proof Bird Feeder
				</Typography>
				<div style={{ display: "flex", margin: "10px 0" }}>
					<Button
						style={{ margin: "0 5px", color: "blue" }}
						variant="outlined"
						startIcon={<ThumbUpAltIcon />}
					>
						Like
					</Button>
					<Button
						style={{ margin: "0 5px", color: "red" }}
						variant="outlined"
						startIcon={<ThumbDownIcon />}
						color="primary"
					>
						Dislike
					</Button>
					<Button
						style={{ margin: "0 5px" }}
						variant="outlined"
						startIcon={<ShareIcon />}
					>
						Share
					</Button>
				</div>
				<hr />
				<Typography variant="body2" component="p">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
		</Card>
	)
}
