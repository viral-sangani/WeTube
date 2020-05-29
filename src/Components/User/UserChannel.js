import React from "react"
import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Base from "../Base"
import { Card, Button, TextField, FormControl } from "@material-ui/core"
import styled from "styled-components"
import VideoCard from "../Video/VideoCard"
import Modal from "@material-ui/core/Modal"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

const StyledMainDiv = styled.div`
	width: 75%;
	height: 25vh;
	margin: auto;
	@media (max-width: 880px) {
		width: 90%;
	}
	display: flex;
	align-items: center;
`
const StyledSecDiv = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-left: 20px;
`
const StyledImg = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
`
const StyledChannelName = styled.div`
	font-size: 32px;
`
const StyledButtonDiv = styled.div`
	margin: 15px 0;
`
const StyledUploadForm = styled.div`
	width: 80%;
	margin: auto;
	@media (max-width: 880px) {
		width: 100%;
	}
`
const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	@media (max-width: 500px) {
		justify-content: space-around;
	}
`
const ModelDiv = styled.div`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: "100%"
	},
	paper: {
		position: "absolute",
		width: "90%",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 3, 3),
		[theme.breakpoints.up("md")]: {
			width: "75%"
		}
	}
}))

export default function UserChannel(props) {
	const classes = useStyles()
	const theme = useTheme()
	const [value, setValue] = React.useState(0)
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleChangeIndex = (index) => {
		setValue(index)
	}

	const createChannel = (
		<ModelDiv className={classes.paper}>
			<FormControl fullWidth variant="filled">
				<h1>Create Channel</h1>
				<TextField
					id="channelName"
					style={{ margin: "8px" }}
					label="Channel name"
					variant="outlined"
					type="text"
					// onChange={handleChange("videoName")}
				/>
			</FormControl>
		</ModelDiv>
	)

	return (
		<Base>
			<Card variant="outlined">
				<StyledMainDiv>
					<StyledImg
						src="https://avatars2.githubusercontent.com/u/36530381?s=460&u=c855ebdff9ae53fd8ae4d45d6273c45b06e4f83c&v=4"
						alt="Channel"
					/>
					<StyledSecDiv>
						<StyledChannelName>Viral Sangani</StyledChannelName>
						<StyledButtonDiv>
							<Button
								style={{
									backgroundColor: "red",
									color: "white"
								}}
								variant="contained"
								onClick={handleOpen}
							>
								Create Channel
							</Button>
							<Modal open={open} onClose={handleClose}>
								{createChannel}
							</Modal>
						</StyledButtonDiv>
					</StyledSecDiv>
				</StyledMainDiv>
				<div className={classes.root}>
					<AppBar position="static" color="default">
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							aria-label="full width tabs example"
						>
							<Tab label="Uplaod Video" {...a11yProps(0)} />
							<Tab label="My Videos" {...a11yProps(1)} />
						</Tabs>
					</AppBar>
					<SwipeableViews
						axis={theme.direction === "rtl" ? "x-reverse" : "x"}
						index={value}
						onChangeIndex={handleChangeIndex}
					>
						<TabPanel value={value} index={0} dir={theme.direction}>
							<StyledUploadForm>
								<FormControl fullWidth variant="filled">
									<TextField
										id="videoName"
										style={{ margin: "8px" }}
										label="Video Name"
										variant="outlined"
										type="text"
										// onChange={handleChange("videoName")}
									/>

									<TextField
										id="videoURL"
										style={{ margin: "8px" }}
										label="Youtube URL of Video"
										variant="outlined"
										type="text"
										// onChange={handleChange("videoName")}
									/>
									<TextField
										id="standard-multiline-static"
										label="Multiline"
										multiline
										rows={4}
										variant="outlined"
										defaultValue=""
										style={{
											margin: "8px"
										}}
									/>
									<Button
										style={{
											backgroundColor: "red",
											color: "white",
											margin: "8px"
										}}
										variant="contained"
									>
										Create Channel
									</Button>
								</FormControl>
							</StyledUploadForm>
						</TabPanel>

						<TabPanel value={value} index={1} dir={theme.direction}>
							<VideoDiv>
								<VideoCard />
								<VideoCard />
								<VideoCard />
								<VideoCard />
								<VideoCard />
								<VideoCard />
								<VideoCard />
							</VideoDiv>
						</TabPanel>
					</SwipeableViews>
				</div>
			</Card>
		</Base>
	)
}
