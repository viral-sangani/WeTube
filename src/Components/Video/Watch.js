import React from "react"
import VideoPlayer from "./VideoPlayer"
import Base from "../Base"
import { ThemeToggleContext } from "../../Context/ThemeContext"
import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import VideoSideCard from "./VideoSideCard"
import VideoDesc from "./VideoDesc"
import { useParams } from "react-router-dom"
import axios from "axios"
import CustomLoader from "../../Utils/CustomLoader"
import { isAuthenticated } from "../../_helper/auth"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: "auto",
		width: "90%",
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(1),
			width: "100%"
		}
	},
	paperRoot: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16)
		}
	}
}))

export default function Watch(props) {
	const { slug } = useParams()
	const [value, setValue] = React.useState({})
	const classes = useStyles()
	const [loading, setLoading] = React.useState(true)
	const { handleDrawerClose } = React.useContext(ThemeToggleContext)
	React.useEffect(() => {
		setLoading(true)
		handleDrawerClose()
		let url = `${process.env.REACT_APP_API_URL}/api/video/${slug}`
		if (isAuthenticated()) {
			axios
				.get(url, {
					headers: {
						Authorization: "Bearer " + isAuthenticated().access
					}
				})
				.then((res) => {
					setValue(res.data)
					setLoading(false)
				})
		} else {
			axios.get(url).then((res) => {
				setValue(res.data)
				setLoading(false)
			})
		}
		// eslint-disable-next-line
	}, [slug])
	return (
		<Base>
			{loading ? (
				<CustomLoader loading={loading} />
			) : (
				<>
					<Paper className={classes.paper}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={12} md={8} lg={8}>
								<VideoPlayer url={value.videoLink} />
								<VideoDesc value={value} slug={slug} />
							</Grid>
							<Grid item xs={12} sm={12} md={4} lg={4}>
								{value.videoList.map((video) => {
									return (
										<VideoSideCard
											video={video}
											key={video.videoId}
										/>
									)
								})}
							</Grid>
						</Grid>
					</Paper>
				</>
			)}
		</Base>
	)
}
