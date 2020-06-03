import React, { useState } from "react"
import {
	Avatar,
	Button,
	CssBaseline,
	Grid,
	Box,
	Typography,
	FormControl,
	TextField,
	Container
} from "@material-ui/core"
import { Link, Redirect } from "react-router-dom"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { makeStyles } from "@material-ui/core/styles"
import { signup } from "../../_helper/auth"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "react-loader-spinner"

function Copyright() {
	return (
		<Typography
			component={"span"}
			variant="body2"
			color="textSecondary"
			align="center"
		>
			{"Copyright © "}
			<a
				color="inherit"
				style={{
					color: "inherit"
				}}
				href="https://viralsangani.me/"
			>
				viralsangani.me
			</a>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

export default function SignUp() {
	const classes = useStyles()

	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		success: false,
		loading: false
	})
	const { firstName, lastName, email, password, success, loading } = values

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value })
	}

	const onSubmit = (event) => {
		setValues({ ...values, loading: true })
		event.preventDefault()
		signup({ firstName, lastName, email, password }).then((data) => {
			if (
				data.email[0] === "user with this email address already exists."
			) {
				setValues({
					...values,
					success: false,
					loading: false
				})
				toast.error(data.email[0], {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				})
			} else {
				setValues({
					...values,
					firstName: "",
					email: "",
					password: "",
					success: true
				})
			}
		})
	}

	const performRedirect = () => {
		if (success) {
			return <Redirect to="/signin" />
		}
	}

	return (
		<Container component="main" maxWidth="xs">
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
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>

				{/* <div className="row"> */}
				<FormControl fullWidth variant="filled">
					<TextField
						id="email"
						style={{ margin: "8px" }}
						label="First Name"
						variant="outlined"
						type="text"
						placeholder="John"
						onChange={handleChange("firstName")}
					/>
					<TextField
						id="email"
						style={{ margin: "8px" }}
						label="Last Name"
						variant="outlined"
						type="text"
						placeholder="Doe"
						onChange={handleChange("lastName")}
					/>
					<TextField
						id="email"
						style={{ margin: "8px" }}
						label="Email"
						variant="outlined"
						type="email"
						placeholder="placeholder@gmail.com"
						onChange={handleChange("email")}
					/>
					<TextField
						style={{ margin: "8px" }}
						id="email"
						label="Password"
						variant="outlined"
						type="password"
						placeholder="********"
						onChange={handleChange("password")}
					/>
					{!loading && (
						<Button
							style={{ backgroundColor: "#ff3a22" }}
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={onSubmit}
						>
							Sign In
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
							visible={loading} //3 secs
						/>
					</div>
				</FormControl>
				<Grid container justify="flex-end">
					<Grid item>
						{performRedirect()}
						<Link
							style={{
								color: "inherit"
							}}
							to="/signin"
							variant="body2"
						>
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	)
}
