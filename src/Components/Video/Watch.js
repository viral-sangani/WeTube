import React from "react"
import VideoPlayer from "./VideoPlayer"
import Base from "../Base"
import { ThemeToggleContext } from "../../Context/ThemeContext"
import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import VideoSideCard from "./VideoSideCard"
import VideoDesc from "./VideoDesc"
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: "auto",
		width: "90%"
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

export default function Watch() {
	const { slug } = useParams()
	const classes = useStyles()
	const { handleDrawerClose } = React.useContext(ThemeToggleContext)
	React.useEffect(() => {
		handleDrawerClose()
	}, [])
	return (
		<Base>
			<Paper className={classes.paper}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<VideoPlayer />
						<VideoDesc />
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<VideoSideCard />
						<VideoSideCard />
						<VideoSideCard />
						<VideoSideCard />
						<VideoSideCard />
						<VideoSideCard />
					</Grid>
				</Grid>
			</Paper>
		</Base>
	)
}
