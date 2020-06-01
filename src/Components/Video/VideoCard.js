import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import {
	Card,
	CardHeader,
	CardActionArea,
	CardMedia,
	Avatar
} from "@material-ui/core"
import { red } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "23%",
		minWidth: "220px",
		margin: "10px",
		[theme.breakpoints.down("md")]: {
			minWidth: "220px",
			width: "31%"
		},
		[theme.breakpoints.down("sm")]: {
			width: "45%",
			minWidth: "220px"
		},
		[theme.breakpoints.down("xs")]: {
			width: "95%",
			minWidth: "220px"
		}
	},
	media: {
		height: 0,
		paddingTop: "56.25%" // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: red[500]
	}
}))

export default function RecipeReviewCard({ video }) {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<Link
					to={`watch/${video.videoSlug}`}
					style={{
						textDecoration: "none",
						color: "inherit"
					}}
				>
					<CardMedia
						className={classes.media}
						image={video.videoThumbnail}
						title={video.videoName}
					/>
					<CardHeader
						avatar={
							<Avatar
								aria-label="recipe"
								className={classes.avatar}
							>
								R
							</Avatar>
						}
						title="Shrimp and Chorizo Paella"
						subheader={
							<>
								<div>{video.videoChannelName}</div>
								<div>
									{video.videoTotalViews} Views |{" "}
									{video.videoUploadTime}
								</div>
							</>
						}
					/>
				</Link>
			</CardActionArea>
		</Card>
	)
}
