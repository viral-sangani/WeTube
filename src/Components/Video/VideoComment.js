import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Avatar,
	ListItemAvatar,
	ListItemText,
	List,
	ListItem,
	Divider,
	FormControl,
	InputLabel,
	Input
} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "100%",
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: "inline"
	}
}))

export default function VideoComment() {
	const classes = useStyles()

	return (
		<List className={classes.root}>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Profile" />
				</ListItemAvatar>
				<ListItemText
					primary={
						<React.Fragment>
							<Typography
								component="span"
								variant="subtitle2"
								className={classes.inline}
								color="textPrimary"
							>
								Ali Connors
							</Typography>
							<Typography
								component="span"
								variant="caption"
								className={classes.inline}
								color="textPrimary"
							>
								— 5 min ago
							</Typography>
						</React.Fragment>
					}
					secondary={
						<React.Fragment>
							<Typography
								component="span"
								variant="body2"
								className={classes.inline}
								color="textPrimary"
							>
								I'll be in your neighborhood doing errands
							</Typography>
						</React.Fragment>
					}
				/>
			</ListItem>
			<FormControl
				style={{ marginTop: "25px" }}
				fullWidth
				className={classes.margin}
			>
				<InputLabel htmlFor="standard-adornment-amount">
					Comment Here
				</InputLabel>
				<Input
					id="standard-adornment-amount"

					// onChange={handleChange("amount")}
				/>
			</FormControl>
		</List>
	)
}
