import React from "react"
import clsx from "clsx"
import { makeStyles, useTheme, fade } from "@material-ui/core/styles"
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
	ListItemText,
	ListItemAvatar,
	Avatar,
	FormControlLabel,
	Switch,
	InputBase
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness5Icon from "@material-ui/icons/Brightness5"
import HomeIcon from "@material-ui/icons/Home"
import HistoryIcon from "@material-ui/icons/History"
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied"
import NavAppBarDropDown from "./NavAppBarDropDown"
import WhatshotIcon from "@material-ui/icons/Whatshot"
import { ThemeToggleContext } from "../../Context/ThemeContext"
import { GeneralContext } from "../../Context/GeneralContext"
import { StyledLink } from "../../Utils/Styles"
import axios from "axios"
import { useHistory } from "react-router-dom"

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
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto"
		}
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
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch"
		}
	}
}))

export default function Navbar(props) {
	const history = useHistory()
	const [search, setSearch] = React.useState("")
	const {
		open,
		handleDrawerOpen,
		handleDrawerClose,
		toggleTheme,
		themeMode
	} = React.useContext(ThemeToggleContext)
	const { channels, setChannels } = React.useContext(GeneralContext)

	React.useEffect(() => {
		let url = `${process.env.REACT_APP_API_URL}/api/channels/`
		axios.get(url).then((res) => {
			setChannels(res.data)
		})
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
		// eslint-disable-next-line
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
					<Typography component={"span"} variant="h6" noWrap>
						WeTube
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							inputProps={{ "aria-label": "search" }}
							onKeyPress={(ev) => {
								if (ev.key === "Enter") {
									history.push(`/search/${search}`)
								}
							}}
						/>
					</div>
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
					<StyledLink to="/">
						<ListItem button>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary={"Home"} />
						</ListItem>
					</StyledLink>
					<StyledLink to="/history">
						<ListItem button>
							<ListItemIcon>
								<HistoryIcon />
							</ListItemIcon>
							<ListItemText primary={"History"} />
						</ListItem>
					</StyledLink>
					<StyledLink to="/liked">
						<ListItem button>
							<ListItemIcon>
								<SentimentVerySatisfiedIcon />
							</ListItemIcon>
							<ListItemText primary={"Liked Videos"} />
						</ListItem>
					</StyledLink>
					<StyledLink to="/trending">
						<ListItem button>
							<ListItemIcon>
								<WhatshotIcon />
							</ListItemIcon>
							<ListItemText primary={"Trending Today"} />
						</ListItem>
					</StyledLink>
				</List>
				<Divider />
				<Typography
					style={{ padding: "8px 0 0 8px" }}
					variant="button"
					display="block"
					gutterBottom
					component={"span"}
				>
					Channels
				</Typography>

				<List>
					{channels &&
						channels.map((channel) => {
							return (
								<StyledLink
									to={`/channel/${channel.channelSlug}`}
									key={channel.channelSlug}
								>
									<ListItem button>
										<ListItemAvatar>
											<Avatar
												alt={channel.channelName}
												src={channel.channelImage}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={channel.channelName}
										/>
									</ListItem>
								</StyledLink>
							)
						})}
					<Hidden smUp>
						<FormControlLabel
							style={{ padding: "20px" }}
							control={
								<Switch
									checked={
										themeMode === "light" ? false : true
									}
									onClick={toggleTheme}
									name="checkedB"
									color="primary"
								/>
							}
							label="Dark Theme"
						/>
					</Hidden>
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
