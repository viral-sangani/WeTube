import React, { useState, Fragment } from "react"
import {
	Avatar,
	Button,
	CssBaseline,
	Paper,
	Box,
	Grid,
	Typography,
	TextField,
	FormControl
} from "@material-ui/core"
import { Link, Redirect } from "react-router-dom"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { makeStyles } from "@material-ui/core/styles"
import { signin, isAuthenticated, authenticate } from "../../_helper/auth"
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
			<a color="inherit" href="https://viralsangani.me/">
				viralsangani.me
			</a>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh"
	},
	image: {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1551817958-11e0f7bbea9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center"
	},
	paper: {
		margin: theme.spacing(8, 4),
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
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}))

const SignIn = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		loading: false,
		didRedirect: false
	})

	const { email, password, loading, didRedirect } = values

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value })
	}
	const onSubmit = (event) => {
		event.preventDefault()
		setValues({ ...values, loading: true })
		signin({ email, password }).then((data) => {
			if (
				data.detail ===
				"No active account found with the given credentials"
			) {
				setValues({
					...values,
					success: false,
					loading: false
				})
				toast.error(data.detail, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				})
			} else {
				authenticate(data, () => {
					setValues({
						...values,
						didRedirect: true
					})
				})
			}
		})
	}
	const performRedirect = () => {
		if (didRedirect) {
			return <Redirect to="/" />
		}
		if (isAuthenticated()) {
			return <Redirect to="/" />
		}
	}

	const classes = useStyles()

	return (
		<Fragment>
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
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid
					item
					xs={12}
					sm={8}
					md={5}
					component={Paper}
					elevation={6}
					square
				>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<FormControl fullWidth variant="filled">
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
						<form className={classes.form} noValidate>
							<Grid container>
								<Grid item>
									<Link to="/signup" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							<Box mt={5}>
								{performRedirect()}
								<Copyright />
							</Box>
						</form>
					</div>
				</Grid>
			</Grid>
		</Fragment>
	)
}

export default SignIn
