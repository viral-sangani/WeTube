import React from "react"
import { FormControl, TextField, Button } from "@material-ui/core"
import axios from "axios"
import { isAuthenticated } from "../../_helper/auth"
import "react-toastify/dist/ReactToastify.css"
import Loader from "react-loader-spinner"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { StyledUploadForm } from "../../Utils/Styles"

export default function VideoUpload() {
	const [value, setValue] = React.useState({
		videoName: "",
		videoLink: "",
		videoDescription: "",
		loading: false
	})

	const handleVideoUploadChange = (name) => (event) => {
		setValue({ ...value, [name]: event.target.value })
	}
	const handleSubmit = (event) => {
		setValue({
			...value,
			loading: true
		})
		event.preventDefault()
		let form_data = new FormData()
		form_data.append("videoName", value.videoName)
		form_data.append("videoLink", value.videoLink)
		form_data.append("videoDescription", value.videoDescription)
		let url = `${process.env.REACT_APP_API_URL}/api/user/video/upload/`
		axios
			.post(url, form_data, {
				headers: {
					"content-type": "multipart/form-data",
					Authorization: "Bearer " + isAuthenticated().access
				}
			})
			.then((res) => {
				setValue({
					...value,
					videoName: "",
					videoLink: "",
					videoDescription: "",
					loading: false
				})
				toast.success("Video Successfully Uploaded", {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				})
			})
			.catch((err) => console.log("Error" + err))
	}

	return (
		<React.Fragment>
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
			<StyledUploadForm>
				<FormControl fullWidth variant="filled">
					<TextField
						id="videoName"
						style={{ margin: "8px" }}
						label="Video Name"
						variant="outlined"
						type="text"
						value={value.videoName}
						onChange={handleVideoUploadChange("videoName")}
					/>

					<TextField
						id="videoLink"
						style={{ margin: "8px" }}
						label="Youtube URL of Video"
						variant="outlined"
						type="text"
						value={value.videoLink}
						onChange={handleVideoUploadChange("videoLink")}
					/>
					<TextField
						id="standard-multiline-static"
						label="Video Description"
						multiline
						rows={4}
						variant="outlined"
						value={value.videoDescription}
						style={{
							margin: "8px"
						}}
						onChange={handleVideoUploadChange("videoDescription")}
					/>
					{!value.loading && (
						<Button
							style={{
								backgroundColor: "red",
								color: "white",
								margin: "8px"
							}}
							variant="contained"
							onClick={handleSubmit}
						>
							Upload Video
						</Button>
					)}
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
							visible={value.loading} //3 secs
						/>
					</div>
				</FormControl>
			</StyledUploadForm>
		</React.Fragment>
	)
}
