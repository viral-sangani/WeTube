import React from "react"
import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import {
	AppBar,
	Tabs,
	Tab,
	Typography,
	Box,
	Card,
	Button,
	TextField,
	FormControl,
	Modal,
	Container,
	Avatar
} from "@material-ui/core"
import {
	StyledMainDiv,
	StyledSecDiv,
	StyledButtonDiv,
	StyledChannelName,
	VideoDiv,
	ModelDiv
} from "../../Utils/Styles"
import Base from "../Base"
import VideoCard from "../Video/VideoCard"
import { useDropzone } from "react-dropzone"
import DefaultImg from "../../Static/dafault-channel.png"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify"
import Loader from "react-loader-spinner"
import axios from "axios"
import { isAuthenticated } from "../../_helper/auth"
import CustomLoader from "../../Utils/CustomLoader"
import VideoUpload from "./VideoUpload"

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
					<Typography component={"span"}>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

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
		padding: theme.spacing(2, 2, 3),
		[theme.breakpoints.up("md")]: {
			width: "75%"
		}
	},
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12)
	}
}))

export default function UserChannel(props) {
	const [loading, setLoading] = React.useState(true)
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

	const [userChannelState, setUserChannelState] = React.useState({
		channelName: "",
		channelImage: null,
		channelAbout: "",
		hasChannel: false,
		error: "",
		success: false,
		channelLoading: false,
		videoList: []
	})
	const {
		channelName,
		channelImage,
		channelAbout,
		hasChannel,
		channelLoading,
		videoList
	} = userChannelState

	const handleCreateChannelChange = (name) => (event) => {
		setUserChannelState({ ...userChannelState, [name]: event.target.value })
	}

	React.useEffect(() => {
		let url = `https://8jx1h4z1ra.execute-api.ap-south-1.amazonaws.com/dev/api/user/channel/`
		axios
			.get(url, {
				headers: {
					"content-type": "multipart/form-data",
					Authorization: "Bearer " + isAuthenticated().access
				}
			})
			.then((res) => {
				if (res.data.hasChannel) {
					setUserChannelState({
						channelImage: res.data.channelImage,
						hasChannel: res.data.hasChannel,
						channelName: res.data.channelName,
						channelAbout: res.data.channelAbout,
						videoList: res.data.videoList
					})
					setLoading(false)
				} else {
					setUserChannelState({
						hasChannel: res.data.hasChannel
					})
					setLoading(false)
				}
			})
			.catch((err) => console.log("Error" + err))
	}, [])

	const createChannelSubmit = (event) => {
		setUserChannelState({
			...userChannelState,
			channelLoading: true
		})
		event.preventDefault()
		let form_data = new FormData()
		form_data.append("channelImage", channelImage, channelImage.name)
		form_data.append("channelName", channelName)
		form_data.append("channelAbout", channelAbout)
		let url = `https://8jx1h4z1ra.execute-api.ap-south-1.amazonaws.com/dev/api/user/channel/create/`
		axios
			.post(url, form_data, {
				headers: {
					"content-type": "multipart/form-data",
					Authorization: "Bearer " + isAuthenticated().access
				}
			})
			.then((res) => {
				console.log("res", res)
				setUserChannelState({
					channelImage: res.data.channelImage,
					hasChannel: res.data.hasChannel,
					channelName: res.data.channelName,
					channelAbout: res.data.channelAbout,
					videoList: res.data.videoList,
					channelLoading: false,
					success: true
				})
				toast.success("Channel Successfully Created", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				})
				setOpen(false)
			})
			.catch((err) => console.log("Error" + err))
	}

	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject
	} = useDropzone({
		accept: "image/*",
		onDrop: (files) => {
			setUserChannelState({
				...userChannelState,
				channelImage: files[0]
			})
		}
	})

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	))

	const createChannel = (
		<ModelDiv className={classes.paper}>
			<FormControl fullWidth variant="filled">
				<h1>Create Channel</h1>
				<TextField
					id="channelName"
					style={{ margin: "10px" }}
					label="Channel name"
					variant="outlined"
					type="text"
					onChange={handleCreateChannelChange("channelName")}
				/>
				<div className="container">
					<Container
						{...getRootProps({
							isDragActive,
							isDragAccept,
							isDragReject
						})}
					>
						<input {...getInputProps()} />
						<p>Drag 'n' drop channel image.</p>
					</Container>
					<aside>
						<h4>Files</h4>
						<ul>{files}</ul>
					</aside>
				</div>
				<TextField
					id="standard-multiline-static"
					label="Channel Description"
					multiline
					rows={4}
					variant="outlined"
					defaultValue=""
					style={{
						margin: "8px"
					}}
					onChange={handleCreateChannelChange("channelAbout")}
				/>
				{!channelLoading && (
					<Button
						style={{
							backgroundColor: "red",
							color: "white",
							margin: "8px"
						}}
						variant="contained"
						onClick={createChannelSubmit}
					>
						Create Channel
					</Button>
				)}
				{channelLoading && (
					<div
						style={{
							textAlign: "center",
							marginTop: "15px"
						}}
					>
						<Loader
							type="Puff"
							color="#ff3a22"
							height={50}
							width={50}
							visible={channelLoading} //3 secs
						/>
					</div>
				)}
			</FormControl>
		</ModelDiv>
	)

	return (
		<Base>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			{loading ? (
				<CustomLoader loading={loading} />
			) : (
				<Card variant="outlined">
					<StyledMainDiv>
						<Avatar
							alt="Channel"
							src={hasChannel ? channelImage : DefaultImg}
							className={classes.large}
						/>

						<StyledSecDiv>
							<StyledChannelName>{channelName}</StyledChannelName>
							<StyledButtonDiv>
								{hasChannel ? (
									<>
										<Button
											style={{
												backgroundColor: "red",
												color: "white"
											}}
											variant="contained"
											onClick={handleOpen}
										>
											Edit Channel
										</Button>
										<Modal
											open={open}
											onClose={handleClose}
										>
											{createChannel}
										</Modal>
									</>
								) : (
									<>
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
										<Modal
											open={open}
											onClose={handleClose}
										>
											{createChannel}
										</Modal>
									</>
								)}
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
							<TabPanel
								value={value}
								index={0}
								dir={theme.direction}
							>
								{hasChannel ? (
									<VideoUpload />
								) : (
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center"
										}}
									>
										<h3>Create channel to upload Viodes</h3>
									</div>
								)}
							</TabPanel>

							<TabPanel
								value={value}
								index={1}
								dir={theme.direction}
							>
								<VideoDiv>
									{hasChannel &&
										videoList.map((video) => (
											<VideoCard
												video={video}
												key={video.videoId}
											/>
										))}
								</VideoDiv>
							</TabPanel>
						</SwipeableViews>
					</div>
				</Card>
			)}
		</Base>
	)
}
