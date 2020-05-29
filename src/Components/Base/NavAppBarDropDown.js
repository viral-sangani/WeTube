import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import {
	ListItemIcon,
	ListItemText,
	IconButton,
	Menu,
	MenuItem
} from "@material-ui/core"
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import HelpIcon from "@material-ui/icons/Help"
import SettingsIcon from "@material-ui/icons/Settings"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { withStyles } from "@material-ui/core/styles"
import { signout } from "../../_helper/auth"

const StyledMenu = withStyles({})((props) => (
	<Menu
		elevation={0}
		autoFocus={true}
		disableAutoFocusItem={true}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center"
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center"
		}}
		{...props}
	/>
))

const StyledMenuItem = withStyles((theme) => ({
	root: {
		width: "200px",
		"&:focus": {
			backgroundColor: theme.palette.primary.main,
			"& .MuiListItemIcon-root, & .MuiListItemText-primary": {
				color: theme.palette.common.white
			}
		}
	}
}))(MenuItem)

const NavAppBarDropDown = (props) => {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Fragment>
			<IconButton
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
				color="inherit"
			>
				<AccountCircleIcon />
			</IconButton>
			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<Link
					to="/user/channel"
					style={{
						textDecoration: "none",
						color: "inherit"
					}}
				>
					<StyledMenuItem>
						<ListItemIcon>
							<PermContactCalendarIcon fontSize="small" />
						</ListItemIcon>

						<ListItemText primary="Your Channel" />
					</StyledMenuItem>
				</Link>

				<StyledMenuItem
					onClick={() => {
						signout(() => {
							props.history.push("/")
						})
					}}
					color="inherit"
				>
					<ListItemIcon>
						<ExitToAppIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Signout" />
				</StyledMenuItem>

				<StyledMenuItem>
					<ListItemIcon>
						<HelpIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Help" />
				</StyledMenuItem>
				<StyledMenuItem>
					<ListItemIcon>
						<SettingsIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Settings" />
				</StyledMenuItem>
			</StyledMenu>
		</Fragment>
	)
}

export default withRouter(NavAppBarDropDown)
