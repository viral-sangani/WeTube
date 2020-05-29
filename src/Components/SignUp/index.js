import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Link, Redirect } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { signup } from "../../_helper/auth"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "react-loader-spinner"

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
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
					lastName: "",
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

				<div className="row">
					<form className="col s12">
						<div className="row">
							<div className="input-field col s6">
								<input
									id="first_name"
									type="text"
									className="validate"
									onChange={handleChange("firstName")}
								/>
								<label htmlFor="first_name">First Name</label>
							</div>
							<div className="input-field col s6">
								<input
									id="last_name"
									type="text"
									className="validate"
									onChange={handleChange("lastName")}
								/>
								<label htmlFor="last_name">Last Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input
									id="email"
									type="email"
									className="validate"
									value={email}
									onChange={handleChange("email")}
								/>
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input
									id="password"
									type="password"
									className="validate"
									value={password}
									onChange={handleChange("password")}
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
					</form>
				</div>
				{!loading && (
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						style={{ backgroundColor: "#ff3a22" }}
						onClick={onSubmit}
					>
						Sign Up
					</Button>
				)}
				<div style={{ textAlign: "center" }}>
					<Loader
						type="Puff"
						color="#ff3a22"
						height={50}
						width={50}
						visible={loading} //3 secs
					/>
				</div>
				<Grid container justify="flex-end">
					<Grid item>
						{performRedirect()}
						<Link to="/signin" variant="body2">
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
