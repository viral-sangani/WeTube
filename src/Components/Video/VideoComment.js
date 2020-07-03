import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Avatar,
	ListItemAvatar,
	ListItemText,
	List,
	ListItem,
	// Divider,
	FormControl,
	InputLabel,
	Input,
	Button
} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import axios from "axios"
import { isAuthenticated } from "../../_helper/auth"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "100%",
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: "inline"
	}
}))

export default function VideoComment({ userName, comments, setComment, slug }) {
	const classes = useStyles()
	const [newComment, setNewComment] = React.useState("")
	const handleClick = () => {
		setComment([
			...comments,
			{
				comment: newComment,
				commentId: JSON.stringify(new Date()),
				time: "Now",
				userName: userName
			}
		])
		setNewComment("")
		let url = `https://8jx1h4z1ra.execute-api.ap-south-1.amazonaws.com/dev/api/video/comment/${slug}/`
		axios
			.post(
				url,
				{ comment: newComment },
				{
					headers: {
						Authorization: "Bearer " + isAuthenticated().access
					}
				}
			)
			.then((res) => {
				console.log(res.data)
			})
	}
	if (!isAuthenticated()) {
		return (
			<Typography
				component="span"
				variant="subtitle2"
				className={classes.inline}
				color="textPrimary"
			>
				<Link to="/signin">Login</Link> to Comment
			</Typography>
		)
	}
	return (
		<List className={classes.root}>
			{comments &&
				comments.map((comment) => {
					return (
						<ListItem
							alignItems="flex-start"
							key={comment.commentId}
						>
							<ListItemAvatar>
								<Avatar alt={comment.userName} src="#" />
							</ListItemAvatar>
							<ListItemText
								primary={
									<React.Fragment>
										<Typography
											component="span"
											variant="subtitle2"
											className={classes.inline}
											color="textPrimary"
										>
											{comment.userName}
										</Typography>
										<Typography
											component="span"
											variant="caption"
											className={classes.inline}
											color="textPrimary"
										>
											— {comment.time}
										</Typography>
									</React.Fragment>
								}
								secondary={
									<React.Fragment>
										<Typography
											component="span"
											variant="body2"
											className={classes.inline}
											color="textPrimary"
										>
											{comment.comment}
										</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>
					)
				})}

			<FormControl
				style={{ marginTop: "25px" }}
				fullWidth
				className={classes.margin}
			>
				<InputLabel htmlFor="standard-adornment-amount">
					Comment Here
				</InputLabel>
				<Input
					id="standard-adornment-amount"
					onChange={(event) => {
						setNewComment(event.target.value)
					}}
					value={newComment}
				/>
				<Button
					style={{
						backgroundColor: "#ff3a22",
						marginTop: "20px"
					}}
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleClick}
				>
					Comment
				</Button>
			</FormControl>
		</List>
	)
}
