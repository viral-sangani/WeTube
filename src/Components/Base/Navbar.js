import React from "react"
import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../../_helper/auth"
import {
	Hidden,
	Button,
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness5Icon from "@material-ui/icons/Brightness5"
import MailIcon from "@material-ui/icons/Mail"
import NavAppBarDropDown from "./NavAppBarDropDown"
import { ThemeToggleContext } from "../../Context/ThemeContext"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		backgroundColor: "#FF0000"
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	hide: {
		display: "none"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(1),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	appBarButton: {
		marginLeft: "auto"
	}
}))

export default function Navbar(props) {
	const {
		open,
		handleDrawerOpen,
		handleDrawerClose,
		toggleTheme,
		themeMode
	} = React.useContext(ThemeToggleContext)

	React.useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 760) {
				handleDrawerClose()
			} else {
				handleDrawerOpen()
			}
		}
		if (window.innerWidth < 760) {
			handleDrawerClose()
		} else {
			handleDrawerOpen()
		}
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
		// eslint(react-hooks/exhaustive-deps)
	}, [])

	const classes = useStyles()
	const theme = useTheme()

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(
							classes.menuButton,
							open && classes.hide
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						WeTube
					</Typography>
					<div className={classes.appBarButton}>
						<Hidden smDown>
							<IconButton onClick={toggleTheme} color="inherit">
								{themeMode === "light" ? (
									<Brightness4Icon />
								) : (
									<Brightness5Icon />
								)}
							</IconButton>
						</Hidden>
						{isAuthenticated() ? (
							<NavAppBarDropDown />
						) : (
							<Button
								component={Link}
								to="/signin"
								color="inherit"
							>
								Signin
							</Button>
						)}
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					{["Inbox", "Starred", "Send email", "Drafts"].map(
						(text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{index % 2 === 0 ? (
										<InboxIcon />
									) : (
										<MailIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						)
					)}
				</List>
				<Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} />
				{props.children}
			</main>
		</div>
	)
}
