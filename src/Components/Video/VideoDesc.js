import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Card,
	CardContent,
	Button,
	Typography,
	Divider
} from "@material-ui/core"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ShareIcon from "@material-ui/icons/Share"
import { isAuthenticated } from "../../_helper/auth"
import { Link } from "react-router-dom"
import axios from "axios"
import {
	StyledVideoDescDiv,
	StyledDescSideDiv,
	StyledDescMainDiv,
	StyledCommentDiv
} from "../../Utils/Styles"
import VideoComment from "./VideoComment"
import SubscribeButton from "../../Utils/SubscribeButton"

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

export default function OutlinedCard({ value, slug }) {
	const classes = useStyles()
	const [totalSub, setTotalSub] = React.useState(value.viodeChannelSubs)
	const [Liked, setLiked] = React.useState({
		hasLiked: value.hasLiked,
		totalLikes: value.videoTotalLikes
	})
	const [Disliked, setDisliked] = React.useState({
		hasDisliked: value.hasDisliked,
		totalDislikes: value.videoTotalDislikes
	})
	const [comment, setComment] = React.useState(value.videoComment)
	const handleLike = () => {
		let url = `${process.env.REACT_APP_API_URL}/api/video/like/${slug}`
		axios
			.get(url, {
				headers: {
					Authorization: "Bearer " + isAuthenticated().access
				}
			})
			.then((res) => {
				console.log(res.data)
			})
		setLiked({
			totalLikes: Liked.hasLiked
				? Liked.totalLikes - 1
				: Liked.totalLikes + 1,
			hasLiked: Liked.hasLiked ? false : true
		})
		if (Disliked.hasDisliked) {
			setDisliked({
				totalDislikes: Disliked.hasDisliked
					? Disliked.totalDislikes - 1
					: Disliked.totalDislikes + 1,
				hasDisliked: Disliked.hasDisliked ? false : true
			})
		}
	}

	const handleDislike = () => {
		let url = `${process.env.REACT_APP_API_URL}/api/video/dislike/${slug}`
		axios
			.get(url, {
				headers: {
					Authorization: "Bearer " + isAuthenticated().access
				}
			})
			.then((res) => {
				console.log(res.data)
			})

		setDisliked({
			totalDislikes: Disliked.hasDisliked
				? Disliked.totalDislikes - 1
				: Disliked.totalDislikes + 1,
			hasDisliked: Disliked.hasDisliked ? false : true
		})
		if (Liked.hasLiked) {
			setLiked({
				totalLikes: Liked.hasLiked
					? Liked.totalLikes - 1
					: Liked.totalLikes + 1,
				hasLiked: Liked.hasLiked ? false : true
			})
		}
	}

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography
					component={"span"}
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{value.videoTotalViews} Views • {value.videoUploadTime}
				</Typography>
				<Typography variant="h5" component="h2">
					{value.videoName}
				</Typography>
				<div style={{ display: "flex", margin: "10px 0" }}>
					{isAuthenticated() ? (
						<>
							<Button
								style={
									Liked.hasLiked
										? { margin: "0 5px", color: "blue" }
										: { margin: "0 5px" }
								}
								startIcon={<ThumbUpAltIcon />}
								onClick={handleLike}
							>
								{Liked.totalLikes}
							</Button>

							<Button
								style={
									Disliked.hasDisliked
										? { margin: "0 5px", color: "red" }
										: { margin: "0 5px" }
								}
								startIcon={<ThumbDownIcon />}
								onClick={handleDislike}
							>
								{Disliked.totalDislikes}
							</Button>
						</>
					) : (
						<div
							style={{
								textAlign: "center",
								justifyContent: "center",
								margin: "8px"
							}}
						>
							Please <Link to="/signin">Signin</Link> to Like Or
							Dislike
						</div>
					)}

					<Button
						style={{ margin: "0 5px" }}
						startIcon={<ShareIcon />}
					>
						Share
					</Button>
				</div>
				<Divider />
				<StyledVideoDescDiv>
					<StyledDescSideDiv>
						<Link
							to={`/watch/${value.videoSlug}`}
							style={{
								textDecoration: "none",
								color: "inherit"
							}}
						>
							<img
								src={value.videoChannelImage}
								style={{
									width: "60px",
									height: "60px",
									borderRadius: "50%"
								}}
								alt="Channel"
							/>
						</Link>
					</StyledDescSideDiv>
					<StyledDescMainDiv>
						<div style={{ display: "block" }}>
							<Link
								to={`/watch/${value.videoSlug}`}
								style={{
									textDecoration: "none",
									color: "inherit"
								}}
							>
								<Typography
									variant="h6"
									component={"span"}
									style={{ display: "block" }}
								>
									{value.videoChannelName}
								</Typography>
							</Link>
							<Typography
								component={"span"}
								style={{ display: "block" }}
								variant="overline"
								color="textSecondary"
							>
								{totalSub} Subscribers
							</Typography>
						</div>
						<SubscribeButton
							hasSubscribed={value.hasSubscribed}
							slug={value.videoChannelSlug}
							totalSub={totalSub}
							setTotalSub={setTotalSub}
						/>
					</StyledDescMainDiv>
				</StyledVideoDescDiv>
				<StyledCommentDiv>
					<Divider />
					<Typography
						component={"span"}
						style={{ marginTop: "10px" }}
						variant="subtitle2"
					>
						{value.videoDescription}
					</Typography>
				</StyledCommentDiv>
				<StyledCommentDiv>
					<Divider />
					<Typography
						component={"span"}
						style={{ marginTop: "10px" }}
						variant="subtitle2"
					>
						Comments
					</Typography>
					<VideoComment
						comments={comment}
						setComment={setComment}
						slug={slug}
						userName={value.userName}
					/>
				</StyledCommentDiv>
			</CardContent>
		</Card>
	)
}
