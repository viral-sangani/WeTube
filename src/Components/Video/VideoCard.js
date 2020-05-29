import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import Avatar from "@material-ui/core/Avatar"
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

export default function RecipeReviewCard() {
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image="https://material-ui.com/static/images/cards/paella.jpg"
				title="Paella dish"
			/>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				title="Shrimp and Chorizo Paella"
				subheader={
					<>
						<div>Hello</div>
						<div>1k Views | 1 year ago</div>
					</>
				}
			/>
		</Card>
	)
}
